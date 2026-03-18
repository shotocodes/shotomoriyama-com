// src/app/api/contact/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ XSSサニタイズ関数
const sanitize = (str: string) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// ✅ メール形式チェック
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
    } = body;

    // ✅ バリデーション強化
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'メールアドレスの形式が正しくありません' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'noreply@shotomoriyama.jp', // ✅ 独自ドメインに変更
      to: '0sdm0.moriyama@gmail.com',
      replyTo: email,
      subject: `【お問い合わせ】${sanitize(name)}様より`, // ✅ サニタイズ
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
            このメールは shotomoriyama.jp のお問い合わせフォームから送信されました。
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });

  } catch (error: unknown) { // ✅ any → unknown
    const message = error instanceof Error ? error.message : 'メール送信に失敗しました';
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
