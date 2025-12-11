// src/app/service/page.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import {
  Globe,
  Palette,
  Settings,
  CheckCircle,
  ArrowRight,
  Target,
  Zap,
  Shield,
  ShoppingCart,
  Layers,
  Code,
  Sparkles,
  Image as ImageIcon,
  Smartphone,
  Package
} from 'lucide-react';

// ランダム文字生成関数
const generateRandomChar = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
  return chars[Math.floor(Math.random() * chars.length)];
};

// タイトルコンポーネント
function AnimatedTitle() {
  const finalText = 'SERVICE';
  const [displayText, setDisplayText] = useState(finalText.split('').map(() => generateRandomChar()));
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);

  useEffect(() => {
    // ランダム文字のアニメーション
    const randomInterval = setInterval(() => {
      setDisplayText(prev =>
        prev.map((char, i) =>
          revealedIndices.includes(i) ? finalText[i] : generateRandomChar()
        )
      );
    }, 50);

    // 徐々に文字を確定
    const revealTimeouts: NodeJS.Timeout[] = [];
    finalText.split('').forEach((_, index) => {
      const timeout = setTimeout(() => {
        setRevealedIndices(prev => [...prev, index]);
      }, index * 150 + 500);
      revealTimeouts.push(timeout);
    });

    return () => {
      clearInterval(randomInterval);
      revealTimeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <h1 className="text-5xl lg:text-7xl font-bold tracking-wider">
      {displayText.map((char, index) => (
        <span
          key={index}
          style={{
            color: index === finalText.length - 1 ? '#0066FF' : 'var(--text-primary)',
            display: 'inline-block'
          }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
}

export default function ServicePage() {
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

  const processSteps = [
    { number: 1, title: 'お問い合わせ', icon: ArrowRight },
    { number: 2, title: 'ヒアリング', icon: ArrowRight },
    { number: 3, title: 'お見積もり', icon: ArrowRight },
    { number: 4, title: '制作開始', icon: ArrowRight },
    { number: 5, title: '納品', icon: CheckCircle }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background" style={{ paddingTop: '80px' }}>
        {/* ヒーローセクション */}
        <section
          className="relative overflow-hidden"
          style={{
            padding: '5rem 0',
            paddingTop: '8rem'
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
              style={{
                maxWidth: '56rem',
                margin: '0 auto'
              }}
            >
              {/* タイトル - アニメーション */}
              <div style={{ marginBottom: '1.5rem' }}>
                <AnimatedTitle />
              </div>

              <p
                className="text-2xl lg:text-3xl text-text-secondary"
                style={{ marginBottom: '1.5rem' }}
              >
                サービス詳細
              </p>
              <p
                className="text-base lg:text-lg text-text-secondary"
                style={{
                  maxWidth: '32rem',
                  margin: '0 auto'
                }}
              >
                あなたのビジネスを次のレベルへ。
                <br />
                確かな技術と丁寧なサポートで、理想を実現します。
              </p>
            </motion.div>
          </div>
        </section>

        {/* サービス一覧 */}
        <section
          className="bg-background-alt"
          style={{ padding: '5rem 0' }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
              {services.map((service, index) => {
                const Icon = service.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{
                      maxWidth: '80rem',
                      margin: '0 auto',
                      width: '100%'
                    }}
                  >
                    <div
                      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start`}
                      style={{ gap: '3rem' }}
                    >
                      {/* アイコン */}
                      <div className="flex-shrink-0">
                        <div
                          className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: `${service.color}20` }}
                        >
                          <Icon size={80} style={{ color: service.color }} />
                        </div>
                      </div>

                      {/* コンテンツ */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm text-text-secondary"
                          style={{ marginBottom: '0.5rem' }}
                        >
                          {service.subtitle}
                        </p>
                        <h2
                          className="text-3xl lg:text-4xl font-bold text-primary"
                          style={{ marginBottom: '1rem' }}
                        >
                          {service.title}
                        </h2>
                        <p
                          className="text-lg text-text-secondary leading-relaxed"
                          style={{ marginBottom: '2rem' }}
                        >
                          {service.description}
                        </p>

                        {/* 提供内容 (カテゴリ別) */}
                        <div style={{ marginBottom: '2rem' }}>
                          <h3
                            className="text-xl font-bold text-primary"
                            style={{ marginBottom: '1.5rem' }}
                          >
                            提供内容
                          </h3>
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

                        {/* 対応範囲 */}
                        <div
                          className="bg-background rounded-lg border-2 border-border"
                          style={{ padding: '1.5rem' }}
                        >
                          <h3
                            className="text-lg font-bold text-primary"
                            style={{ marginBottom: '1rem' }}
                          >
                            対応範囲
                          </h3>
                          <div
                            className="flex flex-wrap"
                            style={{ gap: '0.75rem' }}
                          >
                            {service.scope.map((item, i) => {
                              const ScopeIcon = item.icon;
                              return (
                                <div
                                  key={i}
                                  className="flex items-center rounded-lg border border-border"
                                  style={{
                                    padding: '0.5rem 1rem',
                                    gap: '0.5rem',
                                    backgroundColor: `${service.color}10`
                                  }}
                                >
                                  <ScopeIcon size={16} style={{ color: service.color }} />
                                  <span
                                    className="text-sm font-medium"
                                    style={{ color: service.color }}
                                  >
                                    {item.text}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 制作の流れ */}
        <section
          className="bg-background"
          style={{ padding: '5rem 0' }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
              style={{ marginBottom: '4rem' }}
            >
              <h2
                className="text-3xl lg:text-4xl font-bold text-primary"
                style={{ marginBottom: '1rem' }}
              >
                制作の流れ
              </h2>
              <p className="text-text-secondary">
                お問い合わせから納品までの5ステップ
              </p>
            </motion.div>

            <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
              <div
                className="flex flex-col md:flex-row items-center justify-between"
                style={{ gap: '1rem' }}
              >
                {processSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center"
                      style={{ gap: '1rem' }}
                    >
                      <div className="text-center">
                        <div
                          className="rounded-full text-white flex items-center justify-center text-xl font-bold"
                          style={{
                            width: '4rem',
                            height: '4rem',
                            backgroundColor: '#0066FF',
                            marginBottom: '0.5rem',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                          }}
                        >
                          {step.number}
                        </div>
                        <p className="text-sm font-semibold text-primary">
                          {step.title}
                        </p>
                      </div>
                      {index < processSteps.length - 1 && (
                        <Icon size={24} className="text-border hidden md:block" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center"
                style={{ marginTop: '3rem' }}
              >
                <Link href="/how-to-order">
                  <button
                    className="inline-flex items-center rounded-lg font-medium transition-all hover:scale-105 border-2"
                    style={{
                      borderColor: '#0066FF',
                      color: '#0066FF',
                      padding: '0.75rem 1.5rem',
                      gap: '0.5rem'
                    }}
                  >
                    <span>詳しい流れを見る</span>
                    <ArrowRight size={20} />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="bg-background-alt"
          style={{ padding: '5rem 0' }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
              style={{
                maxWidth: '48rem',
                margin: '0 auto'
              }}
            >
              <h2
                className="text-3xl lg:text-4xl font-bold text-primary"
                style={{ marginBottom: '1.5rem' }}
              >
                まずはお気軽にご相談ください
              </h2>
              <p
                className="text-text-secondary"
                style={{ marginBottom: '3rem' }}
              >
                どのサービスが最適か分からない方も、お気軽にお問い合わせください。
                <br />
                あなたのビジネスに最適なプランをご提案いたします。
              </p>

              <div
                className="flex flex-col sm:flex-row justify-center"
                style={{ gap: '1.5rem' }}
              >
                <Link href="/order">
                  <button
                    className="rounded-lg font-bold text-white transition-all hover:opacity-90 shadow-lg"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #0066FF, #0052CC)',
                      padding: '1rem 3rem'
                    }}
                  >
                    かんたん見積もり
                  </button>
                </Link>

                <Link href="/contact">
                  <button
                    className="rounded-lg font-bold transition-all hover:scale-105 border-2"
                    style={{
                      borderColor: '#0066FF',
                      color: '#0066FF',
                      padding: '1rem 3rem'
                    }}
                  >
                    詳しく相談する
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
