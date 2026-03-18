// src/app/contact/page.tsx
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/sections/PageHero';
import AnimatedButton from '@/components/ui/AnimatedButton';
import SectionTitle from '@/components/ui/SectionTitle';
import RadialLines from '@/components/graphics/RadialLines';
import WavePattern from '@/components/graphics/WavePattern';
import CircleDiagram from '@/components/graphics/CircleDiagram';

import { useRouter } from 'next/navigation';

import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  CheckCircle,
  Send,
  User,
  Building,
  FileText,
  DollarSign,
  Calculator
} from 'lucide-react';

const InstagramIcon = ({ size = 24, style }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      fill="currentColor"
    />
  </svg>
);

const LineIcon = ({ size = 24, style }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"
      fill="currentColor"
    />
  </svg>
);

// 見積もりカード + フォームコンポーネント
function ContactPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

// URL パラメータから見積もり情報を取得
  const projectName = searchParams.get('projectName') || '';
  const scaleName = searchParams.get('scaleName') || '';
  const options = searchParams.get('options')?.split(',').filter(Boolean) || [];
  const deliveryName = searchParams.get('deliveryName') || '';
  const totalPrice = searchParams.get('totalPrice') || '';

  // フォームデータの初期値を設定
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // 初回のみプロジェクトタイプを設定
  useEffect(() => {
    if (projectName && !formData.projectType) { // ← 空の場合のみ設定
      setFormData(prev => ({
        ...prev,
        projectType: projectName
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectName]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitError('');

  try {
    // 見積もり情報を含めるペイロード
    const payload = {
      ...formData,
      ...(totalPrice && {
        estimatePrice: `¥${parseInt(totalPrice).toLocaleString()}〜`,
        estimateDetails: [
          `プロジェクト: ${projectName}`,
          scaleName ? `規模: ${scaleName}` : '',
          options.length > 0 ? `オプション: ${options.join(', ')}` : '',
          deliveryName ? `納期: ${deliveryName}` : ''
        ].filter(Boolean).join('\n')
      })
    };

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
      // 成功 → サンキューページへ
      router.push('/contact/success');
    } else {
      // エラー表示
      setSubmitError(data.error || '送信に失敗しました');
    }
  } catch (error) {
    console.error('Submit error:', error);
    setSubmitError('送信に失敗しました。もう一度お試しください。');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <>
      {/* タイトル */}
      <SectionTitle
        title="Request Form"
        subtitle="お見積もり・お問い合わせフォーム"
        accentColor="#FF6B6B"
        marginBottom="4rem"
      />

      {/* 見積もりカード */}
      {projectName && totalPrice && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-background-alt border-2 border-border"
          style={{ padding: '2rem', marginBottom: '3rem' }}
          whileHover={{
            boxShadow: '0 0 40px rgba(255, 107, 107, 0.2)'
          }}
        >
          <div className="flex items-center gap-3" style={{ marginBottom: '1.5rem' }}>
            <Calculator size={24} style={{ color: '#FF6B6B' }} />
            <h3 className="text-xl font-bold text-primary">
              お見積もり内容
            </h3>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            {/* プロジェクト */}
            <div style={{
              paddingBottom: '1rem',
              borderBottom: '1px solid var(--color-border)',
              marginBottom: '1rem'
            }}>
              <p className="text-sm text-text-secondary" style={{ marginBottom: '0.25rem' }}>
                プロジェクト
              </p>
              <p className="font-semibold text-primary">{projectName}</p>
            </div>

            {/* 規模 */}
            {scaleName && (
              <div style={{
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--color-border)',
                marginBottom: '1rem'
              }}>
                <p className="text-sm text-text-secondary" style={{ marginBottom: '0.25rem' }}>
                  規模
                </p>
                <p className="font-semibold text-primary">{scaleName}</p>
              </div>
            )}

            {/* オプション */}
{options.length > 0 && (
  <div style={{
    paddingBottom: '1rem',
    borderBottom: '1px solid var(--color-border)',
    marginBottom: '1rem'
  }}>
    <p className="text-sm text-text-secondary" style={{ marginBottom: '0.5rem' }}>
      オプション
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      {options.map((opt, i) => (
        <span key={i} className="font-semibold text-primary">{opt}</span>
      ))}
    </div>
  </div>
)}

            {/* 納期 */}
            {deliveryName && (
              <div style={{
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--color-border)',
                marginBottom: '1rem'
              }}>
                <p className="text-sm text-text-secondary" style={{ marginBottom: '0.25rem' }}>
                  納期
                </p>
                <p className="font-semibold text-primary">{deliveryName}</p>
              </div>
            )}
          </div>

          {/* 合計 */}
          <div style={{ paddingTop: '1.5rem', borderTop: '2px solid var(--color-border)' }}>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">合計</span>
              <span className="text-2xl font-bold text-primary">
                ¥{parseInt(totalPrice).toLocaleString()}〜
              </span>
            </div>
            <p className="text-xs text-text-secondary" style={{ marginTop: '0.5rem' }}>
              ※こちらは概算です。詳細はお問い合わせください
            </p>
          </div>
        </motion.div>
      )}

      {/* フォーム */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{
          boxShadow: '0 0 80px rgba(255, 107, 107, 0.4)'
        }}
        className="border border-border bg-background"
        style={{ padding: '3rem 2rem' }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* お名前 */}
            <motion.div whileFocus={{ scale: 1.01, y: -2 }} transition={{ duration: 0.2 }}>
              <label className="block text-sm font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                お名前 <span style={{ color: '#FF6B6B' }}>*</span>
              </label>
              <div className="relative">
                <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-border bg-background text-primary py-3 focus:outline-none focus:border-[#FF6B6B] focus:shadow-lg transition-all duration-300"
                  style={{ paddingLeft: '3rem', paddingRight: '1rem' }}
                  placeholder="山田 太郎"
                />
              </div>
            </motion.div>

            {/* 会社名・屋号 */}
            <motion.div whileFocus={{ scale: 1.01, y: -2 }} transition={{ duration: 0.2 }}>
              <label className="block text-sm font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                会社名・屋号
              </label>
              <div className="relative">
                <Building size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full border border-border bg-background text-primary py-3 focus:outline-none focus:border-[#FF6B6B] focus:shadow-lg transition-all duration-300"
                  style={{ paddingLeft: '3rem', paddingRight: '1rem' }}
                  placeholder="株式会社〇〇"
                />
              </div>
            </motion.div>

            {/* メールアドレス */}
            <motion.div whileFocus={{ scale: 1.01, y: -2 }} transition={{ duration: 0.2 }}>
              <label className="block text-sm font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                メールアドレス <span style={{ color: '#FF6B6B' }}>*</span>
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-border bg-background text-primary py-3 focus:outline-none focus:border-[#FF6B6B] focus:shadow-lg transition-all duration-300"
                  style={{ paddingLeft: '3rem', paddingRight: '1rem' }}
                  placeholder="example@example.com"
                />
              </div>
            </motion.div>

            {/* 電話番号 */}
            <motion.div whileFocus={{ scale: 1.01, y: -2 }} transition={{ duration: 0.2 }}>
              <label className="block text-sm font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                電話番号
              </label>
              <div className="relative">
                <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-border bg-background text-primary py-3 focus:outline-none focus:border-[#FF6B6B] focus:shadow-lg transition-all duration-300"
                  style={{ paddingLeft: '3rem', paddingRight: '1rem' }}
                  placeholder="090-1234-5678"
                />
              </div>
            </motion.div>

            {/* プロジェクト種類 */}
            <motion.div whileFocus={{ scale: 1.01, y: -2 }} transition={{ duration: 0.2 }}>
              <label className="block text-sm font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
                プロジェクト種類 <span style={{ color: '#FF6B6B' }}>*</span>
              </label>
              <div className="relative">
                <FileText size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" />
                <select
                  required
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full border border-border bg-background text-primary py-3 focus:outline-none focus:border-[#FF6B6B] focus:shadow-lg transition-all duration-300 appearance-none"
                  style={{ paddingLeft: '3rem', paddingRight: '2.5rem' }}
                >
                  <option value="">選択してください</option>
                  <option value="Webサイト制作">Webサイト制作</option>
                  <option value="ランディングページ">ランディングページ</option>
                  <option value="ECサイト">ECサイト</option>
                  <option value="ロゴ・グラフィック">ロゴ・グラフィック</option>
                  <option value="保守・運用">保守・運用</option>
                  <option value="その他">その他</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-secondary)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </motion.div>

{/* ご予算セクション */}

{/* お見積もり金額（パラメータありの場合のみ表示、編集不可） */}
{totalPrice && (
  <motion.div whileFocus={{ scale: 1.01, y: -2 }} transition={{ duration: 0.2 }}>
    <label className="block text-sm font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
      お見積もり金額
    </label>
    <div className="relative">
      <Calculator size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" />
      <input
        type="text"
        value={`¥${parseInt(totalPrice).toLocaleString()}〜`}
        readOnly
        className="w-full border border-border bg-background-alt text-primary py-3 cursor-not-allowed"
        style={{ paddingLeft: '3rem', paddingRight: '2.5rem', opacity: 0.7 }}
      />
    </div>
  </motion.div>
)}

{/* ご予算（常に表示、編集可） */}
<motion.div whileFocus={{ scale: 1.01, y: -2 }} transition={{ duration: 0.2 }}>
  <label className="block text-sm font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
    ご予算 {!totalPrice && <span style={{ color: '#FF6B6B' }}>*</span>}
  </label>
  <div className="relative">
    <DollarSign size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" />
    <input
      type="text"
      required={!totalPrice} // ← 見積もりがない場合は必須
      value={formData.budget}
      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
      className="w-full border border-border bg-background text-primary py-3 focus:outline-none focus:border-[#FF6B6B] focus:shadow-lg transition-all duration-300"
      style={{ paddingLeft: '3rem', paddingRight: '2.5rem' }}
      placeholder="例: ¥300,000〜 または 未定"
    />
  </div>
  {totalPrice && (
    <p className="text-xs text-text-secondary" style={{ marginTop: '0.5rem' }}>
      ※お見積もり金額と異なる場合は、こちらにご希望をご記入ください
    </p>
  )}
</motion.div>

{/* メッセージセクション */}

{/* お見積もり内容（パラメータありの場合のみ表示、編集不可） */}
{projectName && (
  <motion.div whileFocus={{ scale: 1.01, y: -2 }} transition={{ duration: 0.2 }}>
    <label className="block text-sm font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
      お見積もり内容
    </label>
    <textarea
      value={[
        `【お見積もり内容】`,
        `プロジェクト: ${projectName}`,
        scaleName ? `規模: ${scaleName}` : '',
        options.length > 0 ? `オプション: ${options.join(', ')}` : '',
        deliveryName ? `納期: ${deliveryName}` : '',
        totalPrice ? `概算金額: ¥${parseInt(totalPrice).toLocaleString()}〜` : ''
      ].filter(Boolean).join('\n')}
      readOnly
      className="w-full border border-border bg-background-alt text-primary px-4 py-3 cursor-not-allowed"
      rows={6}
      style={{ opacity: 0.7 }}
    />
  </motion.div>
)}

{/* お問い合わせ内容（常に表示、編集可） */}
<motion.div whileFocus={{ scale: 1.01, y: -2 }} transition={{ duration: 0.2 }}>
  <label className="block text-sm font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
    お問い合わせ内容 <span style={{ color: '#FF6B6B' }}>*</span>
  </label>
  <textarea
    required
    value={formData.message}
    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
    className="w-full border border-border bg-background text-primary px-4 py-3 focus:outline-none focus:border-[#FF6B6B] focus:shadow-lg transition-all duration-300"
    rows={8}
    placeholder="プロジェクトの詳細、希望納期、その他ご要望などをご記入ください"
  />
  {projectName && (
    <p className="text-xs text-text-secondary" style={{ marginTop: '0.5rem' }}>
      ※お見積もり内容に追加でお伝えしたいことがあればご記入ください
    </p>
  )}
</motion.div>
            {/* 送信ボタン */}
<div className="text-center" style={{ marginTop: '1rem' }}>
  <motion.button
    type="submit"
    disabled={isSubmitting}
    className="inline-flex items-center gap-2 px-8 py-3 font-bold border-2 transition-all duration-300"
    style={{
      borderColor: '#FF6B6B',
      color: isSubmitting ? '#999' : '#FF6B6B',
      background: 'transparent',
      opacity: isSubmitting ? 0.6 : 1,
      cursor: isSubmitting ? 'not-allowed' : 'pointer'
    }}
    whileHover={!isSubmitting ? {
      scale: 1.05,
      backgroundColor: '#FF6B6B',
      color: 'white',
      boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)'
    } : {}}
    whileTap={!isSubmitting ? { scale: 0.95 } : {}}
  >
    <Send size={20} />
    <span>{isSubmitting ? '送信中...' : '送信する'}</span>
  </motion.button>

  {/* エラー表示 */}
  {submitError && (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center text-sm"
      style={{ color: '#FF6B6B', marginTop: '1rem' }}
    >
      {submitError}
    </motion.p>
  )}
</div>
          </div>
        </form>
      </motion.div>

      {/* 注意事項 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
        style={{ marginTop: '2rem' }}
      >
        <p className="text-sm text-text-secondary">
          ※ 送信いただいた情報は、お問い合わせ対応のみに使用いたします
          <br />
          ※ 24時間以内にご返信がない場合は、お手数ですが再度ご連絡ください
        </p>
      </motion.div>
    </>
  );
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background" style={{ paddingTop: '80px', overflowX: 'hidden' }}>

        {/* Hero */}
        <PageHero
          title="CONTACT"
          subtitle="お問い合わせ"
          description="まずはお気軽にご相談ください。24時間以内にご返信いたします。"
          accentColor="#FF6B6B"
          useAnimatedTitle={true}
        />

        {/* ヒーローセクション用 RadialLine */}
        <div style={{ position: 'relative' }}>
          {/* 右上の RadialLines */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '-600px',
              right: '-20%',
              width: '1000px',
              height: '1000px',
              pointerEvents: 'none',
              zIndex: 10
            }}
          >
            <RadialLines
              color="#FF6B6B"
              opacity={0.5}
              animate={true}
              lineCount={32}
            />
          </div>

          {/* 左下の RadialLines（薄く） */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '-200px',
              left: '-15%',
              width: '600px',
              height: '600px',
              pointerEvents: 'none',
              zIndex: 10,
              opacity: 0.25
            }}
          >
            <RadialLines
              color="#FF9A8B"
              opacity={1}
              animate={true}
              lineCount={24}
            />
          </div>

          {/* モバイル */}
          <div className="lg:hidden flex justify-center" style={{ padding: '1rem 0', pointerEvents: 'none' }}>
            <div style={{ width: '200px', height: '200px', transform: 'scale(1.5)', transformOrigin: 'center' }}>
              <RadialLines color="#FF6B6B" opacity={0.6} animate={true} lineCount={16} />
            </div>
          </div>
        </div>

        {/* お問い合わせ方法セクション */}
        <section style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }} className="bg-background-alt">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            {/* 背景 - グリッド状の点 */}
            <div
              style={{
                position: 'absolute',
                top: '30%',
                right: '-5%',
                width: '400px',
                height: '400px',
                pointerEvents: 'none',
                opacity: 0.1,
                zIndex: 0
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                {Array.from({ length: 10 }).map((_, row) =>
                  Array.from({ length: 10 }).map((_, col) => (
                    <motion.circle
                      key={`dot-${row}-${col}`}
                      cx={col * 10 + 5}
                      cy={row * 10 + 5}
                      r="1"
                      fill="currentColor"
                      className="text-text-secondary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 3,
                        delay: (row + col) * 0.1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))
                )}
              </svg>
            </div>

            <div style={{ maxWidth: '64rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <SectionTitle
                title="Contact Method"
                subtitle="ご都合の良い方法でお問い合わせください"
                accentColor="#FF6B6B"
                marginBottom="4rem"
              />

{/* お問い合わせ方法カード */}
<div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '2rem', marginBottom: '4rem' }}>
  {[
    {
      icon: LineIcon,
      title: 'LINE',
      value: '@shoto0720',  // ← スクショから確認
      description: '最速で返信・気軽にメッセージOK',
      priority: 1,  // ✅ 数字だけに変更
      color: '#10B981',
      link: 'https://line.me/ti/p/shoto0720'
    },
    {
      icon: InstagramIcon,
      title: 'Instagram',
      value: '@sh0t0x72',  // ← スクショから確認
      description: 'DM歓迎・ポートフォリオも見れます',
      priority: 2,  // ✅ 数字だけに変更
      color: '#E1306C',
      link: 'https://www.instagram.com/sh0t0x72/'
    },
    {
      icon: Mail,
      title: 'Email',
      value: '0sdm0.moriyama@gmail.com',
      description: '24時間受付・翌営業日までに返信',
      priority: 3,  // ✅ 数字だけに変更
      color: '#FF6B6B',
      link: 'mailto:0sdm0.moriyama@gmail.com'
    }
  ].map((method, index) => {
    const Icon = method.icon;

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group"
      >
        <a
          href={method.link}
          target={method.title !== 'Email' ? '_blank' : undefined}
          rel={method.title !== 'Email' ? 'noopener noreferrer' : undefined}
        >
          <div
            className="border border-border bg-background transition-all duration-300 hover:border-primary cursor-pointer"
            style={{ padding: '2rem', textAlign: 'center', height: '100%' }}
          >
            {/* アイコン + バッジコンテナ */}
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
              {/* 優先度バッジ（アイコンの右上に重ねる） */}
              <div
                className="text-xs font-bold"
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: method.color,
                  color: '#ffffff',
                  borderRadius: '50%',
                  zIndex: 10,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}
              >
                {method.priority}
              </div>

              {/* アイコン */}
              <div
                className="inline-flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: `${method.color}20`,
                }}
              >
                <Icon size={28} style={{ color: method.color }} />
              </div>
            </div>

            <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '0.75rem' }}>
              {method.title}
            </h3>

            <p className="font-bold" style={{ marginBottom: '0.75rem', color: method.color }}>
              {method.value}
            </p>

            <p className="text-sm text-text-secondary">
              {method.description}
            </p>
          </div>
        </a>
      </motion.div>
    );
  })}
</div>

{/* 注意事項 */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="border border-border bg-background"
  style={{ padding: '2rem' }}
>
  <div className="flex items-start gap-3" style={{ marginBottom: '1rem' }}>
    <Clock size={24} className="text-primary flex-shrink-0" />
    <div>
      <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '0.5rem' }}>
        お問い合わせについて
      </h3>
      <div className="text-sm text-text-secondary leading-relaxed">
        <p style={{ marginBottom: '0.75rem' }}>
          <strong style={{ color: 'var(--text-primary)' }}>返信優先度：</strong>
          LINE → Instagram → Email の順で対応しております
        </p>
        <p style={{ marginBottom: '0.75rem' }}>
          <strong style={{ color: 'var(--text-primary)' }}>返信時間：</strong>
          通常24時間以内にご返信いたします
          <br />
          ※ 海外滞在中など、返信が遅れる場合がございます
        </p>
        <p style={{ marginBottom: '0.75rem' }}>
  <strong style={{ color: 'var(--text-primary)' }}>電話・オンラインミーティング：</strong>
  ご希望の方は、上記の方法で事前に日程調整をお願いいたします
  <br />
  （Zoom / Google Meet など、ご希望のツールに対応可能です）
</p>
<p className="text-xs text-text-secondary" style={{ paddingLeft: '1.5rem' }}>
  ※ Slack / Discord でのコミュニケーションをご希望の方もお気軽にご相談ください
</p>
      </div>
    </div>
  </div>
</motion.div>
            </div>
          </div>
        </section>

        {/* お見積もりフォームセクション */}
        <section style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
          {/* 左上 回転する円 */}
          <div className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '8%',
              left: '9%',
              width: '400px',
              height: '400px',
              pointerEvents: 'none',
              opacity: 0.3,
              zIndex: 1
            }}
          >
            <motion.svg
              width="100%"
              height="100%"
              viewBox="0 0 500 500"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <circle
                  key={i}
                  cx="250"
                  cy="250"
                  r={80 + i * 35}
                  fill="none"
                  stroke="#FF6B6B"
                  strokeWidth="1"
                  strokeDasharray="10 10"
                />
              ))}

              <motion.circle
                cx="250"
                cy="250"
                r="4"
                fill="#FF6B6B"
                animate={{
                  r: [3, 6, 3],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.svg>
          </div>

          {/* 左下 回転する円 */}
          <div className="hidden lg:block"
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '10%',
              width: '250px',
              height: '250px',
              pointerEvents: 'none',
              opacity: 0.3,
              zIndex: 1
            }}
          >
            <motion.svg
              width="100%"
              height="100%"
              viewBox="0 0 500 500"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <circle
                  key={i}
                  cx="250"
                  cy="250"
                  r={80 + i * 35}
                  fill="none"
                  stroke="#FF6B6B"
                  strokeWidth="1"
                  strokeDasharray="10 10"
                />
              ))}

              <motion.circle
                cx="250"
                cy="250"
                r="4"
                fill="#FF6B6B"
                animate={{
                  r: [3, 6, 3],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.svg>
          </div>

          {/* 右上: WavePattern */}
          <div className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '600px',
              height: '400px',
              pointerEvents: 'none',
              opacity: 0.15,
              zIndex: 0
            }}
          >
            <WavePattern
              color="#FF9A8B"
              opacity={1}
              animate={true}
              waveCount={5}
              position="center"
            />
          </div>

          {/* 右 回転する円 */}
          <div className="hidden lg:block"
            style={{
              position: 'absolute',
              top: '20%',
              right: '5%',
              width: '500px',
              height: '500px',
              pointerEvents: 'none',
              opacity: 0.15,
              zIndex: 1
            }}
          >
            <motion.svg
              width="100%"
              height="100%"
              viewBox="0 0 500 500"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <circle
                  key={i}
                  cx="250"
                  cy="250"
                  r={80 + i * 35}
                  fill="none"
                  stroke="#FF6B6B"
                  strokeWidth="1"
                  strokeDasharray="10 10"
                />
              ))}

              <motion.circle
                cx="250"
                cy="250"
                r="4"
                fill="#FF6B6B"
                animate={{
                  r: [3, 6, 3],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.svg>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ maxWidth: '48rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
              <Suspense fallback={<div>読み込み中...</div>}>
                <ContactPageContent />
              </Suspense>
            </div>
          </div>
        </section>

        {/* 簡易FAQ */}
        <section style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }} className="bg-background-alt">
          {/* 右上: CircleDiagram */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '500px',
              height: '500px',
              pointerEvents: 'none',
              opacity: 0.15,
              zIndex: 0
            }}
          >
            <CircleDiagram
              color="#FF6B6B"
              opacity={1}
              animate={true}
            />
          </div>

          {/* 左下: WavePattern */}
          <div className="hidden lg:block"
            style={{
              position: 'absolute',
              bottom: '-10%',
              left: '-10%',
              width: '600px',
              height: '400px',
              pointerEvents: 'none',
              opacity: 0.2,
              zIndex: 0
            }}
          >
            <WavePattern
              color="#FF9A8B"
              opacity={1}
              animate={true}
              waveCount={5}
              position="center"
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
              <SectionTitle
                title="Quick FAQ"
                subtitle="よくある質問"
                accentColor="#FF6B6B"
                marginBottom="4rem"
              />

              {/* FAQ */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  {
                    q: '見積もりは無料ですか？',
                    a: 'はい、お見積もりは完全無料です。お気軽にお問い合わせください。'
                  },
                  {
                    q: '納期はどのくらいですか？',
                    a: 'プロジェクトの規模により異なりますが、ランディングページで2週間〜、コーポレートサイトで1〜2ヶ月程度です。'
                  },
                  {
                    q: '分割払いは可能ですか？',
                    a: 'はい、可能です。お支払い方法については柔軟に対応いたしますので、ご相談ください。'
                  },
                  {
                    q: '遠方でも対応できますか？',
                    a: 'はい、オンラインでのお打ち合わせに対応しておりますので、全国どこからでもご依頼いただけます。'
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="border border-border bg-background"
                    style={{ padding: '1.5rem' }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="flex-shrink-0 flex items-center justify-center font-bold text-white"
                        style={{
                          width: '2rem',
                          height: '2rem',
                          backgroundColor: '#FF6B6B',
                          fontSize: '0.875rem'
                        }}
                      >
                        Q
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-primary" style={{ marginBottom: '0.75rem' }}>
                          {faq.q}
                        </h3>
                        <div className="flex items-start gap-3">
                          <div
                            className="flex-shrink-0 flex items-center justify-center font-bold"
                            style={{
                              width: '2rem',
                              height: '2rem',
                              backgroundColor: 'rgba(255, 107, 107, 0.1)',
                              color: '#FF6B6B',
                              fontSize: '0.875rem'
                            }}
                          >
                            A
                          </div>
                          <p className="text-sm text-text-secondary">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Service ページのFAQへのリンク */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center"
                style={{ marginTop: '3rem' }}
              >
                <AnimatedButton href="/order?tab=faq" icon={CheckCircle}>
                  More Questions
                </AnimatedButton>
              </motion.div>
            </div>
          </div>
        </section>

      </div>
      <Footer
        ctaText="24時間以内にご返信いたします"
        ctaSubText="お問い合わせいただいた内容には、営業日24時間以内に必ずご返信いたします。お急ぎの場合はお電話でもお気軽にどうぞ。"
      />
    </>
  );
}
