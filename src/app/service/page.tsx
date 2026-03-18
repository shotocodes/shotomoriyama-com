// src/app/service/page.tsx
'use client';

import { motion} from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AccordionButton from '@/components/ui/AccordionButton';
import AnimatedButton from '@/components/ui/AnimatedButton';
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import SectionTitle from '@/components/ui/SectionTitle';

import {
  Globe,
  Palette,
  Settings,
  CheckCircle,
  Target,
  Zap,
  Shield,
  ShoppingCart,
  Layers,
  Code,
  Sparkles,
  Image as ImageIcon,
  Smartphone,
  Package,
  MessageCircle,
  Users,
  Calculator,
  ChevronDown
} from 'lucide-react';



export default function ServicePage() {
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [openMobileStep, setOpenMobileStep] = useState<number | null>(null);

  const services = [
    {
      id: 'web-development',
      icon: Globe,
      title: 'Web Development',
      subtitle: 'Webサイト制作',
      description: 'ビジネスの成長を加速させる、モダンで高品質なWebサイトを制作します。コーポレートサイトからECサイト、ノーコードツールまで幅広く対応します。',
      color: '#0066FF',
      features: [
        {
          category: 'コーポレート・サービスサイト',
          items: [
            'Next.js / React による高速開発',
            'レスポンシブデザイン完全対応',
            'SEO対策・アクセス解析',
            'CMS導入 (WordPress / Headless CMS)',
            'お問い合わせフォーム実装'
          ]
        },
        {
          category: 'ECサイト・ショップ',
          items: [
            'Shopify構築・カスタマイズ',
            '決済システム連携 (Stripe / PayPal)',
            '在庫管理システム',
            'カスタムEC開発',
            '顧客管理機能'
          ]
        },
        {
          category: 'ノーコード制作',
          items: [
            'Wix / STUDIO / Webflow',
            '短期納品対応 (2週間〜)',
            '低コスト・高品質',
            '初心者でも運用しやすい',
            'カスタマイズ・拡張可能'
          ]
        },
        {
          category: '共通機能',
          items: [
            'SSL証明書対応',
            '高速化対応 (パフォーマンス最適化)',
            'アクセシビリティ対応',
            'ブラウザ互換性保証',
            'Google Analytics設定'
          ]
        }
      ],
      scope: [
        { icon: Target, text: 'コーポレートサイト' },
        { icon: ShoppingCart, text: 'ECサイト' },
        { icon: Zap, text: 'ランディングページ' },
        { icon: Layers, text: 'ノーコード制作' },
        { icon: Code, text: 'カスタム開発' }
      ]
    },
    {
      id: 'design',
      icon: Palette,
      title: 'Design',
      subtitle: 'デザイン制作',
      description: 'ブランドの個性を引き出す、印象的なデザインを提供します。ロゴからUI/UX、印刷物まで、一貫したブランド体験を創造します。',
      color: '#9333EA',
      features: [
        {
          category: 'グラフィックデザイン',
          items: [
            'ロゴデザイン (複数案提示)',
            '名刺デザイン',
            'チラシ・ポスターデザイン',
            '看板デザイン',
            'パンフレット・カタログ',
            'ブランドガイドライン作成'
          ]
        },
        {
          category: 'UI/UXデザイン',
          items: [
            'Webサイトデザイン',
            'アプリUI/UXデザイン',
            'プロトタイプ作成 (Figma)',
            'ワイヤーフレーム設計',
            'ユーザビリティ改善提案',
            'インタラクションデザイン'
          ]
        },
        {
          category: 'Web用素材',
          items: [
            'バナー制作 (各種サイズ)',
            'SNS用画像 (Instagram / Twitter / Facebook)',
            'アイコンデザイン',
            'イラスト制作',
            'モックアップ作成'
          ]
        },
        {
          category: '納品形式',
          items: [
            'ソースファイル納品 (AI / Figma / PSD)',
            '各種フォーマット対応 (PNG / JPG / SVG / PDF)',
            '印刷入稿データ作成',
            'スタイルガイド作成'
          ]
        }
      ],
      scope: [
        { icon: Palette, text: 'ロゴ・ブランディング' },
        { icon: ImageIcon, text: '印刷物デザイン' },
        { icon: Smartphone, text: 'UI/UXデザイン' },
        { icon: Sparkles, text: 'Web用素材' },
        { icon: Package, text: 'パッケージデザイン' }
      ]
    },
    {
      id: 'maintenance',
      icon: Settings,
      title: 'Maintenance & Support',
      subtitle: '保守・運用',
      description: 'サイト公開後も安心。継続的なサポートでビジネスをバックアップします。定期的な更新からセキュリティ対策まで、お任せください。',
      color: '#10B981',
      features: [
        {
          category: 'コンテンツ管理',
          items: [
            'テキスト・画像更新',
            'ページ追加・削除',
            'ブログ記事投稿代行',
            'メニュー・リンク管理',
            'バナー差し替え'
          ]
        },
        {
          category: 'セキュリティ・保守',
          items: [
            'セキュリティ対策 (脆弱性対応)',
            'バックアップ (定期自動)',
            'SSL証明書更新',
            'WordPress / プラグイン更新',
            '障害対応 (緊急時サポート)'
          ]
        },
        {
          category: '分析・改善',
          items: [
            'アクセス解析レポート (月次)',
            'SEO改善提案',
            'コンバージョン改善提案',
            'パフォーマンス監視',
            'ヒートマップ分析'
          ]
        },
        {
          category: 'サーバー管理',
          items: [
            'ドメイン・サーバー管理',
            'メールアカウント管理',
            'パフォーマンス最適化',
            'データベース管理',
            '定期メンテナンス'
          ]
        }
      ],
      scope: [
        { icon: Shield, text: 'セキュリティ保守' },
        { icon: Shield, text: 'コンテンツ更新' },
        { icon: Shield, text: 'サーバー監視' },
        { icon: Shield, text: 'アクセス解析' },
        { icon: Shield, text: 'SEO改善' }
      ]
    }
  ];

  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-background"
        style={{
          paddingTop: '80px',
          overflowX: 'hidden'
        }}
      >
        {/* ヒーローセクション */}
<section
  className="relative"
  style={{
    padding: '5rem 0',
    paddingTop: '8rem',
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
  }}
>
  {/* グリッド背景 */}
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: `
        linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px',
      opacity: 0.5,
      pointerEvents: 'none',
      zIndex: 0
    }}
  />

{/* 揺らぐ円形ダイアグラム - 超大型 */}
<div
  className="hidden lg:block absolute"
  style={{
    top: '20%',
    right: '-25%',
    width: '1000px',
    height: '1000px',
    pointerEvents: 'none',
    zIndex: 1
  }}
>
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 400"
    style={{
      filter: 'drop-shadow(0 0 30px rgba(0, 102, 255, 0.1))',
      opacity: 0.6
    }}
  >
    {/* 外側の円 */}
    <motion.circle
      cx="200"
      cy="200"
      r="180"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      className="text-text-secondary"
      style={{ opacity: 0.8 }}
      animate={{
        r: [175, 190, 175],
        strokeWidth: [0.4, 0.6, 0.4]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />

    {/* 中間の円1 */}
    <motion.circle
      cx="200"
      cy="200"
      r="140"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.4"
      strokeDasharray="8 8"
      className="text-text-secondary"
      style={{
        opacity: 0.6,
        transformOrigin: 'center'
      }}
      animate={{
        r: [135, 148, 135],
        rotate: [0, 360]
      }}
      transition={{
        r: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: {
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }
      }}
    />

    {/* 中間の円2 */}
    <motion.circle
      cx="200"
      cy="200"
      r="100"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.4"
      strokeDasharray="6 6"
      className="text-text-secondary"
      style={{
        opacity: 0.5,
        transformOrigin: 'center'
      }}
      animate={{
        r: [95, 108, 95],
        rotate: [360, 0]
      }}
      transition={{
        r: {
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: {
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }
      }}
    />

    {/* 内側の円 (極細) */}
    <motion.circle
      cx="200"
      cy="200"
      r="60"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      className="text-text-secondary"
      style={{ opacity: 0.7 }}
      animate={{
        r: [55, 68, 55],
        strokeWidth: [0.4, 0.6, 0.4],
        opacity: [0.6, 0.9, 0.6]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />

    {/* 中心点*/}
    <motion.circle
      cx="200"
      cy="200"
      r="3"
      fill="#0066FF"
      animate={{
        r: [2, 4, 2],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />

    {/* 放射状のライン */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const x1 = 200 + 65 * Math.cos((angle * Math.PI) / 180);
      const y1 = 200 + 65 * Math.sin((angle * Math.PI) / 180);
      const x2 = 200 + 175 * Math.cos((angle * Math.PI) / 180);
      const y2 = 200 + 175 * Math.sin((angle * Math.PI) / 180);

      return (
        <motion.line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="currentColor"
          strokeWidth="0.4"
          className="text-text-secondary"
          animate={{
            opacity: [0.2, 0.7, 0.2],
            strokeWidth: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      );
    })}

    {/* 波紋エフェクト  */}
    <motion.circle
      cx="200"
      cy="200"
      r="0"
      fill="none"
      stroke="#0066FF"
      strokeWidth="0.5"
      opacity="0"
      animate={{
        r: [0, 180],
        opacity: [0.6, 0],
        strokeWidth: [0.8, 0.2]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeOut"
      }}
    />

    {/* 軌道を描く点  */}
    {[
      { radius: 180, duration: 15, size: 2.5, delay: 0 },
      { radius: 140, duration: 12, size: 2, delay: 2 },
      { radius: 100, duration: 10, size: 2, delay: 4 }
    ].map((orbit, i) => (
      <motion.circle
        key={`orbit-${i}`}
        r={orbit.size}
        fill="#0066FF"
        style={{
          filter: 'blur(0.3px)',
          opacity: 0.7
        }}
        animate={{
          cx: [
            200 + orbit.radius,
            200,
            200 - orbit.radius,
            200,
            200 + orbit.radius
          ],
          cy: [
            200,
            200 - orbit.radius,
            200,
            200 + orbit.radius,
            200
          ],
          opacity: [0.5, 0.9, 0.5, 0.9, 0.5]
        }}
        transition={{
          duration: orbit.duration,
          repeat: Infinity,
          ease: "linear",
          delay: orbit.delay
        }}
      />
    ))}

    {/* ランダムに光る点  */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 360) / 8;
      const radius = 120 + Math.random() * 40;
      const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
      const y = 200 + radius * Math.sin((angle * Math.PI) / 180);

      return (
        <motion.circle
          key={`particle-${i}`}
          cx={x}
          cy={y}
          r="1.5"
          fill="#0066FF"
          animate={{
            opacity: [0, 1, 0],
            r: [0.8, 2, 0.8]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      );
    })}
  </svg>

  {/* テキストラベル */}
  <motion.div
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
    style={{ pointerEvents: 'none' }}
    animate={{
      opacity: [0.4, 0.8, 0.4]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <p className="text-base text-text-secondary font-light">
      All-in-One
    </p>
    <p className="text-sm text-text-secondary opacity-60">
      Solution
    </p>
  </motion.div>
</div>

<div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 10 }}>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    {/* 左側: タイトル + 全テキスト */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* タイトル */}
      <div style={{ marginBottom: '2rem' }}>
        <AnimatedTitle text="SERVICE" accentColor="#0066FF" />
      </div>

      {/* サブタイトル */}
      <p
        className="text-xl lg:text-2xl text-text-secondary font-light"
        style={{ marginBottom: '1rem' }}
      >
        サービス詳細
      </p>

      {/* アクセントライン */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '120px' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          height: '3px',
          background: 'linear-gradient(to right, #0066FF, transparent)',
          marginBottom: '2rem'
        }}
      />

      {/* メインメッセージ */}
      <p
        className="text-2xl lg:text-3xl text-primary font-light leading-relaxed"
        style={{ marginBottom: '1rem' }}
      >
        あなたのアイデアを
        <br />
        形にします
      </p>

      {/* サブメッセージ */}
      <p
        className="text-base lg:text-lg text-text-secondary leading-relaxed"
      >
        確かな技術と丁寧なサポートで、理想を実現します。
      </p>
    </motion.div>

    {/* 右側: 空白 (サークル用のスペース) */}
    <div className="hidden lg:block" />
  </div>
</div>
</section>


{/* サービス一覧 - 縦並び + ミニマル */}
<section
  className="bg-background-alt"
  style={{ padding: '5rem 0' }}
>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {/* タイトル */}
        <SectionTitle
  title="Services"
  subtitle="提供サービス"
  accentColor="#0066FF"
  marginBottom="4rem"
/>

    {/* サービスリスト */}
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4rem',
        maxWidth: '56rem',
        margin: '0 auto'
      }}
    >
      {services.map((service, index) => {
        const Icon = service.icon;
        const isOpen = openServiceId === service.id;

        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* ヘッダー */}
            <div
              className="flex items-start"
              style={{ gap: '1rem', marginBottom: '1.5rem' }}
            >
              {/* 小さなアイコン */}
              <div
                className="flex-shrink-0 rounded-lg flex items-center justify-center"
                style={{
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: `${service.color}20`
                }}
              >
                <Icon size={24} style={{ color: service.color }} />
              </div>

              {/* タイトル + サブタイトル */}
              <div className="flex-1">
                <p
                  className="text-sm font-medium"
                  style={{
                    color: service.color,
                    marginBottom: '0.25rem'
                  }}
                >
                  {service.subtitle}
                </p>
                <h3 className="text-2xl lg:text-3xl font-bold text-primary">
                  {service.title}
                </h3>
              </div>
            </div>

            {/* 説明 */}
            <p
              className="text-base text-text-secondary leading-relaxed"
              style={{ marginBottom: '2rem' }}
            >
              {service.description}
            </p>

            {/* 提供内容ボタン */}
<div style={{ marginBottom: '2rem' }}>
  <AccordionButton
    isOpen={isOpen}
    onClick={() => setOpenServiceId(isOpen ? null : service.id)}
  >
    提供内容を見る
  </AccordionButton>

  {/* アコーディオン中身 */}
  <motion.div
    initial={false}
    animate={{
      height: isOpen ? 'auto' : 0,
      opacity: isOpen ? 1 : 0
    }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
    style={{ overflow: 'hidden' }}
  >
    <div
      style={{
        marginTop: '1rem',
        padding: '2rem',
        backgroundColor: 'transparent',
        border: '1px solid var(--color-border)',
        borderRadius: '8px'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {service.features.map((featureGroup, i) => (
          <div key={i}>
            <h4
              className="text-base font-bold"
              style={{
                color: service.color,
                marginBottom: '0.75rem'
              }}
            >
              {featureGroup.category}
            </h4>
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: '0.5rem' }}
            >
              {featureGroup.items.map((item, j) => (
                <div
                  key={j}
                  className="flex items-start"
                  style={{ gap: '0.5rem' }}
                >
                  <CheckCircle
                    size={16}
                    style={{
                      color: service.color,
                      flexShrink: 0,
                      marginTop: '0.25rem'
                    }}
                  />
                  <span className="text-text-secondary text-sm">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
</div>

            {/* 対応範囲 - シンプル */}
            <div>
              <h4
                className="text-sm font-bold text-text-secondary"
                style={{ marginBottom: '0.75rem' }}
              >
                対応範囲
              </h4>
              <div
                className="flex flex-wrap"
                style={{ gap: '0.5rem' }}
              >
                {service.scope.map((item, i) => {
                  const ScopeIcon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center border border-border"
                      style={{
                        padding: '0.5rem 0.75rem',
                        gap: '0.375rem',
                        backgroundColor: `${service.color}10`,
                        borderRadius: '6px'
                      }}
                    >
                      <ScopeIcon size={14} style={{ color: service.color }} />
                      <span
                        className="text-xs font-medium"
                        style={{ color: service.color }}
                      >
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 区切り線 (最後以外) */}
            {index < services.length - 1 && (
              <div
                style={{
                  marginTop: '4rem',
                  height: '1px',
                  background: 'var(--color-border)',
                  opacity: 0.3
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

{/* Timeline - 制作の流れ (円 + 横並び) */}
<section
  style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }}
>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {/* タイトル */}
        <SectionTitle
  title="Flow"
  subtitle="制作の流れ"
  accentColor="#0066FF"
  marginBottom="4rem"
/>

{/* 背景の円形グラフィック */}
<div
  style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '800px',
    pointerEvents: 'none',
    opacity: 0.3,
    zIndex: 0
  }}
>
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 400"
  >
    {/* 外側の円 */}
    <motion.circle
      cx="200"
      cy="200"
      r="180"
      fill="none"
      stroke="currentColor"
      className="text-text-secondary"
      strokeWidth="0.5"
      initial={{ pathLength: 0, rotate: 0 }}
      whileInView={{ pathLength: 1, rotate: 360 }}
      viewport={{ once: true }}
      transition={{ duration: 3, ease: "easeInOut" }}
    />

    {/* 中間の円 */}
    <motion.circle
      cx="200"
      cy="200"
      r="140"
      fill="none"
      stroke="currentColor"
      className="text-text-secondary"
      strokeWidth="0.5"
      strokeDasharray="8 8"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
    />

    {/* 内側の円 */}
    <motion.circle
      cx="200"
      cy="200"
      r="100"
      fill="none"
      stroke="currentColor"
      className="text-text-secondary"
      strokeWidth="0.5"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }}
    />

    {/* 軌道を描く点 (惑星風) */}
    {[
      { radius: 180, duration: 15, size: 2.5, delay: 0 },
      { radius: 140, duration: 12, size: 2, delay: 2 },
      { radius: 100, duration: 10, size: 2, delay: 4 }
    ].map((orbit, i) => (
      <motion.circle
        key={`orbit-${i}`}
        r={orbit.size}
        fill="#0066FF"
        style={{
          filter: 'blur(0.3px)',
          opacity: 0.7
        }}
        animate={{
          cx: [
            200 + orbit.radius,
            200,
            200 - orbit.radius,
            200,
            200 + orbit.radius
          ],
          cy: [
            200,
            200 - orbit.radius,
            200,
            200 + orbit.radius,
            200
          ],
          opacity: [0.5, 0.9, 0.5, 0.9, 0.5]
        }}
        transition={{
          duration: orbit.duration,
          repeat: Infinity,
          ease: "linear",
          delay: orbit.delay
        }}
      />
    ))}

    {/* ランダムに光る点 */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 360) / 8;
      const radius = 120 + Math.random() * 40;
      const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
      const y = 200 + radius * Math.sin((angle * Math.PI) / 180);

      return (
        <motion.circle
          key={`particle-${i}`}
          cx={x}
          cy={y}
          r="1.5"
          fill="#0066FF"
          animate={{
            opacity: [0, 1, 0],
            r: [0.8, 2, 0.8]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      );
    })}
  </svg>
</div>

    {/* タイムライン - 横並び */}
    <div
      style={{
        maxWidth: '64rem',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* PC版 */}
<div className="hidden lg:block">
  <div style={{ position: 'relative' }}>
    {/* 線 */}
    <div
      style={{
        position: 'absolute',
        top: '4rem',
        left: '12%',
        right: '12%',
        height: '1px',
        background: 'linear-gradient(to right, transparent, var(--color-border), var(--color-border), var(--color-border), transparent)',
        zIndex: 0
      }}
    />

    {/* ステップ */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '1rem',
        position: 'relative',
        zIndex: 1
      }}
    >
      {[
        {
          number: 1,
          title: 'お問い合わせ',
          icon: MessageCircle,
          detail: 'まずはお気軽にご相談ください。メール・LINE・お電話で対応可能です。24時間以内にご返信いたします。'
        },
        {
          number: 2,
          title: 'ヒアリング',
          icon: Users,
          detail: 'ご要望やビジネス目標を詳しくお伺いし、最適なプランをご提案します。オンライン・対面どちらでも対応可能です。'
        },
        {
          number: 3,
          title: 'お見積もり',
          icon: Calculator,
          detail: '明確な料金体系で、追加費用なしの安心見積もりをご提示します。分割払いにも対応しております。'
        },
        {
          number: 4,
          title: '制作開始',
          icon: Code,
          detail: 'デザイン・開発を開始。進捗は随時共有し、修正は無制限で対応します。制作期間は2週間〜2ヶ月です。'
        },
        {
          number: 5,
          title: '納品',
          icon: CheckCircle,
          detail: '完成後、公開サポートと1ヶ月間の無償保守をご提供いたします。操作マニュアルもお渡しします。'
        }
      ].map((step, index) => {
        const Icon = step.icon;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="text-center relative group"
          >
            {/* 数字 - ホバーで反転 */}
            <motion.div
              className="mx-auto border-2 border-border flex items-center justify-center font-bold bg-background group-hover:bg-primary group-hover:text-background transition-all duration-300"
              style={{
                width: '8rem',
                height: '8rem',
                fontSize: '3rem',
                color: '#0066FF',
                marginBottom: '2rem',
                position: 'relative',
                cursor: 'pointer'
              }}
              whileHover={{ scale: 1.05 }}
            >
              {String(step.number).padStart(2, '0')}

              {/* アイコン (右下) - ホバーで白背景 */}
              <div
                className="absolute transition-all duration-300 group-hover:bg-background"
                style={{
                  bottom: '-0.75rem',
                  right: '-0.75rem',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  backgroundColor: '#0066FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid var(--color-background)'
                }}
              >
                <Icon
                  size={16}
                  className="group-hover:text-primary transition-colors duration-300"
                  style={{ color: 'white' }}
                />
              </div>
            </motion.div>

            {/* タイトル */}
            <h4
              className="font-bold text-primary"
              style={{
                fontSize: '1.125rem',
                marginBottom: '0.5rem'
              }}
            >
              {step.title}
            </h4>

            {/* テロップ (ホバー時) */}
<div
  className="absolute left-1/2 transform -translate-x-1/2 bg-background border-2 border-border shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
  style={{
    top: 'calc(100% + 1rem)',
    width: '40rem',
    padding: '1rem',
    borderRadius: '8px',
    pointerEvents: 'none'
  }}
>
  {/* 矢印 */}
  <div
    className="absolute bg-background border-t-2 border-l-2 border-border"
    style={{
      top: '-0.5rem',
      left: '50%',
      transform: 'translateX(-50%) rotate(45deg)',
      width: '1rem',
      height: '1rem'
    }}
  />

  {/* テキスト (流れる) */}
  <div style={{ overflow: 'hidden' }}>
    <motion.p
      key={`tooltip-${step.number}`} // ← 追加: ホバーごとにリセット
      className="text-sm text-text-secondary"
      initial={{ x: '100%' }} // ← 右端から開始
      animate={{ x: '-100%' }} // ← 左端へ流れる
      transition={{
        duration: 15, // ゆっくり流れる
        repeat: Infinity,
        ease: 'linear',
        delay: 1 // 1秒待ってから流れ始める
      }}
      style={{ whiteSpace: 'nowrap' }}
    >
      {step.detail}
    </motion.p>
  </div>
</div>
          </motion.div>
        );
      })}
    </div>
  </div>
</div>

{/* モバイル版 - タップで開閉 */}
<div className="lg:hidden">
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>


    {[
      {
        number: 1,
        title: 'お問い合わせ',
        icon: MessageCircle,
        detail: 'まずはお気軽にご相談ください。メール・LINE・お電話で対応可能です。24時間以内にご返信いたします。'
      },
      {
        number: 2,
        title: 'ヒアリング',
        icon: Users,
        detail: 'ご要望やビジネス目標を詳しくお伺いし、最適なプランをご提案します。オンライン・対面どちらでも対応可能です。'
      },
      {
        number: 3,
        title: 'お見積もり',
        icon: Calculator,
        detail: '明確な料金体系で、追加費用なしの安心見積もりをご提示します。分割払いにも対応しております。'
      },
      {
        number: 4,
        title: '制作開始',
        icon: Code,
        detail: 'デザイン・開発を開始。進捗は随時共有し、修正は無制限で対応します。制作期間は2週間〜2ヶ月です。'
      },
      {
        number: 5,
        title: '納品',
        icon: CheckCircle,
        detail: '完成後、公開サポートと1ヶ月間の無償保守をご提供いたします。操作マニュアルもお渡しします。'
      }
    ].map((step, index) => {
      const Icon = step.icon;
      const isOpen = openMobileStep === index;

      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          {/* ステップ - タップで反転 */}
          <div
            onClick={() => setOpenMobileStep(isOpen ? null : index)}
            className="transition-all duration-300"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              cursor: 'pointer'
            }}
          >
            <div
              className="flex-shrink-0 border-2 border-border flex items-center justify-center font-bold relative transition-all duration-300"
              style={{
                width: '5rem',
                height: '5rem',
                fontSize: '2rem',
                backgroundColor: isOpen ? 'var(--color-text-primary)' : 'var(--color-background)',
                color: isOpen ? 'var(--color-background)' : 'var(--color-text-primary)'
              }}
            >
              {String(step.number).padStart(2, '0')}

              <div
                className="absolute transition-all duration-300"
                style={{
                  bottom: '-0.5rem',
                  right: '-0.5rem',
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  backgroundColor: isOpen ? 'var(--color-background)' : '#0066FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '3px solid var(--color-background)'
                }}
              >
                <Icon
                  size={14}
                  style={{
                    color: isOpen ? 'var(--text-primary)' : 'white',
                    transition: 'color 0.3s'
                  }}
                />
              </div>
            </div>

            <h4
              className="font-bold text-primary flex-1"
              style={{ fontSize: '1.125rem' }}
            >
              {step.title}
            </h4>

            {/* 開閉アイコン */}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={24} className="text-text-secondary" />
            </motion.div>
          </div>

          {/* テロップ (タップで表示) */}
          <motion.div
            initial={false}
            animate={{
              height: isOpen ? 'auto' : 0,
              opacity: isOpen ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden',
              marginTop: '1rem',
              marginLeft: '6.5rem'
            }}
          >
            <div
              className="bg-background border-2 border-border"
              style={{
                padding: '1rem',
                borderRadius: '8px'
              }}
            >
              <p className="text-sm text-text-secondary">
                {step.detail}
              </p>
            </div>
          </motion.div>
        </motion.div>
      );
    })}
  </div>
</div>
    </div>
  </div>
</section>
      </div>

{/* FAQ セクション */}
<section
  style={{
    padding: '8rem 0',
    position: 'relative',
    overflow: 'hidden'
  }}
>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {/* タイトル */}
    <SectionTitle
  title="FAQ"
  subtitle="よくある質問"
  accentColor="#0066FF"
  marginBottom="4rem"
/>

    {/* 背景 - 放射線サークル (右上) */}
    <div
      style={{
        position: 'absolute',
        top: '-10%',
        right: '-8%',
        width: '800px',
        height: '800px',
        pointerEvents: 'none',
        opacity: 0.3,
        zIndex: 0
      }}
    >
      <motion.div
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 400 400">
          {/* 中心点 */}
          <circle cx="200" cy="200" r="3" fill="#0066FF" opacity="0.5" />

          {/* 放射状のライン */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
            const length = 180;
            const x1 = 200 + 15 * Math.cos((angle * Math.PI) / 180);
            const y1 = 200 + 15 * Math.sin((angle * Math.PI) / 180);
            const x2 = 200 + length * Math.cos((angle * Math.PI) / 180);
            const y2 = 200 + length * Math.sin((angle * Math.PI) / 180);

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                className="text-text-secondary"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* 円 */}
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="currentColor"
            className="text-text-secondary"
            strokeWidth="0.5"
          />
          <circle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke="currentColor"
            className="text-text-secondary"
            strokeWidth="0.5"
            strokeDasharray="8 8"
          />
        </svg>
      </motion.div>
    </div>

    {/* FAQ リスト */}
    <div
      style={{
        maxWidth: '48rem',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          {
            q: '制作期間はどのくらいですか？',
            a: 'プロジェクトの規模によりますが、ランディングページで2週間〜、コーポレートサイトで1〜2ヶ月程度です。お急ぎの場合はご相談ください。'
          },
          {
            q: '料金はいくらですか？',
            a: 'プロジェクトの内容により異なります。まずはお見積もりを無料でご提示しますので、お気軽にお問い合わせください。分割払いにも対応しております。'
          },
          {
            q: '修正は何回まで可能ですか？',
            a: '制作期間中の修正回数に制限はありません。ご納得いただけるまで丁寧に対応いたします。ただし、大幅な仕様変更の場合は追加料金が発生する場合があります。'
          },
          {
            q: '公開後のサポートはありますか？',
            a: '納品後1ヶ月間は無償で保守サポートいたします。その後も月額制の保守プランをご用意しておりますので、継続的なサポートが可能です。'
          },
          {
            q: '遠方でも対応可能ですか？',
            a: 'オンラインでのお打ち合わせに対応しておりますので、全国どこからでもご依頼いただけます。必要に応じて対面でのお打ち合わせも可能です。'
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
              {/* Q マーク */}
              <div
                className="flex-shrink-0 flex items-center justify-center font-bold text-white"
                style={{
                  width: '2rem',
                  height: '2rem',
                  backgroundColor: '#0066FF',
                  fontSize: '0.875rem'
                }}
              >
                Q
              </div>

              <div className="flex-1">
                {/* 質問 */}
                <h3 className="font-bold text-primary" style={{ marginBottom: '0.75rem' }}>
                  {faq.q}
                </h3>

                {/* 回答 */}
                <div className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 flex items-center justify-center font-bold"
                    style={{
                      width: '2rem',
                      height: '2rem',
                      backgroundColor: 'rgba(0, 102, 255, 0.1)',
                      color: '#0066FF',
                      fontSize: '0.875rem'
                    }}
                  >
                    A
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 詳細ページへのボタン */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
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


{/* 料金セクション */}
<section
  style={{
    padding: '8rem 0',
    position: 'relative',
    overflow: 'hidden'
  }}
  className="bg-background-alt"
>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {/* タイトル */}
        <SectionTitle
  title="Pricing"
  subtitle="料金について"
  accentColor="#0066FF"
  marginBottom="4rem"
/>

    {/* 背景 - グリッド + 円形 */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: 1,
        pointerEvents: 'none',
        zIndex: 0
      }}
    />

    {/* 背景 - 円形 (左下) */}
    <div
      style={{
        position: 'absolute',
        bottom: '-15%',
        left: '-10%',
        width: '600px',
        height: '600px',
        pointerEvents: 'none',
        opacity: 0.3,
        zIndex: 0
      }}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="currentColor"
          className="text-text-secondary"
          strokeWidth="0.5"
          strokeDasharray="10 10"
        />
        <circle
          cx="200"
          cy="200"
          r="100"
          fill="none"
          stroke="currentColor"
          className="text-text-secondary"
          strokeWidth="0.5"
        />
      </motion.svg>
    </div>

{/* 料金カード */}
<div
  style={{
    maxWidth: '80rem',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1
  }}
>
  <div
    className="grid grid-cols-1 md:grid-cols-3"
    style={{ gap: '2rem' }}
  >
    {[
      {
        id: 1,
        name: 'Light',
        subtitle: 'ランディングページ',
        price: '100,000',
        description: 'シンプルなLP制作に最適',
        features: [
          '1ページ構成',
          'レスポンシブ対応',
          'お問い合わせフォーム',
          '1ヶ月間無償保守'
        ]
      },
      {
        id: 2,
        name: 'Standard',
        subtitle: 'コーポレートサイト',
        price: '300,000',
        description: '企業サイトに最適',
        features: [
          '5ページ構成',
          'CMS導入',
          'SEO対策',
          '3ヶ月間無償保守'
        ],
        popular: true
      },
      {
        id: 3,
        name: 'Premium',
        subtitle: 'ECサイト・大規模',
        price: '500,000',
        description: '本格的なサイト制作',
        features: [
          '10ページ以上',
          'カスタム機能開発',
          '決済システム連携',
          '6ヶ月間無償保守'
        ]
      }
    ].map((plan, index) => (
      <motion.div
        key={plan.id}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative group"
      >
        {/* 人気バッジ */}
        {plan.popular && (
          <div
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-background text-xs font-bold px-4 py-1"
            style={{ zIndex: 2 }}
          >
            POPULAR
          </div>
        )}

        {/* カード */}
        <div
          className="border border-border bg-background transition-all duration-300 hover:border-primary"
          style={{
            padding: '2.5rem 2rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* プラン名 */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p className="text-sm text-text-secondary mb-1">
              {plan.subtitle}
            </p>
            <h3 className="text-2xl font-bold text-primary">
              {plan.name}
            </h3>
          </div>

          {/* 料金 */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-primary">
                ¥{plan.price.toLocaleString()}
              </span>
              <span className="text-sm text-text-secondary">
                〜
              </span>
            </div>
          </div>

          {/* 説明 */}
          <p
            className="text-sm text-text-secondary"
            style={{ marginBottom: '2rem' }}
          >
            {plan.description}
          </p>

          {/* 機能リスト */}
          <div style={{ flex: 1, marginBottom: '2rem' }}>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle
                    size={16}
                    style={{
                      color: '#0066FF',
                      flexShrink: 0,
                      marginTop: '0.25rem'
                    }}
                  />
                  <span className="text-sm text-text-secondary">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ボタン */}
          <div>
            <Link href="/contact">
              <div
                className="w-full text-center border border-border py-3 font-bold transition-all duration-300 hover:bg-primary hover:text-background hover:border-primary cursor-pointer"
              >
                お見積もり
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    ))}
  </div>

  {/* 注意書き */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.5 }}
    className="text-center"
    style={{ marginTop: '3rem' }}
  >
    <p className="text-sm text-text-secondary">
      ※ 料金はプロジェクトの内容により変動します。詳細なお見積もりは無料でご提示いたします。
    </p>
  </motion.div>
</div>
  </div>
</section>

      <Footer
        ctaText="まずはお気軽にご相談ください"
        ctaSubText="どのサービスが最適か分からない方も、お気軽にお問い合わせください。あなたのビジネスに最適なプランをご提案いたします。"
      />
    </>
  );
}
