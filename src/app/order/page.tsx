// src/app/order/page.tsx
'use client';

import { useState, useEffect, useRef, Suspense } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Calculator } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/sections/PageHero';
import SectionTitle from '@/components/ui/SectionTitle';
import StepTimeline from '@/components/graphics/StepTimeline';
import WavePattern from '@/components/graphics/WavePattern';
import RadialLines from '@/components/graphics/RadialLines';
import { useSearchParams } from 'next/navigation';
import {
  Mail,
  MessageCircle,
  DollarSign,
  Palette,
  CheckCircle,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Building2,
  Globe,
  Banknote
} from 'lucide-react';

type TabType = 'flow' | 'pricing' | 'timeline' | 'faq' | 'payment';


function OrderPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('flow');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [accentColor, setAccentColor] = useState('#556270');
  const [wavePosition, setWavePosition] = useState(0);
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  // URL パラメータ受け取り
  useEffect(() => {
    const tab = searchParams.get('tab') as TabType;
    if (tab && ['flow', 'pricing', 'timeline', 'faq', 'payment'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);


  // 色変化アニメーション
  useEffect(() => {
    const colors = ['#0066FF', '#4ECDC4','#FF8C42', '#9333EA', '#10B981', '#556270'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % colors.length;
      setAccentColor(colors[index]);
    }, 21000);

    return () => clearInterval(interval);
  }, []);

  // 波の位置を更新
  useEffect(() => {
    const activeTabElement = tabRefs.current[activeTab];
    if (activeTabElement) {
      const rect = activeTabElement.getBoundingClientRect();
      const parentRect = activeTabElement.parentElement?.getBoundingClientRect();
      if (parentRect) {
        const relativeLeft = rect.left - parentRect.left + rect.width / 2 - 75; // 波の幅の半分
        setWavePosition(relativeLeft);
      }
    }
  }, [activeTab]);

  // タブデータ
  const tabs = [
    { id: 'flow' as TabType, label: '制作の流れ', icon: ArrowRight, color: '#0066FF' },
    { id: 'pricing' as TabType, label: '料金の目安', icon: DollarSign, color: '#4ECDC4' },
    { id: 'timeline' as TabType, label: '納期の目安', icon: Clock, color: '#FF8C42' },
    { id: 'faq' as TabType, label: 'よくある質問', icon: MessageCircle, color: '#9333EA' },
    { id: 'payment' as TabType, label: 'お支払い', icon: CheckCircle, color: '#10B981' }
  ];

// ステップデータ
const steps = [
  {
    number: 1,
    icon: Mail,
    title: 'お問い合わせ',
    time: '3分',
    description: 'まずはお気軽にお問い合わせください。LINE・Instagram・メールなど、お好きな方法でご連絡いただけます。24時間以内にご返信いたします。',
    points: [
      '簡単なご相談でもOK',
      '見積もり無料',
      'オンライン対応可能'
    ],
    details: [
      {
        subtitle: 'ご連絡いただく内容',
        items: [
          'ご依頼内容（新規サイト制作 / リニューアル / デザインのみ等）',
          '必要なページ数やボリューム',
          'ご希望の納期や公開予定日',
          'ご予算の目安',
          '参考にしたいサイトやデザイン（あれば）'
        ]
      },
      {
        subtitle: 'この段階で必要なもの',
        items: [
          '特になし（気軽にご相談ください）'
        ]
      }
    ],
    color: '#0066FF'
  },
  {
    number: 2,
    icon: MessageCircle,
    title: 'ヒアリング',
    time: '30分〜1時間',
    description: 'お客様のご要望や課題を詳しくお伺いします。LINE通話・Instagram・Zoom など、お好きな方法でヒアリングを行い、最適なプランをご提案いたします。',
    points: [
      'LINE・Instagram・Zoom対応',
      '時差にも柔軟に対応',
      '日本語・英語対応可能'
    ],
    details: [
      {
        subtitle: 'ヒアリング内容',
        items: [
          'サイトの目的やターゲット層',
          '必要な機能（お問い合わせフォーム、CMS等）',
          'デザインの方向性やイメージ',
          '競合サイトや参考サイト',
          'ドメイン・サーバーの有無'
        ]
      },
      {
        subtitle: 'やり取り方法',
        items: [
          'LINE 通話・ビデオ通話（最も気軽）',
          'Instagram ビデオチャット',
          'Zoom / Google Meet でのオンライン面談',
          'または Google スプレッドシートでの質問シート',
          'メールでのやり取りも可能'
        ]
      },
      {
        subtitle: 'おすすめの方法',
        items: [
          '日本在住・気軽に相談したい → LINE',
          '海外在住・ビジネス用途 → Zoom / Google Meet',
          'テキストで丁寧に伝えたい → メール + スプレッドシート'
        ]
      }
    ],
    color: '#4ECDC4'
  },
  {
    number: 3,
    icon: DollarSign,
    title: 'お見積もり',
    time: '2-3営業日',
    description: 'ヒアリング内容を基に、詳細なお見積もりを作成します。料金・納期・制作内容を明確にご提示いたします。',
    points: [
      '明朗会計',
      '追加料金なし',
      '複数プラン提案可能'
    ],
    details: [
      {
        subtitle: 'お見積もり内容',
        items: [
          '制作費用の詳細',
          '納期スケジュール',
          '制作内容の詳細（ページ構成、機能等）',
          'お支払いスケジュール'
        ]
      },
      {
        subtitle: 'ご検討いただくこと',
        items: [
          '予算に合うか',
          '納期に問題ないか',
          '追加したい機能や変更点はないか'
        ]
      }
    ],
    color: '#FF8C42'
  },
  {
    number: 4,
    icon: Palette,
    title: '制作開始',
    time: 'プロジェクトによる',
    description: 'お見積もりにご了承いただいた後、制作を開始します。Figmaを使わず、Next.jsで直接コーディングしながらデザインを作り上げます。進捗は定期的にご報告し、仮サイトでリアルタイムに確認いただけます。',
    points: [
      '週次進捗報告',
      '修正回数無制限',
      'リアルタイム共有'
    ],
    details: [
      {
        subtitle: '制作の進め方',
        items: [
          'Next.js で直接コーディング（Figma なし）',
          'Vercel で仮サイトを公開（スマホでも確認可能）',
          'お客様による確認・フィードバック',
          '修正を即座に反映',
          '週次での進捗報告'
        ]
      },
      {
        subtitle: 'なぜ Figma を使わないのか？',
        items: [
          '二度手間を避けるため（デザイン → コーディングの工程を1つに）',
          '実際の動作（ホバー、アニメーション）を確認できる',
          '修正が圧倒的に速い（数分で反映）',
          'スマホ・タブレットでも実際に触って確認できる'
        ]
      },
      {
        subtitle: 'お客様にご準備いただくもの',
        items: [
          'テキスト原稿（Google ドキュメント推奨）',
          '写真素材（高解像度：2000px以上推奨）',
          'ロゴデータ（AI、EPS、PNG形式）',
          'その他必要な素材'
        ]
      },
      {
        subtitle: '共有ツール',
        items: [
          'Vercel（仮サイト公開・リアルタイム確認）',
          'Google スプレッドシート（進捗管理）',
          'Google ドライブ / Dropbox（ファイル共有）',
          'LINE / Instagram（日々のやり取り）'
        ]
      }
    ],
    color: '#9333EA'
  },
  {
    number: 5,
    icon: CheckCircle,
    title: '納品・サポート',
    time: '即日',
    description: '完成したプロダクトを納品いたします。納品後も1ヶ月間の無料サポート付き。',
    points: [
      '1ヶ月無料サポート',
      '操作マニュアル付き',
      'アフターサポート充実'
    ],
    details: [
      {
        subtitle: '納品内容',
        items: [
          '完成したWebサイト',
          'サイトマップや設計書',
          '操作マニュアル（WordPress など CMS を使用した場合）',
          'ソースコード一式'
        ]
      },
      {
        subtitle: 'サポート内容',
        items: [
          '納品後1ヶ月間の無料サポート',
          '月2回までの修正対応',
          '操作方法のご説明',
          '簡単な更新方法のレクチャー'
        ]
      }
    ],
    color: '#10B981'
  }
];

  // 料金データ
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

  // 納期データ
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

// FAQ データ
const faqs = [
  {
    category: 'ご依頼について',
    questions: [
      {
        q: '初めての依頼でも大丈夫ですか？',
        a: 'もちろんです！Web制作が初めての方でも安心してご依頼いただけます。専門用語は使わず、分かりやすい言葉で丁寧にご説明します。「何から始めればいいか分からない」という段階からサポートいたしますので、お気軽にご相談ください。これまでも多くの初めての方にご依頼いただいており、「思っていたより簡単だった」とご好評いただいています。'
      },
      {
        q: '相談だけでもいいですか？',
        a: 'はい、もちろんです！「こういうサイトを作りたいんだけど、実現可能？」「予算はどれくらい？」といった相談だけでも大歓迎です。見積もりは完全無料で、相談したからといって必ず依頼しなければいけないわけではありません。まずはお気軽にご連絡ください。'
      },
      {
        q: '海外からの依頼も可能ですか？',
        a: '可能です！オンラインでのやり取りに完全対応しているため、世界中どこからでもご依頼いただけます。Zoom や Google Meet でのミーティング、Google ドライブでのファイル共有など、すべてオンラインで完結します。時差がある場合も、柔軟にスケジュール調整いたします。実際に、アメリカ、ヨーロッパ、アジア各国からご依頼をいただいた実績があります。'
      },
      {
        q: '英語でのやり取りは可能ですか？',
        a: 'はい、日本語・英語どちらも対応可能です。海外在住の日本人の方はもちろん、英語圏のクライアント様ともスムーズにやり取りできます。技術的な説明も英語で対応できますので、安心してご依頼ください。'
      }
    ]
  },
  {
    category: '料金について',
    questions: [
      {
        q: '料金はどのように決まりますか？',
        a: '主に「ページ数」「必要な機能」「デザインの複雑さ」を基準にお見積もりします。例えば、5ページのシンプルなコーポレートサイトなら30万円〜、ログイン機能やデータベースを使う複雑なサイトならそれ以上になります。ヒアリング後、詳細なお見積もりを提示しますので、その時点で料金をご確認いただけます。予算に合わせた柔軟なプラン提案も可能です。'
      },
      {
        q: '追加料金は発生しますか？',
        a: '基本的に、お見積もり後の追加料金は一切ありません。ただし、制作途中で「ページを5ページ追加したい」「全く違うデザインにしたい」など、大幅な仕様変更があった場合のみ、事前にご相談の上で追加料金をいただく場合があります。小さな修正や調整は無制限で対応しますので、ご安心ください。'
      },
      {
        q: '分割払いは可能ですか？',
        a: 'はい、2〜3回の分割払いに対応しています。手数料は一切かかりません。例えば、総額60万円の場合、「着手金20万円 → デザイン確定後20万円 → 納品後20万円」といった形で分割できます。お支払いスケジュールはご相談の上で柔軟に調整いたします。'
      },
      {
        q: '支払い方法は何がありますか？',
        a: '銀行振込、PayPal、Stripe（クレジットカード）に対応しています。国内の方は銀行振込、海外の方は PayPal または Stripe が便利です。クレジットカードは VISA、MasterCard が使えます。お支払い方法についてご不明な点があれば、お気軽にご相談ください。'
      }
    ]
  },
  {
    category: '制作について',
    questions: [
      {
        q: '修正は何回までできますか？',
        a: '制作期間中は無制限で修正対応いたします。「この色を変えたい」「この文章を修正したい」といった細かい調整も、納得いただけるまで何度でも対応します。納品後は1ヶ月間、月2回まで無料で修正対応いたします。それ以上の修正が必要な場合は、保守・メンテナンスプラン（月額制）をご検討ください。ちなみに、これまでのクライアント様は平均3〜5回の修正で満足いただいています。'
      },
      {
        q: '途中で仕様変更は可能ですか？',
        a: '可能です！ただし、変更内容によっては追加料金や納期の延長が発生する場合があります。例えば、「5ページの予定が10ページになった」「ログイン機能を追加したい」といった大きな変更の場合は、再見積もりをさせていただきます。小さな変更（文章の修正、色の変更など）は無料で対応しますので、ご安心ください。'
      },
      {
        q: 'WordPress で作れますか？',
        a: 'はい、WordPress での制作も対応可能です！お客様ご自身でブログ記事を更新したい場合や、頻繁にコンテンツを追加したい場合は WordPress がおすすめです。ただし、WordPress は更新作業が少し複雑なので、操作マニュアルや使い方のレクチャーもセットでご提供します。WordPress 以外にも、microCMS など他の CMS にも対応できますので、ご要望をお聞かせください。'
      },
      {
        q: 'レスポンシブ対応していますか？',
        a: 'もちろんです！すべてのサイトでスマホ・タブレット・PC に完全対応しています。今の時代、スマホからのアクセスが全体の60〜70%を占めるため、レスポンシブ対応は必須です。デザイン段階からスマホ表示を意識して制作しますので、どのデバイスでも快適に閲覧できます。'
      }
    ]
  }
];

  // お支払い方法
  const paymentMethods = [
    {
    icon: Building2,
    title: '銀行振込',
    description: '国内: 三菱UFJ銀行\n海外: Wise'
  },
  {
    icon: CreditCard,
    title: 'クレジットカード',
    description: 'Stripe経由\nVISA / MasterCard'
  },
  {
    icon: Globe,
    title: 'PayPal',
    description: '世界中から送金可能'
  },
  {
    icon: Banknote,
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
            <div className="min-h-screen bg-background" style={{ paddingTop: '80px', overflowX: 'hidden' }}>

              {/* Hero */}
              <PageHero
                title="ORDER"
                subtitle="ご依頼の流れ"
                description="初めての方も安心してご依頼いただけるよう、制作の流れを詳しくご説明します"
                accentColor="#707070"
                useAnimatedTitle={true}
              />

              {/* ヒーローセクション用 RadialLine */}
              <div style={{ position: 'relative' }}>
                {/* 右上の StepTimeline */}
                <div
                  className="hidden lg:block"
                  style={{
                    position: 'absolute',
                    top: '-850px',
                    right: '8%',
                    width: '1000px',
                    height: '1000px',
                    pointerEvents: 'none',
                    zIndex: 1
                  }}
                >
                  <StepTimeline
                    color={accentColor}
                    opacity={2}
                    animate={true}
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
                        color={accentColor}
                        opacity={1}
                        animate={true}
                        lineCount={24}
                      />
                    </div>

          {/* モバイル */}
          <div className="lg:hidden flex justify-center" style={{ padding: '1rem 0', pointerEvents: 'none' }}>
            <div style={{ width: '200px', height: '200px', transform: 'scale(1.5)', transformOrigin: 'center' }}>
              <StepTimeline color={accentColor} opacity={1} animate={true} />
            </div>
          </div>
              </div>

        {/* メインコンテンツ */}
        <section
  className="bg-background-alt"
  style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* タイトル */}
                    <SectionTitle
                title="Guide"
              subtitle="ご依頼ガイド"
              accentColor="#707070"
              marginBottom="4rem"
            /> {/* 右上: WavePattern */}
                      <div className="hidden lg:block"
                        style={{
                          position: 'absolute',
                          top: '-10%',
                          right: '-10%',
                          width: '600px',
                          height: '400px',
                          pointerEvents: 'none',
                          opacity:0.5,
                          zIndex: 0
                        }}
                      >
                        <WavePattern
                          color={accentColor}
                          opacity={1}
                          animate={true}
                          waveCount={5}
                          position="center"
                        />
                      </div>

                       {/* 左下の RadialLines（薄く） */}
                    <div
                      className="hidden lg:block"
                      style={{
                        position: 'absolute',
                        bottom: '-20%',
                        right: '-10%',
                        width: '600px',
                        height: '600px',
                        pointerEvents: 'none',
                        zIndex: 10,
                        opacity: 0.25
                      }}
                    >
                      <RadialLines
                        color={accentColor}
                        opacity={1}
                        animate={true}
                        lineCount={24}
                      />
                    </div>

{/* 波動タブナビゲーション */}
<div style={{ position: 'relative', marginBottom: '1rem', overflow: 'hidden' }}>

  {/* モバイル: ドロップダウン */}
  <div className="lg:hidden" style={{ marginBottom: '2rem' }}>
                  <p className="text-xs text-text-secondary" style={{ marginBottom: '0.5rem', paddingLeft: '0.25rem' }}>
                    タブを選択
                  </p>
    <select
      value={activeTab}
      onChange={(e) => setActiveTab(e.target.value as TabType)}
      className="w-full border-2 bg-background font-bold py-4 px-4 focus:outline-none appearance-none"
      style={{
        borderColor: tabs.find(t => t.id === activeTab)?.color,
        color: tabs.find(t => t.id === activeTab)?.color,
        fontSize: '1rem',
        paddingRight: '3rem',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      {tabs.map(tab => (
        <option key={tab.id} value={tab.id}>{tab.label}</option>
      ))}
                  </select>
                  <div
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                      color: tabs.find(t => t.id === activeTab)?.color
                    }}
                  >
                    <ChevronDown size={20} />
                  </div>
                </div>  

  {/* PC: 波タブ */}
  <div className="hidden lg:block">
    <div className="flex overflow-x-auto" style={{
      gap: '0.5rem',
      paddingBottom: '1rem',
      background: tabs.find(t => t.id === activeTab)?.color || '#556270',
      padding: '10px 1.25rem 1rem',
      height: '90px',
    }}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            ref={(el) => { tabRefs.current[tab.id] = el; }}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center font-bold transition-all whitespace-nowrap"
            style={{
              position: 'relative',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              flex: '1',
              background: 'transparent',
              border: 'none',
              color: isActive ? '#1a1a1a' : '#a4b0be',
              cursor: 'pointer',
              marginTop: isActive ? '-10px' : '0',
              transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  position: 'absolute',
                  background: '#ffffff',
                  height: '80%',
                  width: '80%',
                  top: '15%',
                  borderRadius: '50%',
                  zIndex: 0
                }}
              />
            )}
            <Icon size={18} style={{ position: 'relative', zIndex: 5 }} />
            <span style={{ position: 'relative', zIndex: 5 }}>{tab.label}</span>
          </motion.button>
        );
      })}
    </div>

    {/* 波 */}
    <div style={{
      position: 'relative',
      width: '100%',
      height: '40px',
      overflow: 'hidden',
      marginBottom: 0,
    }}>
      <motion.svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 150 40"
        style={{
          position: 'absolute',
          width: '150px',
          height: '40px',
          transformOrigin: 'center',
          transform: 'scaleY(-1)',
          left: `${wavePosition}px`,
          transition: 'left 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          top: '-1px'
        }}
        animate={{ left: wavePosition }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <path
          d="M150,40C123,40,107.5,0,75,0C44.7,0,26.3,40,0.6,40H150z"
          fill={tabs.find(t => t.id === activeTab)?.color || '#556270'}
        />
      </motion.svg>
    </div>
  </div>
</div>

{/* タブコンテンツ */}
<AnimatePresence mode="wait">

  {/* 制作の流れ */}
  {activeTab === 'flow' && (
    <motion.div
      key="flow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isExpanded = expandedStep === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-background border-2 border-border"
              style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}
            >
              {/* 背景装飾 */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '200px',
                  height: '200px',
                  background: `radial-gradient(circle, ${step.color}10 0%, transparent 70%)`,
                  pointerEvents: 'none'
                }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', zIndex: 1 }}>

                {/* ヘッダー: アイコン + タイトル */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {/* アイコン (モバイルで小さく) */}
                  <div className="flex-shrink-0">
                    <div
                      className="flex items-center justify-center relative"
                      style={{
                        width: '3.5rem',
                        height: '3.5rem',
                        backgroundColor: `${step.color}20`
                      }}
                    >
                      <span
                        className="absolute flex items-center justify-center text-white font-bold"
                        style={{
                          top: '-0.4rem',
                          left: '-0.4rem',
                          width: '1.5rem',
                          height: '1.5rem',
                          fontSize: '0.75rem',
                          backgroundColor: step.color
                        }}
                      >
                        {step.number}
                      </span>
                      <Icon size={24} style={{ color: step.color }} />
                    </div>
                  </div>

                  {/* タイトル + 時間 */}
                  <div className="flex-1">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.25rem' }}>
                      <h3 className="text-lg font-bold text-primary">{step.title}</h3>
                      <span className="inline-flex items-center text-text-secondary text-xs" style={{ gap: '0.25rem' }}>
                        <Clock size={12} />
                        <span>{step.time}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* 説明 */}
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>

                {/* ポイント */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {step.points.map((point, i) => (
                    <div key={i} className="flex items-center" style={{ gap: '0.5rem' }}>
                      <CheckCircle size={14} style={{ color: step.color, flexShrink: 0 }} />
                      <span className="text-sm text-text-secondary">{point}</span>
                    </div>
                  ))}
                </div>

                {/* 詳細を見るボタン */}
                <button
                  onClick={() => setExpandedStep(isExpanded ? null : index)}
                  className="flex items-center justify-center font-bold transition-all"
                  style={{
                    padding: '0.75rem 1.5rem',
                    gap: '0.5rem',
                    border: `2px solid ${step.color}`,
                    color: isExpanded ? '#ffffff' : step.color,
                    backgroundColor: isExpanded ? step.color : 'transparent',
                    marginLeft: '0',
                    alignSelf: 'flex-start',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span>{isExpanded ? '詳細を閉じる' : '詳細を見る'}</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                {/* 詳細コンテンツ */}
                <div
                  style={{
                    maxHeight: isExpanded ? '1000px' : '0',
                    opacity: isExpanded ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, opacity 0.4s ease',
                    marginLeft: '0',
                  }}
                >
                  <div
                    className="border-l-4"
                    style={{
                      borderColor: step.color,
                      paddingLeft: '1.5rem',
                      paddingTop: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2rem'
                    }}
                  >
                    {step.details?.map((detail, detailIndex) => (
                      <div key={detailIndex}>
                        <h4
                          className="font-bold"
                          style={{ marginBottom: '1rem', fontSize: '1rem', color: step.color }}
                        >
                          {detail.subtitle}
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {detail.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-start bg-background-alt"
                              style={{ gap: '0.75rem', padding: '0.75rem 1rem' }}
                            >
                              <div
                                style={{
                                  width: '6px',
                                  height: '6px',
                                  borderRadius: '50%',
                                  backgroundColor: step.color,
                                  marginTop: '0.5rem',
                                  flexShrink: 0
                                }}
                              />
                              <span className="text-sm text-text-secondary leading-relaxed">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  )}

                {/* 料金の目安 */}
                {activeTab === 'pricing' && (
                  <motion.div
                    key="pricing"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* 基本料金 */}
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
                      {pricing.map((category, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="bg-background border-2 border-border"
                          style={{ padding: '2rem' }}
                        >
                          <h3 className="text-xl font-bold text-primary border-b-2 border-border" style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem' }}>
                            {category.category}
                          </h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.4 }}
  className="bg-background border-2 border-border"
  style={{ padding: '2rem' }}
>
  <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
    オプション料金
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
    {options.map((option, index) => (
      <div key={index} className="flex justify-between items-center bg-background-alt" style={{ padding: '1rem' }}>
        <span className="text-text-secondary">{option.name}</span>
        <span className="font-bold text-primary">{option.price}</span>
      </div>
    ))}
  </div>

  {/* 注意書き */}
  <div
    className="bg-background-alt border-l-4"
    style={{
      padding: '1rem 1.5rem',
      borderColor: '#4ECDC4'
    }}
  >
    <p className="text-sm text-text-secondary leading-relaxed">
      ※ 目安の金額ですので参考程度にお受け止めください。お客様のご予算に合わせたサイト設計も可能です。お気軽にご相談ください。
    </p>
  </div>
</motion.div>
                  </motion.div>
                )}
{/* 納期の目安 */}
{activeTab === 'timeline' && (
  <motion.div
    key="timeline"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
      {timeline.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-background border-2 border-border"
          style={{ padding: '2rem' }}
        >
          <h3 className="text-xl font-bold text-primary border-b-2 border-border" style={{ marginBottom: '1.5rem', paddingBottom: '0.75rem' }}>
            {category.category}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

    {/* 注意書き */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-background-alt border-l-4"
      style={{
        padding: '1.5rem',
        borderColor: '#FF8C42'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <p className="text-sm text-text-secondary leading-relaxed">
          ※ 他の案件進行中は納期に余裕を持っていただく可能性がございます。
        </p>
        <p className="text-sm text-text-secondary leading-relaxed">
          ※ お急ぎの場合は特急料金で対応可能です。お気軽にご相談ください。
        </p>
      </div>
    </motion.div>
  </motion.div>
)}

                {/* よくある質問 */}
                {activeTab === 'faq' && (
                  <motion.div
                    key="faq"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                      {faqs.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                          <h3 className="text-2xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
                            {category.category}
                          </h3>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {category.questions.map((faq, index) => {
  const faqIndex = categoryIndex * 100 + index;
  const isOpen = openFAQ === faqIndex;
  return (
    <div
      key={index}
      className="bg-background border-2 border-border"
      style={{
        overflow: 'hidden',
        transition: 'all 0.25s ease'
      }}
    >
      {/* 質問部分 */}
      <button
        onClick={() => setOpenFAQ(isOpen ? null : faqIndex)}
        className="w-full flex items-center text-left hover:bg-background-alt"
        style={{
          padding: '1.5rem',
          gap: '1rem',
          transition: 'background-color 0.25s ease'
        }}
      >
        {/* Q アイコン */}
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0066FF',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '0.9rem',
            flexShrink: 0
          }}
        >
          Q
        </div>

        {/* 質問テキスト */}
        <span
          className="font-bold text-primary"
          style={{
            flex: 1,
            paddingRight: '1rem',
            fontSize: '1.05rem',
            lineHeight: '1.5'
          }}
        >
          {faq.q}
        </span>

        {/* 開閉アイコン */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isOpen ? '#10B981' : '#f5f5f5',
            border: isOpen ? '1px solid #10B981' : '1px solid #e5e5e5',
            color: isOpen ? '#ffffff' : '#0066FF',
            fontWeight: '800',
            fontSize: '1.2rem',
            flexShrink: 0,
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'all 0.25s ease'
          }}
        >
          +
        </div>
      </button>

      {/* 回答部分 */}
      <div
        style={{
          maxHeight: isOpen ? '500px' : '0',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.25s ease, opacity 0.25s ease',
          borderTop: isOpen ? '1px solid var(--color-border)' : 'none'
        }}
      >
        <div style={{ padding: '1.5rem', display: 'flex', gap: '1rem' }}>
          {/* A アイコン */}
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#10B981',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '0.9rem',
              flexShrink: 0
            }}
          >
            A
          </div>

          {/* 回答テキスト */}
          <p
            className="text-text-secondary"
            style={{
              lineHeight: '1.9',
              fontSize: '0.95rem',
              flex: 1
            }}
          >
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  );
})}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* お支払い */}
                {activeTab === 'payment' && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* お支払い方法 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
                      {paymentMethods.map((method, index) => {
  const Icon = method.icon;
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-background border-2 border-border text-center"
      style={{ padding: '2rem' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#10B98120',
          margin: '0 auto 1rem'
        }}
      >
        <Icon size={32} style={{ color: '#10B981' }} />
      </div>
      <h3 className="text-lg font-bold text-primary" style={{ marginBottom: '0.75rem' }}>
        {method.title}
      </h3>
      <p className="text-sm text-text-secondary whitespace-pre-line">
        {method.description}
      </p>
    </motion.div>
  );
})}
                    </div>

                    {/* お支払いスケジュール */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.5 }}
  className="bg-background border-2 border-border"
  style={{ padding: '2rem', marginBottom: '2rem' }}
>
  <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
    お支払いスケジュール
  </h3>

  {/* パターン1 */}
  <div style={{ marginBottom: '2rem' }}>
    <h4 className="font-bold text-primary" style={{ marginBottom: '1rem', color: '#4ECDC4' }}>
      パターン1: デザイン・コーディング一括の場合
    </h4>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="flex items-center justify-between bg-background-alt" style={{ padding: '1rem' }}>
        <span className="text-text-secondary">着手金</span>
        <span className="font-bold text-primary">30% (契約時)</span>
      </div>
      <div className="flex items-center justify-between bg-background-alt" style={{ padding: '1rem' }}>
        <span className="text-text-secondary">残金</span>
        <span className="font-bold text-primary">70% (納品後・動作確認後)</span>
      </div>
    </div>
  </div>

  {/* パターン2 */}
  <div>
    <h4 className="font-bold text-primary" style={{ marginBottom: '1rem', color: '#9333EA' }}>
      パターン2: デザイン外注の場合
    </h4>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="flex items-center justify-between bg-background-alt" style={{ padding: '1rem' }}>
        <span className="text-text-secondary">着手金</span>
        <span className="font-bold text-primary">30% (契約時)</span>
      </div>
      <div className="flex items-center justify-between bg-background-alt" style={{ padding: '1rem' }}>
        <span className="text-text-secondary">中間金</span>
        <span className="font-bold text-primary">30% (デザイン確定後)</span>
      </div>
      <div className="flex items-center justify-between bg-background-alt" style={{ padding: '1rem' }}>
        <span className="text-text-secondary">残金</span>
        <span className="font-bold text-primary">40% (納品後・動作確認後)</span>
      </div>
    </div>
  </div>

  {/* 注釈 */}
  <div className="border-t-2 border-border" style={{ paddingTop: '1.5rem', marginTop: '1.5rem' }}>
    <p className="text-sm text-text-secondary leading-relaxed">
      ※ プロジェクトの規模や内容に応じて、最適なお支払いプランをご提案いたします。
    </p>
  </div>
</motion.div>

{/* 安心してご依頼いただくために */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.6 }}
  className="bg-background-alt border-2 border-border"
  style={{ padding: '2rem', marginBottom: '2rem' }}
>
  <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
    安心してご依頼いただくために
  </h3>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    {[
      '制作中もやりとりは迅速に対応します',
      '作業中のデザインや資料は随時共有いたします',
      'デザイン確定後、または納品後の動作確認後にお支払いいただけます',
      'ご提供いただいた情報の秘密は厳守いたします'
    ].map((item, index) => (
      <div key={index} className="flex items-start" style={{ gap: '0.75rem' }}>
        <CheckCircle size={20} style={{ color: '#10B981', flexShrink: 0, marginTop: '0.125rem' }} />
        <span className="text-text-secondary leading-relaxed">{item}</span>
      </div>
    ))}
  </div>
</motion.div>

                    {/* キャンセルポリシー */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="bg-background border-2 border-border"
                      style={{ padding: '2rem' }}
                    >
                      <h3 className="text-xl font-bold text-primary" style={{ marginBottom: '1.5rem' }}>
                        キャンセルポリシー
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                        {cancellationPolicy.map((policy, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-background-alt"
                            style={{ padding: '1rem' }}
                          >
                            <span className="text-text-secondary">{policy.phase}</span>
                            <span className="font-bold text-primary text-lg">{policy.fee}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t-2 border-border" style={{ paddingTop: '1.5rem' }}>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          ※制作が進んでいない部分については返金対応いたします。<br />
                          ※天災やその他やむを得ない事情による遅延の場合、キャンセル料は発生いたしません。
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

{/* CTA セクション（ContactSection スタイル） */}
<section
  className="bg-background-alt"
  style={{
    padding: '5rem 0',
    position: 'relative',
    overflow: 'hidden'
  }}
>
  {/* 背景装飾 */}
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
    <WavePattern
      color={accentColor}
      opacity={1}
      animate={true}
      waveCount={5}
      position="center"
    />
  </div>

  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div style={{ maxWidth: '64rem', margin: '0 auto', position: 'relative', zIndex: 1 }}>
      <SectionTitle
        title="Contact"
        subtitle="お問い合わせ"
        accentColor={accentColor}
        marginBottom="4rem"
      />

      {/* 上段: まずはお気軽に */}
      <div className="mb-8 md:mb-12">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-lg md:text-xl font-bold text-primary mb-4 md:mb-6"
        >
          まずはお気軽に
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              icon: 'line',
              title: 'LINE',
              value: '@shoto0720',
              description: '最速返信',
              priority: 1,
              color: '#10B981',
              link: 'https://line.me/ti/p/shoto0720'
            },
            {
              icon: 'instagram',
              title: 'Instagram',
              value: '@sh0t0x72',
              description: 'DM歓迎',
              priority: 2,
              color: '#E1306C',
              link: 'https://www.instagram.com/sh0t0x72/'
            },
            {
              icon: 'mail',
              title: 'Email',
              value: 'メール',
              description: '24時間受付',
              priority: 3,
              color: '#FF6B6B',
              link: 'mailto:0sdm0.moriyama@gmail.com'
            }
          ].map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <a
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="border-2 border-border bg-background hover:border-primary transition-all hover:scale-105 cursor-pointer rounded-lg"
                  style={{
                    padding: '2.5rem 2rem',
                    minHeight: '220px',
                    textAlign: 'center'
                  }}
                >
                  {/* アイコン + バッジコンテナ */}
                  <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                    {/* 優先度バッジ */}
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
                        backgroundColor: option.color,
                        color: '#ffffff',
                        borderRadius: '50%',
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}
                    >
                      {option.priority}
                    </div>

                    {/* アイコン */}
                    <div
                      className="rounded-full"
                      style={{
                        backgroundColor: `${option.color}20`,
                        padding: '1.25rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {option.icon === 'line' && (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"
                            fill={option.color}
                          />
                        </svg>
                      )}
                      {option.icon === 'instagram' && (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                            fill={option.color}
                          />
                        </svg>
                      )}
                      {option.icon === 'mail' && (
                        <Mail size={40} style={{ color: option.color }} />
                      )}
                    </div>
                  </div>

                  <h4 className="text-lg md:text-xl font-bold text-primary mb-2">
                    {option.title}
                  </h4>
                  <p className="text-sm md:text-base font-semibold mb-2" style={{ color: option.color }}>
                    {option.value}
                  </p>
                  <p className="text-xs md:text-sm text-text-secondary">
                    {option.description}
                  </p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 下段: 詳しく知りたい方 */}
      <div className="mb-6 md:mb-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl font-bold text-primary mb-4 md:mb-6"
        >
          詳しく知りたい方
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[
            {
              icon: Calculator,
              title: 'かんたん見積もり',
              description: '概算をすぐに確認',
              href: '/estimate',
              color: '#10B981'
            },
            {
              icon: Mail,
              title: 'フォームで相談',
              description: '詳しくお問い合わせ',
              href: '/contact',
              color: '#FF6B6B'
            }
          ].map((option, index) => {
            const Icon = option.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
              >
                <Link href={option.href}>
                  <div
                    className="border-2 border-border bg-background hover:border-primary transition-all hover:scale-105 cursor-pointer rounded-lg"
                    style={{
                      padding: '2.5rem 2rem',
                      minHeight: '220px',
                      textAlign: 'center'
                    }}
                  >
                    <div
                      className="rounded-full"
                      style={{
                        backgroundColor: `${option.color}20`,
                        padding: '1.25rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1.5rem'
                      }}
                    >
                      <Icon size={40} style={{ color: option.color }} />
                    </div>

                    <h4 className="text-lg md:text-xl font-bold text-primary mb-2">
                      {option.title}
                    </h4>
                    <p className="text-xs md:text-sm text-text-secondary">
                      {option.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 注意事項 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center pt-6 md:pt-8 border-t-2 border-border"
      >
        <p className="text-xs md:text-sm text-text-secondary mb-2">
          <strong style={{ color: 'var(--color-text-primary)' }}>返信優先度：</strong>
          LINE → Instagram → Email
        </p>
        <p className="text-xs md:text-sm text-text-secondary">
          電話・オンラインミーティングは上記方法で事前調整をお願いします
        </p>
      </motion.div>
    </div>
  </div>
</section>
      </div>

      <Footer
  ctaText="まずはお気軽にご相談ください"
  ctaSubText="LINE・Instagram・メールでお気軽にご連絡ください。24時間以内にご返信いたします。"
/>
    </>
  );
}
export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderPageContent />
    </Suspense>
  );
}
