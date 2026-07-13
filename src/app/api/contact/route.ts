// src/app/api/contact/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// ✅ XSSサニタイズ関数
const sanitize = (str: string) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// 入力スキーマ（長さ上限つき）
const optionalShortText = z
  .string()
  .trim()
  .max(200, '入力が長すぎます')
  .optional()
  .or(z.literal(''));

const contactSchema = z.object({
  name: z.string().trim().min(1, 'お名前は必須です').max(100, 'お名前が長すぎます'),
  email: z.email('メールアドレスの形式が正しくありません').max(254),
  company: optionalShortText,
  phone: optionalShortText,
  projectType: optionalShortText,
  budget: optionalShortText,
  message: z
    .string()
    .trim()
    .min(1, 'お問い合わせ内容は必須です')
    .max(5000, 'お問い合わせ内容が長すぎます'),
  estimatePrice: optionalShortText,
  estimateDetails: z.string().trim().max(5000).optional().or(z.literal('')),
  // ハニーポット：人間には見えないフィールド。値が入っていたらボットとみなす
  website: z.string().optional(),
});

// 簡易レート制限（インスタンス単位のベストエフォート。
// 本格的な制限が必要になったら Upstash などの外部ストアに置き換える）
const RATE_WINDOW_MS = 60_000;
const RATE_MAX_PER_WINDOW = 5;
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (recentSubmissions.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );
  if (timestamps.length >= RATE_MAX_PER_WINDOW) {
    return true;
  }
  timestamps.push(now);
  recentSubmissions.set(ip, timestamps);
  // Map の際限ない成長を防ぐ
  if (recentSubmissions.size > 1000) {
    for (const [key, value] of recentSubmissions) {
      if (value.every((t) => now - t >= RATE_WINDOW_MS)) {
        recentSubmissions.delete(key);
      }
    }
  }
  return false;
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error('Contact form error: RESEND_API_KEY is not set');
    return NextResponse.json(
      { error: 'メール送信に失敗しました。時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: '送信回数が多すぎます。しばらく待ってから再度お試しください。' },
      { status: 429 }
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'リクエストの形式が正しくありません' },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstIssue?.message ?? '入力内容に誤りがあります' },
      { status: 400 }
    );
  }

  const {
    name,
    email,
    company,
    phone,
    projectType,
    budget,
    message,
    estimatePrice,
    estimateDetails,
    website,
  } = parsed.data;

  // ハニーポットに値が入っていたらボット。成功したふりをして何もしない
  if (website) {
    return NextResponse.json({ success: true });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'noreply@shotomoriyama.com',
      to: '0sdm0.moriyama@gmail.com',
      replyTo: email,
      subject: `【お問い合わせ】${sanitize(name)}様より`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FF6B6B;">新しいお問い合わせ</h2>

          <div style="background: #f5f5f5; padding: 20px; margin: 20px 0;">
            <h3>お客様情報</h3>
            <p><strong>お名前:</strong> ${sanitize(name)}</p>
            <p><strong>会社名:</strong> ${sanitize(company || 'なし')}</p>
            <p><strong>メール:</strong> ${sanitize(email)}</p>
            <p><strong>電話:</strong> ${sanitize(phone || 'なし')}</p>
          </div>

          <div style="background: #f5f5f5; padding: 20px; margin: 20px 0;">
            <h3>プロジェクト情報</h3>
            <p><strong>種類:</strong> ${sanitize(projectType || 'なし')}</p>
            <p><strong>予算:</strong> ${sanitize(budget || 'なし')}</p>
          </div>

          ${estimatePrice ? `
            <div style="background: #fff5f5; padding: 20px; margin: 20px 0; border-left: 4px solid #FF6B6B;">
              <h3>お見積もり内容</h3>
              <p><strong>金額:</strong> ${sanitize(estimatePrice)}</p>
              <p><strong>詳細:</strong></p>
              <pre style="white-space: pre-wrap;">${sanitize(estimateDetails || '')}</pre>
            </div>
          ` : ''}

          <div style="background: #f5f5f5; padding: 20px; margin: 20px 0;">
            <h3>お問い合わせ内容</h3>
            <p style="white-space: pre-wrap;">${sanitize(message)}</p>
          </div>

          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
        このメールは shotomoriyama.com のお問い合わせフォームから送信されました。
          </p>
        </div>
      `,
    });

    // 内部情報（Resend のレスポンス）はクライアントに返さない
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'メール送信に失敗しました。時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}
