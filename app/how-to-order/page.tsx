// src/app/how-to-order/page.tsx
'use client';

import Header from '@/components/layout/Header';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Mail,
  MessageCircle,
  DollarSign,
  Palette,
  CheckCircle,
  Clock,
  Globe,
  Zap,
  Shield,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';

export default function HowToOrderPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // ステップデータ
  const steps = [
    {
      number: 1,
      icon: Mail,
      title: 'お問い合わせ',
      time: '3分',
      description: 'まずはお気軽にお問い合わせください。フォームまたはメールでご連絡いただけます。24時間以内にご返信いたします。',
      points: [
        '簡単なご相談でもOK',
        '見積もり無料',
        'オンライン対応可能'
      ],
      color: '#0066FF'
    },
    {
      number: 2,
      icon: MessageCircle,
      title: 'ヒアリング',
      time: '1-2時間',
      description: 'お客様のご要望や課題を詳しくお伺いします。ビデオ通話またはメールでヒアリングを行い、最適なプランをご提案いたします。',
      points: [
        'Zoom/Google Meetで対応',
        '時差にも柔軟に対応',
        '日本語・英語対応可能'
      ],
      color: '#4ECDC4'
    },
    {
      number: 3,
      icon: DollarSign,
      title: 'お見積もり',
      time: '2-3営業日',
      description: 'ヒアリング内容を基に、詳細なお見積もりを作成します。料金・納期・制作内容を明確にご提示いたします。ご納得いただけるまで調整可能です。',
      points: [
        '明朗会計',
        '追加料金なし',
        '複数プラン提案可能'
      ],
      color: '#FF8C42'
    },
    {
      number: 4,
      icon: Palette,
      title: '制作開始',
      time: 'プロジェクトによる',
      description: 'お見積もりにご了承いただいた後、制作を開始します。進捗は定期的にご報告し、途中でもご確認いただけます。修正も柔軟に対応いたします。',
      points: [
        '週次進捗報告',
        '修正回数無制限',
        'リアルタイム共有'
      ],
      color: '#9333EA'
    },
    {
      number: 5,
      icon: CheckCircle,
      title: '納品・サポート',
      time: '即日',
      description: '完成したプロダクトを納品いたします。納品後も1ヶ月間の無料サポート付き。使い方や運用方法もサポートいたします。',
      points: [
        '1ヶ月無料サポート',
        '操作マニュアル付き',
        'アフターサポート充実'
      ],
      color: '#10B981'
    }
  ];

  // プロジェクトタイプ別の流れ
  const projectTypes = [
    {
      title: 'Webサイト制作',
      duration: '4-6週間',
      steps: [
        'お問い合わせ (3分)',
        'ヒアリング (1-2時間)',
        'ワイヤーフレーム作成 (3-5日)',
        'デザイン制作 (1-2週間)',
        'コーディング (1-2週間)',
        'テスト・修正 (3-5日)',
        '納品 (即日)'
      ]
    },
    {
      title: 'デザイン制作',
      duration: '2-3週間',
      steps: [
        'お問い合わせ (3分)',
        'ヒアリング (1-2時間)',
        'ラフ案作成 (2-3日)',
        'デザイン制作 (1週間)',
        '修正対応 (2-3日)',
        '納品 (即日)'
      ]
    },
    {
      title: '保守・運用',
      duration: '継続',
      steps: [
        'お問い合わせ (3分)',
        'ヒアリング (1-2時間)',
        'プラン決定 (即日)',
        '運用開始 (即日)',
        '定期報告 (月次)',
        '継続サポート'
      ]
    }
  ];

  // 料金の目安
  const pricing = [
    {
      category: 'コーポレートサイト',
      items: [
        { name: '5ページ以下', price: '¥300,000〜' },
        { name: '6-10ページ', price: '¥500,000〜' },
        { name: '11-20ページ', price: '¥800,000〜' }
      ]
    },
    {
      category: 'ランディングページ',
      items: [
        { name: 'シンプル', price: '¥100,000〜' },
        { name: '標準', price: '¥200,000〜' },
        { name: 'リッチ', price: '¥300,000〜' }
      ]
    },
    {
      category: 'ECサイト',
      items: [
        { name: '小規模', price: '¥500,000〜' },
        { name: '中規模', price: '¥1,000,000〜' },
        { name: '大規模', price: '¥2,000,000〜' }
      ]
    },
    {
      category: 'ロゴ・グラフィック',
      items: [
        { name: 'ロゴデザイン', price: '¥50,000〜' },
        { name: '名刺デザイン', price: '¥30,000〜' },
        { name: 'バナー制作', price: '¥10,000〜' }
      ]
    }
  ];

  // オプション料金
  const options = [
    { name: 'CMS導入', price: '¥50,000〜' },
    { name: 'お問い合わせフォーム', price: '¥30,000〜' },
    { name: '多言語対応', price: '¥100,000〜' },
    { name: 'SEO対策', price: '¥50,000〜' },
    { name: 'アニメーション', price: '¥30,000〜' }
  ];

  // 納期の目安
  const timeline = [
    {
      category: 'Webサイト制作',
      items: [
        { pages: '1-5ページ', duration: '2-3週間' },
        { pages: '6-10ページ', duration: '4-6週間' },
        { pages: '11-20ページ', duration: '6-8週間' }
      ]
    },
    {
      category: 'デザイン制作',
      items: [
        { pages: 'ロゴ', duration: '1-2週間' },
        { pages: 'バナー', duration: '3-5日' },
        { pages: 'イラスト', duration: '1-2週間' }
      ]
    }
  ];

  // よくある質問
  const faqs = [
    {
      category: 'ご依頼について',
      questions: [
        {
          q: '初めての依頼でも大丈夫ですか?',
          a: 'もちろんです!丁寧にサポートいたしますので、安心してご依頼ください。'
        },
        {
          q: '相談だけでもいいですか?',
          a: 'はい、お気軽にご相談ください。見積もりも無料です。'
        },
        {
          q: '海外からの依頼も可能ですか?',
          a: '可能です!オンラインで対応いたします。時差にも柔軟に対応します。'
        },
        {
          q: '英語でのやり取りは可能ですか?',
          a: 'はい、日本語・英語どちらも対応可能です。'
        },
        {
          q: '小さな案件でも依頼できますか?',
          a: 'もちろんです!規模に関わらず対応いたします。'
        },
        {
          q: '急ぎの案件は対応できますか?',
          a: '特急料金で対応可能です。ご相談ください。'
        }
      ]
    },
    {
      category: '料金について',
      questions: [
        {
          q: '料金はどのように決まりますか?',
          a: 'ページ数、機能、デザインの複雑さなどを総合的に判断してお見積もりします。'
        },
        {
          q: '追加料金は発生しますか?',
          a: '見積もり後の追加料金は一切ありません。変更がある場合は事前にご相談します。'
        },
        {
          q: '分割払いは可能ですか?',
          a: 'はい、2-3回の分割払いに対応しています。手数料はかかりません。'
        },
        {
          q: '支払い方法は何がありますか?',
          a: '銀行振込、PayPal、Stripe(クレジットカード)に対応しています。'
        },
        {
          q: '前払いですか?',
          a: '着手金50%、納品時50%が基本です。'
        },
        {
          q: '為替レートはどうなりますか?',
          a: 'お見積もり時のレートで固定いたします。'
        },
        {
          q: '値引きは可能ですか?',
          a: 'プロジェクト規模や継続案件の場合、柔軟に対応いたします。'
        }
      ]
    },
    {
      category: '制作について',
      questions: [
        {
          q: '修正は何回までできますか?',
          a: '基本的に無制限です。納得いただけるまで調整いたします。'
        },
        {
          q: '途中で仕様変更は可能ですか?',
          a: '可能です。大きな変更の場合は追加料金が発生する可能性があります。'
        },
        {
          q: 'デザインの参考サイトを共有できますか?',
          a: 'ぜひお願いします!イメージ共有に役立ちます。'
        },
        {
          q: '素材は提供してもらえますか?',
          a: 'はい、写真・イラストなどもご用意できます。'
        },
        {
          q: '自分で用意した素材を使えますか?',
          a: 'もちろん可能です。'
        },
        {
          q: 'WordPressで作れますか?',
          a: 'はい、CMSも対応可能です。'
        },
        {
          q: 'レスポンシブ対応していますか?',
          a: '全てのサイトでモバイル対応しています。'
        }
      ]
    },
    {
      category: '納品・サポートについて',
      questions: [
        {
          q: '納品形式は何ですか?',
          a: 'Webサイト、デザインデータ、ソースコードなど、プロジェクトに応じて納品します。'
        },
        {
          q: '納品後のサポートはありますか?',
          a: '1ヶ月間の無料サポート付きです。'
        },
        {
          q: '運用もお願いできますか?',
          a: 'はい、保守・運用プランもご用意しています。'
        },
        {
          q: 'ドメイン・サーバーの設定も依頼できますか?',
          a: '可能です。代行サービスもあります。'
        },
        {
          q: 'SEO対策はしてもらえますか?',
          a: 'オプションで対応可能です。'
        },
        {
          q: '納品後に追加機能を付けられますか?',
          a: 'もちろん可能です。お気軽にご相談ください。'
        },
        {
          q: '著作権はどうなりますか?',
          a: '納品後、全ての権利はお客様に移譲されます。'
        }
      ]
    }
  ];

  // お支払い方法
  const paymentMethods = [
    {
      icon: '🏦',
      title: '銀行振込',
      description: '国内: 三菱UFJ銀行\n海外: Wise (TransferWise)'
    },
    {
      icon: '💳',
      title: 'クレジットカード',
      description: 'Stripe経由\nVISA / MasterCard / AMEX'
    },
    {
      icon: '🌍',
      title: 'PayPal',
      description: '世界中から送金可能'
    },
    {
      icon: '💰',
      title: '分割払い',
      description: '2-3回まで対応\n手数料なし'
    }
  ];

  // キャンセルポリシー
  const cancellationPolicy = [
    { phase: 'ヒアリング前', fee: '無料' },
    { phase: 'ヒアリング後', fee: '20%' },
    { phase: 'デザイン開始後', fee: '50%' },
    { phase: 'コーディング開始後', fee: '80%' },
    { phase: '納品直前', fee: '100%' }
  ];

  return (
    <>
    <Header />
      <div className="min-h-screen bg-background "
        style={{ paddingTop: '80px' }}
      >
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
              HOW TO ORDER
            </h1>
            <p className="text-2xl lg:text-3xl text-text-secondary mb-4">
              ご依頼の流れ
            </p>
            <p className="text-base lg:text-lg text-text-secondary max-w-2xl mx-auto">
              初めての方も安心してご依頼いただけるよう、制作の流れを詳しくご説明します
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5ステップの流れ */}
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
              制作の流れ
            </h2>
            <p className="text-text-secondary">
              お問い合わせから納品まで、5つのステップでご説明します
            </p>
          </motion.div>

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* 番号とアイコン */}
                    <div className="flex-shrink-0">
                      <div
                        className="w-24 h-24 rounded-full flex items-center justify-center relative"
                        style={{ backgroundColor: `${step.color}20` }}
                      >
                        <span
                          className="absolute -top-2 -left-2 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: step.color }}
                        >
                          {step.number}
                        </span>
                        <Icon size={40} style={{ color: step.color }} />
                      </div>
                    </div>

                    {/* コンテンツ */}
                    <div className="flex-1 bg-background rounded-lg p-8 border-2 border-border">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-primary mb-2 lg:mb-0">
                          {step.title}
                        </h3>
                        <span className="inline-flex items-center gap-2 text-text-secondary">
                          <Clock size={16} />
                          <span className="text-sm">{step.time}</span>
                        </span>
                      </div>

                      <p className="text-text-secondary mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-primary mb-3">
                          ポイント:
                        </p>
                        {step.points.map((point, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle size={16} style={{ color: step.color }} />
                            <span className="text-sm text-text-secondary">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 矢印 */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center my-8">
                      <ArrowRight size={32} className="text-border" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* プロジェクトタイプ別の流れ */}
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
              プロジェクトタイプ別の流れ
            </h2>
            <p className="text-text-secondary">
              プロジェクトの種類によって制作の流れが異なります
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectTypes.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background-alt rounded-lg p-8 border-2 border-border"
              >
                <h3 className="text-xl font-bold text-primary mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary mb-6">
                  合計: {project.duration}
                </p>

                <div className="space-y-3">
                  {project.steps.map((stepText, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#556270] text-white text-xs flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-text-secondary">{stepText}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 料金の目安 */}
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
              料金の目安
            </h2>
            <p className="text-text-secondary">
              プロジェクトの種類や規模によって料金が異なります
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* 基本料金 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {pricing.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-background rounded-lg p-6 border-2 border-border"
                >
                  <h3 className="text-xl font-bold text-primary mb-6 pb-3 border-b-2 border-border">
                    {category.category}
                  </h3>
                  <div className="space-y-4">
                    {category.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-text-secondary">{item.name}</span>
                        <span className="font-bold text-primary">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* オプション料金 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background rounded-lg p-8 border-2 border-border"
            >
              <h3 className="text-xl font-bold text-primary mb-6">
                オプション料金
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-background-alt rounded-lg">
                    <span className="text-text-secondary">{option.name}</span>
                    <span className="font-bold text-primary">{option.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 納期の目安 */}
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
              納期の目安
            </h2>
            <p className="text-text-secondary">
              プロジェクトの規模によって納期が異なります
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {timeline.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background-alt rounded-lg p-6 border-2 border-border"
              >
                <h3 className="text-xl font-bold text-primary mb-6 pb-3 border-b-2 border-border">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-text-secondary">{item.pages}</span>
                      <span className="font-bold text-primary">{item.duration}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-sm text-text-secondary">
              ※お急ぎの場合は特急料金で対応可能です
            </p>
          </motion.div>
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
              お客様からよくいただくご質問をまとめました
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {faqs.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-2xl font-bold text-primary mb-6">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.questions.map((faq, index) => {
                    const faqIndex = categoryIndex * 100 + index;
                    const isOpen = openFAQ === faqIndex;
                    return (
                      <div
                        key={index}
                        className="bg-background rounded-lg border-2 border-border overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFAQ(isOpen ? null : faqIndex)}
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
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* お支払い方法 */}
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
              お支払い方法
            </h2>
            <p className="text-text-secondary">
              複数のお支払い方法に対応しています
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-background-alt rounded-lg p-6 border-2 border-border text-center"
                >
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="text-lg font-bold text-primary mb-3">
                    {method.title}
                  </h3>
                  <p className="text-sm text-text-secondary whitespace-pre-line">
                    {method.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background-alt rounded-lg p-8 border-2 border-border"
            >
              <h3 className="text-xl font-bold text-primary mb-6">
                お支払いスケジュール
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <span className="text-text-secondary">着手金</span>
                  <span className="font-bold text-primary">50% (制作開始前)</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-lg">
                  <span className="text-text-secondary">残金</span>
                  <span className="font-bold text-primary">50% (納品時)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* キャンセルポリシー */}
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
              キャンセルポリシー
            </h2>
            <p className="text-text-secondary">
              フェーズによってキャンセル料が異なります
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-background rounded-lg p-8 border-2 border-border"
            >
              <div className="space-y-4">
                {cancellationPolicy.map((policy, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-background-alt rounded-lg"
                  >
                    <span className="text-text-secondary">{policy.phase}</span>
                    <span className="font-bold text-primary text-lg">{policy.fee}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t-2 border-border">
                <p className="text-sm text-text-secondary leading-relaxed">
                  ※制作が進んでいない部分については返金対応いたします。<br />
                  ※天災やその他やむを得ない事情による遅延の場合、キャンセル料は発生いたしません。
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA セクション */}
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
              まずはお気軽にご相談ください
            </h2>
            <p className="text-text-secondary mb-12">
              ご不明な点やご相談がございましたら、お気軽にお問い合わせください。<br />
              2営業日以内にご返信いたします。
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/order">
                <button
                  className="px-12 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 shadow-lg"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #556270, #8892A0)',
                    color: '#FFFFFF'
                  }}
                >
                  かんたん見積もりへ
                </button>
              </Link>

              <Link href="/contact">
                <button className="px-12 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105 border-2"
                  style={{
                    borderColor: '#556270',
                    color: '#556270'
                  }}
                >
                  詳しく相談する
                </button>
              </Link>
            </div>

            <div className="mt-12 pt-12 border-t-2 border-border">
              <p className="text-sm text-text-secondary mb-4">
                または、直接メールでもお問い合わせいただけます
              </p>
<a
                href="mailto:0sdm0.moriyama@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                style={{
                  borderColor: '#556270',
                  color: '#556270',
                  border: '2px solid'
                }}
              >
                <Mail size={20} />
                <span>0sdm0.moriyama@gmail.com</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
