// src/app/order/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import {
  Globe,
  ShoppingCart,
  Palette,
  Settings,
  Clock,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Calculator,
  Zap,
  Shield,
  TrendingUp,
  Mail,
  BarChart,
  CreditCard,
  Package,
  Users,
  Star,
  FileText,
  Image as ImageIcon,
  Database,
  Lock,
  CloudDownload
} from 'lucide-react';

type ProjectType = 'website' | 'landing' | 'ecommerce' | 'design' | 'maintenance' | null;
type Scale = string | null;
type DeliverySpeed = 'normal' | 'rush' | 'express' | null;

interface Option {
  id: string;
  name: string;
  price: number;
  icon?: any;
}

export default function OrderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectType, setProjectType] = useState<ProjectType>(null);
  const [scale, setScale] = useState<Scale>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [deliverySpeed, setDeliverySpeed] = useState<DeliverySpeed>('normal');
  const [totalPrice, setTotalPrice] = useState(0);

  const totalSteps = 4;

  // プロジェクトタイプ
  const projectTypes = [
    {
      id: 'website' as ProjectType,
      icon: Globe,
      title: 'Webサイト制作',
      description: 'コーポレートサイト、サービスサイトなど',
      color: '#0066FF'
    },
    {
      id: 'landing' as ProjectType,
      icon: Zap,
      title: 'ランディングページ',
      description: '1ページ完結型のLP',
      color: '#4ECDC4'
    },
    {
      id: 'ecommerce' as ProjectType,
      icon: ShoppingCart,
      title: 'ECサイト',
      description: 'オンラインショップ構築',
      color: '#FF8C42'
    },
    {
      id: 'design' as ProjectType,
      icon: Palette,
      title: 'ロゴ・グラフィック',
      description: 'ロゴ、バナー、名刺など',
      color: '#9333EA'
    },
    {
      id: 'maintenance' as ProjectType,
      icon: Settings,
      title: '保守・運用',
      description: '既存サイトの保守管理',
      color: '#10B981'
    }
  ];

  // 規模別料金 (プロジェクトタイプによって変わる)
  const scaleOptions: Record<string, Array<{ id: string; name: string; price: number; duration: string }>> = {
    website: [
      { id: '1-5', name: '1-5ページ', price: 300000, duration: '2-3週間' },
      { id: '6-10', name: '6-10ページ', price: 500000, duration: '4-6週間' },
      { id: '11-20', name: '11-20ページ', price: 800000, duration: '6-8週間' },
      { id: '21+', name: '21ページ以上', price: 0, duration: '要相談' }
    ],
    landing: [
      { id: 'simple', name: 'シンプル', price: 100000, duration: '1-2週間' },
      { id: 'standard', name: '標準', price: 200000, duration: '2-3週間' },
      { id: 'rich', name: 'リッチ', price: 300000, duration: '3-4週間' }
    ],
    ecommerce: [
      { id: 'small', name: '小規模 (商品数 ~50)', price: 500000, duration: '6-8週間' },
      { id: 'medium', name: '中規模 (商品数 ~200)', price: 1000000, duration: '8-12週間' },
      { id: 'large', name: '大規模 (商品数 200+)', price: 2000000, duration: '12週間〜' }
    ],
    design: [
      { id: 'logo', name: 'ロゴデザイン', price: 50000, duration: '1-2週間' },
      { id: 'business-card', name: '名刺デザイン', price: 30000, duration: '3-5日' },
      { id: 'banner', name: 'バナー制作', price: 10000, duration: '3-5日' },
      { id: 'illustration', name: 'イラスト制作', price: 50000, duration: '1-2週間' }
    ],
    maintenance: [
      { id: 'basic', name: 'ベーシック', price: 30000, duration: '月額' },
      { id: 'standard', name: 'スタンダード', price: 50000, duration: '月額' },
      { id: 'premium', name: 'プレミアム', price: 100000, duration: '月額' }
    ]
  };

  // プロジェクトタイプ別オプション
  const optionsByProject: Record<string, Option[]> = {
    website: [
      { id: 'cms', name: 'CMS導入', price: 50000, icon: Database },
      { id: 'form', name: 'お問い合わせフォーム', price: 30000, icon: Mail },
      { id: 'multilingual', name: '多言語対応', price: 100000, icon: Globe },
      { id: 'seo', name: 'SEO対策', price: 50000, icon: TrendingUp },
      { id: 'animation', name: 'アニメーション', price: 30000, icon: Zap }
    ],
    landing: [
      { id: 'form', name: 'お問い合わせフォーム', price: 30000, icon: Mail },
      { id: 'animation', name: 'リッチアニメーション', price: 50000, icon: Zap },
      { id: 'ab-test', name: 'A/Bテスト設定', price: 30000, icon: BarChart },
      { id: 'analytics', name: 'アクセス解析設定', price: 20000, icon: TrendingUp }
    ],
    ecommerce: [
      { id: 'payment', name: '決済システム導入', price: 100000, icon: CreditCard },
      { id: 'inventory', name: '在庫管理機能', price: 80000, icon: Package },
      { id: 'member', name: '会員機能', price: 100000, icon: Users },
      { id: 'recommend', name: 'レコメンド機能', price: 150000, icon: Star },
      { id: 'mail', name: 'メールマーケティング', price: 50000, icon: Mail }
    ],
    design: [
      { id: 'variation', name: 'カラーバリエーション', price: 20000, icon: Palette },
      { id: 'mockup', name: 'モックアップ作成', price: 30000, icon: ImageIcon },
      { id: 'guideline', name: 'ブランドガイドライン', price: 50000, icon: FileText },
      { id: 'source', name: 'ソースファイル納品', price: 10000, icon: CloudDownload }
    ],
    maintenance: [
      { id: 'update', name: 'コンテンツ更新 (月4回)', price: 20000, icon: FileText },
      { id: 'security', name: 'セキュリティ対策', price: 30000, icon: Shield },
      { id: 'backup', name: 'バックアップ', price: 10000, icon: Database },
      { id: 'report', name: 'レポート作成', price: 20000, icon: BarChart }
    ]
  };

  // 納期オプション
  const deliveryOptions = [
    { id: 'normal' as DeliverySpeed, name: '通常納期', multiplier: 1, description: '標準料金' },
    { id: 'rush' as DeliverySpeed, name: 'お急ぎ', multiplier: 1.5, description: '+50%' },
    { id: 'express' as DeliverySpeed, name: '超特急', multiplier: 2, description: '+100%' }
  ];

  // 合計金額計算
  useEffect(() => {
    let base = 0;

    // 基本料金
    if (projectType && scale) {
      const scaleOption = scaleOptions[projectType]?.find(s => s.id === scale);
      if (scaleOption) {
        base = scaleOption.price;
      }
    }

    // オプション料金
    const optionsTotal = selectedOptions.reduce((sum, optionId) => {
      const allOptions = projectType ? optionsByProject[projectType] : [];
      const option = allOptions?.find(o => o.id === optionId);
      return sum + (option?.price || 0);
    }, 0);

    // 納期による倍率
    const deliveryMultiplier = deliveryOptions.find(d => d.id === deliverySpeed)?.multiplier || 1;

    const total = (base + optionsTotal) * deliveryMultiplier;
    setTotalPrice(total);
  }, [projectType, scale, selectedOptions, deliverySpeed]);

  // オプション選択切り替え
  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  // 次へ
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // 戻る
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 次へボタンの有効/無効
  const isNextEnabled = () => {
    if (currentStep === 1) return projectType !== null;
    if (currentStep === 2) return scale !== null;
    return true;
  };

  // 現在のプロジェクトタイプのオプション取得
  const currentOptions = projectType ? optionsByProject[projectType] || [] : [];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background" style={{ paddingTop: '80px' }}>
        {/* ヒーローセクション */}
        <section className="relative py-12 lg:py-16 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-primary mb-4 tracking-wider">
                SIMPLE ESTIMATE
              </h1>
              <p className="text-xl lg:text-2xl text-text-secondary mb-3">
                かんたん見積もり
              </p>
              <p className="text-sm lg:text-base text-text-secondary">
                いくつかの質問に答えるだけで、概算のお見積もりをご確認いただけます
              </p>
            </motion.div>
          </div>
        </section>

        {/* メインコンテンツ */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-12">

                {/* 左側: ステップコンテンツ */}
                <div className="flex-1">
                  {/* 進捗バー */}
                  <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-primary">
                        STEP {currentStep} / {totalSteps}
                      </span>
                      <span className="text-sm text-text-secondary">
                        {Math.round((currentStep / totalSteps) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: 'linear-gradient(to right, #556270, #8892A0)'
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {/* STEP 1: プロジェクトタイプ */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-3">
                          プロジェクトタイプを選択
                        </h2>
                        <p className="text-text-secondary mb-8">
                          ご希望のサービスを選択してください
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {projectTypes.map((type) => {
                            const Icon = type.icon;
                            const isSelected = projectType === type.id;
                            return (
                              <button
                                key={type.id}
                                onClick={() => {
                                  setProjectType(type.id);
                                  setSelectedOptions([]); // オプションリセット
                                }}
                                className={`p-6 rounded-lg border-2 transition-all text-left ${
                                  isSelected
                                    ? 'border-[#556270] bg-background-alt'
                                    : 'border-border hover:border-[#556270]'
                                }`}
                              >
                                <Icon
                                  size={40}
                                  className="mb-4"
                                  style={{ color: type.color }}
                                />
                                <h3 className="text-lg font-bold text-primary mb-2">
                                  {type.title}
                                </h3>
                                <p className="text-sm text-text-secondary">
                                  {type.description}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: 規模選択 */}
                    {currentStep === 2 && projectType && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-3">
                          規模を選択
                        </h2>
                        <p className="text-text-secondary mb-8">
                          プロジェクトの規模を選択してください
                        </p>

                        <div className="space-y-4">
                          {scaleOptions[projectType]?.map((option) => {
                            const isSelected = scale === option.id;
                            return (
                              <button
                                key={option.id}
                                onClick={() => setScale(option.id)}
                                className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                                  isSelected
                                    ? 'border-[#556270] bg-background-alt'
                                    : 'border-border hover:border-[#556270]'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="text-lg font-bold text-primary">
                                    {option.name}
                                  </h3>
                                  <span className="text-lg font-bold text-primary">
                                    {option.price === 0 ? '要相談' : `¥${option.price.toLocaleString()}〜`}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-text-secondary">
                                  <Clock size={16} />
                                  <span>{option.duration}</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: オプション選択 */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-3">
                          オプションを選択
                        </h2>
                        <p className="text-text-secondary mb-8">
                          必要なオプションを選択してください (複数選択可)
                        </p>

                        {currentOptions.length > 0 ? (
                          <div className="space-y-4">
                            {/* オプションなし */}
                            <button
                              onClick={() => setSelectedOptions([])}
                              className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                                selectedOptions.length === 0
                                  ? 'border-[#556270] bg-background-alt'
                                  : 'border-border hover:border-[#556270]'
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                                  selectedOptions.length === 0 ? 'border-[#556270] bg-[#556270]' : 'border-border'
                                }`}>
                                  {selectedOptions.length === 0 && (
                                    <CheckCircle size={16} className="text-white" />
                                  )}
                                </div>
                                <span className="text-lg font-bold text-primary">
                                  オプションは不要
                                </span>
                              </div>
                            </button>

                            {/* オプション一覧 */}
                            {currentOptions.map((option) => {
                              const isSelected = selectedOptions.includes(option.id);
                              const OptionIcon = option.icon;
                              return (
                                <button
                                  key={option.id}
                                  onClick={() => toggleOption(option.id)}
                                  className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                                    isSelected
                                      ? 'border-[#556270] bg-background-alt'
                                      : 'border-border hover:border-[#556270]'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                                        isSelected ? 'border-[#556270] bg-[#556270]' : 'border-border'
                                      }`}>
                                        {isSelected && (
                                          <CheckCircle size={16} className="text-white" />
                                        )}
                                      </div>
                                      {OptionIcon && (
                                        <OptionIcon size={24} style={{ color: '#556270' }} />
                                      )}
                                      <span className="text-lg font-bold text-primary">
                                        {option.name}
                                      </span>
                                    </div>
                                    <span className="text-lg font-bold text-primary">
                                      +¥{option.price.toLocaleString()}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-center py-12 bg-background-alt rounded-lg border-2 border-border">
                            <p className="text-text-secondary">
                              このプロジェクトタイプにはオプションがありません
                            </p>
                          </div>
                        )}

                        <p className="text-sm text-text-secondary mt-6">
                          ※レスポンシブ対応は標準搭載です
                        </p>
                      </motion.div>
                    )}

                    {/* STEP 4: 納期選択 */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-3">
                          納期を選択
                        </h2>
                        <p className="text-text-secondary mb-8">
                          ご希望の納期スケジュールを選択してください
                        </p>

                        <div className="space-y-4">
                          {deliveryOptions.map((option) => {
                            const isSelected = deliverySpeed === option.id;
                            return (
                              <button
                                key={option.id}
                                onClick={() => setDeliverySpeed(option.id)}
                                className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                                  isSelected
                                    ? 'border-[#556270] bg-background-alt'
                                    : 'border-border hover:border-[#556270]'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h3 className="text-lg font-bold text-primary mb-1">
                                      {option.name}
                                    </h3>
                                    <p className="text-sm text-text-secondary">
                                      {option.description}
                                    </p>
                                  </div>
                                  {option.multiplier > 1 && (
                                    <span className="text-lg font-bold text-primary">
                                      ×{option.multiplier}
                                    </span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ナビゲーションボタン */}
                  <div className="flex gap-4 mt-12">
                    {currentStep > 1 && (
                      <button
                        onClick={handleBack}
                        className="flex-1 px-6 py-3 rounded-lg border-2 border-border text-primary font-bold transition-all hover:border-[#556270]"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <ArrowLeft size={20} />
                          <span>戻る</span>
                        </div>
                      </button>
                    )}

                    {currentStep < totalSteps ? (
                      <button
                        onClick={handleNext}
                        disabled={!isNextEnabled()}
                        className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all ${
                          isNextEnabled()
                            ? 'text-white hover:opacity-90'
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                        style={{
                          backgroundImage: isNextEnabled()
                            ? 'linear-gradient(to right, #556270, #8892A0)'
                            : 'linear-gradient(to right, #556270, #8892A0)'
                        }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span>次へ</span>
                          <ArrowRight size={20} />
                        </div>
                      </button>
                    ) : (
                      <Link
  href={`/contact?project=${projectType}&price=${totalPrice}`}
  className="flex-1"
>
  <button
    className="w-full px-6 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90"
    style={{
      backgroundImage: 'linear-gradient(to right, #556270, #8892A0)'
    }}
  >
    詳しく相談する
  </button>
</Link>
                    )}
                  </div>
                </div>

                {/* 右側: 見積もり結果 (sticky) */}
                <div className="lg:w-96">
                  <div className="lg:sticky lg:top-24">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="bg-background-alt rounded-lg p-8 border-2 border-border"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <Calculator size={24} style={{ color: '#556270' }} />
                        <h3 className="text-xl font-bold text-primary">
                          お見積もり
                        </h3>
                      </div>

                      <div className="space-y-4 mb-6">
                        {/* プロジェクトタイプ */}
                        {projectType && (
                          <div className="pb-4 border-b border-border">
                            <p className="text-sm text-text-secondary mb-1">プロジェクト</p>
                            <p className="font-semibold text-primary">
                              {projectTypes.find(t => t.id === projectType)?.title}
                            </p>
                          </div>
                        )}

                        {/* 規模 */}
                        {projectType && scale && (
                          <div className="pb-4 border-b border-border">
                            <p className="text-sm text-text-secondary mb-1">規模</p>
                            <p className="font-semibold text-primary">
                              {scaleOptions[projectType]?.find(s => s.id === scale)?.name}
                            </p>
                          </div>
                        )}

                        {/* オプション */}
                        {selectedOptions.length > 0 && (
                          <div className="pb-4 border-b border-border">
                            <p className="text-sm text-text-secondary mb-2">オプション</p>
                            <div className="space-y-1">
                              {selectedOptions.map(optionId => {
                                const option = currentOptions.find(o => o.id === optionId);
                                return (
                                  <div key={optionId} className="flex justify-between text-sm">
                                    <span className="text-primary">{option?.name}</span>
                                    <span className="text-primary">+¥{option?.price.toLocaleString()}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* 納期 */}
                        {deliverySpeed && (
                          <div className="pb-4 border-b border-border">
                            <p className="text-sm text-text-secondary mb-1">納期</p>
                            <p className="font-semibold text-primary">
                              {deliveryOptions.find(d => d.id === deliverySpeed)?.name}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* 合計金額 */}
                      <div className="pt-6 border-t-2 border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">合計</span>
                          <motion.span
                            key={totalPrice}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="text-2xl font-bold text-primary"
                          >
                            {totalPrice === 0 ? '¥0' : `¥${totalPrice.toLocaleString()}〜`}
                          </motion.span>
                        </div>
                        <p className="text-xs text-text-secondary mt-2">
                          ※こちらは概算です。詳細はお問い合わせください
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
