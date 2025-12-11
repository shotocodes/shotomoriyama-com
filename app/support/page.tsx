// src/app/support/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import {
  Shield,
  CheckCircle,
  Clock,
  Zap,
  Database,
  Lock,
  BarChart,
  FileText,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Star
} from 'lucide-react';

export default function SupportPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'ベーシック',
      subtitle: 'Basic',
      price: '¥30,000',
      period: '/月',
      description: '小規模サイト向けの基本プラン',
      color: '#4ECDC4',
      isPopular: false,
      features: [
        { name: 'コンテンツ更新', detail: '月2回まで' },
        { name: 'セキュリティ対策', detail: '基本対応' },
        { name: 'バックアップ', detail: '週1回' },
        { name: '障害対応', detail: '営業時間内' },
        { name: 'メールサポート', detail: '2営業日以内' },
        { name: 'レポート', detail: '月次' }
      ],
      recommended: '個人事業主・小規模サイト'
    },
    {
      id: 'standard',
      name: 'スタンダード',
      subtitle: 'Standard',
      price: '¥50,000',
      period: '/月',
      description: '中規模サイト向けの充実プラン',
      color: '#FF8C42',
      isPopular: true,
      features: [
        { name: 'コンテンツ更新', detail: '月4回まで' },
        { name: 'セキュリティ対策', detail: '強化対応' },
        { name: 'バックアップ', detail: '毎日' },
        { name: '障害対応', detail: '24時間以内' },
        { name: 'メール・チャットサポート', detail: '1営業日以内' },
        { name: 'レポート', detail: '月次 + 改善提案' },
        { name: 'SEO対策', detail: '基本対応' },
        { name: '優先対応', detail: 'あり' }
      ],
      recommended: '中小企業・ECサイト'
    },
    {
      id: 'premium',
      name: 'プレミアム',
      subtitle: 'Premium',
      price: '¥100,000',
      period: '/月',
      description: '大規模サイト向けのVIPプラン',
      color: '#9333EA',
      isPopular: false,
      features: [
        { name: 'コンテンツ更新', detail: '無制限' },
        { name: 'セキュリティ対策', detail: '最高レベル' },
        { name: 'バックアップ', detail: 'リアルタイム' },
        { name: '障害対応', detail: '即時対応' },
        { name: '専任サポート', detail: '24時間365日' },
        { name: 'レポート', detail: '週次 + 戦略提案' },
        { name: 'SEO対策', detail: '高度な対応' },
        { name: '新機能開発', detail: '月1件まで' },
        { name: 'コンサルティング', detail: '月2時間' }
      ],
      recommended: '大企業・大規模ECサイト'
    }
  ];

  const supportDetails = [
    {
      icon: FileText,
      title: 'コンテンツ更新',
      description: 'テキスト・画像の変更、新規ページ追加など、サイトの更新作業を代行します。',
      color: '#0066FF'
    },
    {
      icon: Lock,
      title: 'セキュリティ対策',
      description: 'SSL証明書の管理、脆弱性対策、不正アクセス監視など、サイトを守ります。',
      color: '#EF4444'
    },
    {
      icon: Database,
      title: 'バックアップ',
      description: '定期的なバックアップで、万が一のトラブルにも迅速に復旧できます。',
      color: '#10B981'
    },
    {
      icon: Zap,
      title: '障害対応',
      description: 'サイトダウンやエラー発生時に迅速に対応。ビジネスへの影響を最小限に。',
      color: '#FF8C42'
    },
    {
      icon: BarChart,
      title: 'レポート作成',
      description: 'アクセス解析データを分析し、改善提案を含むレポートを定期的に提供。',
      color: '#9333EA'
    },
    {
      icon: Mail,
      title: 'サポート対応',
      description: 'メール・チャット・電話で、疑問や相談にいつでもお答えします。',
      color: '#4ECDC4'
    }
  ];

  const faqs = [
    {
      q: 'サポートの対応時間はいつですか?',
      a: 'ベーシックプランは平日10:00-18:00、スタンダードプランは平日9:00-20:00、プレミアムプランは24時間365日対応しています。'
    },
    {
      q: 'コンテンツ更新の回数制限を超えた場合は?',
      a: '追加料金で対応可能です。頻繁に更新が必要な場合は、上位プランへの変更をおすすめします。'
    },
    {
      q: '契約期間の縛りはありますか?',
      a: '最低契約期間は3ヶ月です。それ以降は1ヶ月単位で継続または解約が可能です。'
    },
    {
      q: '途中でプラン変更できますか?',
      a: 'はい、可能です。翌月からプラン変更が適用されます。'
    },
    {
      q: '緊急時の対応はどうなりますか?',
      a: 'プランに応じて対応時間が異なります。プレミアムプランでは緊急時も即時対応いたします。'
    },
    {
      q: 'バックアップからの復旧にかかる時間は?',
      a: '通常1-2時間以内に復旧可能です。データ量によって変動する場合があります。'
    },
    {
      q: 'サポート範囲外の作業はありますか?',
      a: '大規模なサイトリニューアルや新機能開発は別途お見積もりとなります。ご相談ください。'
    },
    {
      q: '他社で制作したサイトもサポート可能ですか?',
      a: 'はい、可能です。まずはサイトの状況を確認させていただきます。'
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background" style={{ paddingTop: '80px' }}>
        {/* ヒーローセクション */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl lg:text-7xl font-bold text-primary mb-6 tracking-wider">
                SUPPORT
              </h1>
              <p className="text-2xl lg:text-3xl text-text-secondary mb-6">
                保守・運用サポート
              </p>
              <p className="text-base lg:text-lg text-text-secondary max-w-2xl mx-auto">
                サイト公開後も安心。
                <br />
                継続的なサポートでビジネスの成長をバックアップします。
              </p>
            </motion.div>
          </div>
        </section>

        {/* プラン一覧 */}
        <section className="py-20 bg-background-alt">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                料金プラン
              </h2>
              <p className="text-text-secondary">
                ビジネスの規模に合わせて選べる3つのプラン
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* 人気バッジ */}
                  {plan.isPopular && (
                    <div
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-white text-sm font-bold flex items-center gap-1"
                      style={{ backgroundColor: plan.color }}
                    >
                      <Star size={14} fill="white" />
                      <span>人気</span>
                    </div>
                  )}

                  <div
                    className={`h-full bg-background rounded-lg p-8 border-2 transition-all hover:scale-105 ${
                      plan.isPopular ? 'shadow-xl' : ''
                    }`}
                    style={{
                      borderColor: plan.isPopular ? plan.color : 'var(--border)'
                    }}
                  >
                    {/* ヘッダー */}
                    <div className="text-center mb-6">
                      <p className="text-sm text-text-secondary mb-2">
                        {plan.subtitle}
                      </p>
                      <h3 className="text-2xl font-bold text-primary mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-text-secondary mb-4">
                        {plan.description}
                      </p>
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-primary">
                          {plan.price}
                        </span>
                        <span className="text-text-secondary ml-1">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    {/* 特徴リスト */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle
                            size={20}
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: plan.color }}
                          />
                          <div>
                            <p className="text-primary font-medium">
                              {feature.name}
                            </p>
                            <p className="text-sm text-text-secondary">
                              {feature.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* おすすめ */}
                    <div className="pt-6 border-t-2 border-border">
                      <p className="text-sm text-text-secondary text-center">
                        おすすめ
                      </p>
                      <p className="text-sm font-semibold text-primary text-center">
                        {plan.recommended}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* サポート内容詳細 */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                サポート内容
              </h2>
              <p className="text-text-secondary">
                充実したサポートで、安心してサイト運営ができます
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {supportDetails.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-background-alt rounded-lg p-6 border-2 border-border hover:border-[#FF8C42] transition-all"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <Icon size={32} style={{ color: item.color }} />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* よくある質問 */}
        <section className="py-20 bg-background-alt">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                よくある質問
              </h2>
              <p className="text-text-secondary">
                サポートに関するよくあるご質問
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFAQ === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="bg-background rounded-lg border-2 border-border overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFAQ(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-background-alt transition-colors"
                    >
                      <span className="font-semibold text-primary pr-4">
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp size={20} className="text-text-secondary flex-shrink-0" />
                      ) : (
                        <ChevronDown size={20} className="text-text-secondary flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-text-secondary leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6">
                最適なプランをご提案します
              </h2>
              <p className="text-text-secondary mb-12">
                どのプランが最適か分からない方も、お気軽にご相談ください。
                <br />
                サイトの規模や運用状況に合わせて、最適なプランをご提案いたします。
              </p>

              <Link href="/contact">
                <button
                  className="px-12 py-4 rounded-lg font-bold text-white transition-all hover:opacity-90 shadow-lg"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #FF8C42, #FF6B35)'
                  }}
                >
                  プランを相談する
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
