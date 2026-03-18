// src/app/estimate/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/sections/PageHero';
import SectionTitle from '@/components/ui/SectionTitle';
import GridSquare from '@/components/graphics/GridSquare';
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
  CloudDownload,
  Code
} from 'lucide-react';

// ============================================================
// 型定義
// ============================================================
type ProjectType = 'website' | 'landing' | 'ecommerce' | 'design' | 'maintenance' | null;
type Scale = string | null;
type DeliverySpeed = 'normal' | 'rush' | 'express' | null;

interface Option {
  id: string;
  name: string;
  price: number;
  icon?: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

interface ScaleOption {
  id: string;
  name: string;
  price: number;
  duration: string;
  description?: string;
}

// ============================================================
// 定数 (コンポーネント外 → useEffect依存配列の警告を防ぐ)
// ============================================================
const scaleOptions: Record<string, ScaleOption[]> = {
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
    { id: 'basic', name: 'ベーシック', price: 30000, duration: '月額', description: '月1回の軽微な更新・バックアップ' },
    { id: 'standard', name: 'スタンダード', price: 50000, duration: '月額', description: '月2〜4回の更新・セキュリティ対策' },
    { id: 'premium', name: 'プレミアム', price: 100000, duration: '月額', description: '無制限更新・優先サポート・レポート' }
  ]
};

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

const deliveryOptions = [
  { id: 'normal' as DeliverySpeed, name: '通常納期', multiplier: 1, description: '標準料金' },
  { id: 'rush' as DeliverySpeed, name: 'お急ぎ', multiplier: 1.5, description: '+50%' },
  { id: 'express' as DeliverySpeed, name: '超特急', multiplier: 2, description: '+100%' }
];

const projectTypes = [
  { id: 'website' as ProjectType, icon: Globe, title: 'Webサイト制作', description: 'コーポレートサイト、サービスサイトなど', color: '#0066FF' },
  { id: 'landing' as ProjectType, icon: Zap, title: 'ランディングページ', description: '1ページ完結型のLP', color: '#4ECDC4' },
  { id: 'ecommerce' as ProjectType, icon: ShoppingCart, title: 'ECサイト', description: 'オンラインショップ構築', color: '#FF8C42' },
  { id: 'design' as ProjectType, icon: Palette, title: 'ロゴ・グラフィック', description: 'ロゴ、バナー、名刺など', color: '#9333EA' },
  { id: 'maintenance' as ProjectType, icon: Settings, title: '保守・運用', description: '既存サイトの保守管理', color: '#10B981' }
];

// ============================================================
// コンポーネント
// ============================================================
export default function EstimatePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectType, setProjectType] = useState<ProjectType>(null);
  const [scale, setScale] = useState<Scale>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [deliverySpeed, setDeliverySpeed] = useState<DeliverySpeed>('normal');
  const [totalPrice, setTotalPrice] = useState(0);
  const [accentColor, setAccentColor] = useState('#556270');

  const totalSteps = projectType === 'maintenance' ? 3 : 4;

  // アクセントカラーのアニメーション
  useEffect(() => {
    const colors = ['#0066FF', '#4ECDC4', '#FF6B6B', '#FF8C42', '#9333EA', '#10B981', '#556270'];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % colors.length;
      setAccentColor(colors[index]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 合計金額計算
  useEffect(() => {
    if (!projectType) {
      setTotalPrice(0);
      return;
    }
    const scaleOption = scaleOptions[projectType]?.find(s => s.id === scale);
    const base = scaleOption?.price ?? 0;

    const optionsTotal = selectedOptions.reduce((sum, optionId) => {
      const option = optionsByProject[projectType]?.find(o => o.id === optionId);
      return sum + (option?.price ?? 0);
    }, 0);

    const multiplier = deliveryOptions.find(d => d.id === deliverySpeed)?.multiplier ?? 1;
    setTotalPrice((base + optionsTotal) * multiplier);
  }, [projectType, scale, selectedOptions, deliverySpeed]);

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId]
    );
  };

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(s => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };

  const isNextEnabled = () => {
    if (currentStep === 1) return projectType !== null;
    if (currentStep === 2) return scale !== null;
    return true;
  };

  const currentOptions = projectType ? optionsByProject[projectType] ?? [] : [];
  const currentProjectColor = projectTypes.find(t => t.id === projectType)?.color;

  // Contact URLのクエリパラメータ生成
  const contactQuery = new URLSearchParams({
    projectType: projectType ?? '',
    projectName: projectTypes.find(t => t.id === projectType)?.title ?? '',
    scale: scale ?? '',
    scaleName: scaleOptions[projectType ?? '']?.find(s => s.id === scale)?.name ?? '',
    options: selectedOptions
      .map(id => optionsByProject[projectType ?? '']?.find(o => o.id === id)?.name ?? '')
      .filter(Boolean)
      .join(','),
    delivery: deliverySpeed ?? '',
    deliveryName: deliveryOptions.find(d => d.id === deliverySpeed)?.name ?? '',
    totalPrice: totalPrice.toString()
  }).toString();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background" style={{ paddingTop: '80px', overflowX: 'hidden' }}>

  <PageHero
    title="ESTIMATE"
    subtitle="かんたん見積もり"
    description="いくつかの質問に答えるだけで、概算のお見積もりをご確認いただけます。"
    accentColor="#556270"
    useAnimatedTitle={true}
    showGrid={false}
  />

        {/* グラフィック */}
<div style={{ position: 'relative' }}>
  {/* PC */}
  <motion.div
    key={accentColor}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}
    className="hidden lg:block absolute"
    style={{ top: '-500px', right: '2%', width: '600px', height: '600px', pointerEvents: 'none', zIndex: 10 }}
  >
    <GridSquare color={accentColor} opacity={0.8} animate={true} gridSize={10} />
          </motion.div>

          {/* モバイル */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        className="lg:hidden flex justify-center"
                        style={{ padding: '1rem 0', pointerEvents: 'none' }}
                      >
                      <div style={{ width: '200px', height: '200px', transform: 'scale(1.2)', transformOrigin: 'center' }}>
                        <GridSquare color={accentColor} opacity={0.6} animate={true} />
                      </div>
                      </motion.div>
</div>

        {/* メインコンテンツ */}
        <section className="py-16 lg:py-24 bg-background-alt" style={{ position: 'relative', overflow: 'hidden' }}>

          {/* 背景グラフィック: PC only */}
          <div
            className="hidden lg:block"
            style={{
              position: 'absolute',
              bottom: '-8%',
              left: '5%',
              width: '500px',
              height: '500px',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            <motion.svg
              width="100%"
              height="100%"
              viewBox="0 0 500 500"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.circle
                  key={i}
                  cx="250"
                  cy="250"
                  r={80 + i * 35}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="1"
                  strokeDasharray="10 10"
                  animate={{ stroke: accentColor }}
                  transition={{ duration: 2 }}
                />
              ))}
              <motion.circle
                cx="250"
                cy="250"
                r="4"
                fill={accentColor}
                animate={{ r: [3, 6, 3], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.svg>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 2 }}>
            <div className="max-w-6xl mx-auto" style={{ paddingTop: '40px' }}>
              <SectionTitle
                title="Estimate"
                subtitle="簡単見積り"
                marginBottom="3rem"
                accentColor="#707070"
              />

              {/* モバイル: 底部固定バーの余白 */}
              <div className="pb-28 lg:pb-0">
                <div className="flex flex-col lg:flex-row gap-12">

                  {/* ========== 左側: ステップコンテンツ ========== */}
                  <div className="flex-1">

                    {/* 進捗バー */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      style={{ marginBottom: '3rem' }}
                    >
                      <div className="flex items-center justify-between" style={{ marginBottom: '0.75rem' }}>
                        <span className="text-sm font-bold text-primary">
                          STEP {currentStep} / {totalSteps}
                        </span>
                        <motion.span
                          className="text-sm text-text-secondary"
                          key={currentStep}
                          initial={{ scale: 1.2, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {Math.round((currentStep / totalSteps) * 100)}%
                        </motion.span>
                      </div>
                      <div className="h-2 bg-border overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </motion.div>

                    <AnimatePresence mode="wait">

                      {/* STEP 1: プロジェクトタイプ */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 50, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -50, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-3">
                            プロジェクトタイプを選択
                          </h2>
                          <p className="text-text-secondary mb-8">
                            ご希望のサービスを選択してください
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1rem' }}>
                            {projectTypes.map((type) => {
                              const Icon = type.icon;
                              const isSelected = projectType === type.id;
                              return (
                                <motion.button
                                  key={type.id}
                                  onClick={() => {
                                    setProjectType(type.id);
                                    setScale(null);
                                    setSelectedOptions([]);
                                  }}
                                  className={`border-2 transition-all text-left ${
                                    isSelected
                                      ? 'border-[#556270] bg-background-alt'
                                      : 'border-border hover:border-[#556270]'
                                  }`}
                                  style={{
                                    padding: '1.5rem',
                                    paddingLeft: '2rem',
                                    borderLeftWidth: isSelected ? '5px' : '2px',
                                    borderLeftColor: isSelected ? type.color : undefined
                                  }}
                                  whileHover={{ scale: 1.02, y: -4 }}
                                  whileTap={{ scale: 0.98 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Icon size={20} className="mb-4" style={{ color: type.color }} />
                                  <h3 className="text-lg font-bold text-primary mb-2">{type.title}</h3>
                                  <p className="text-sm text-text-secondary">{type.description}</p>
                                </motion.button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 2: 規模選択 */}
                      {currentStep === 2 && projectType && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 50, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -50, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-3">規模を選択</h2>
                          <p className="text-text-secondary mb-8">プロジェクトの規模を選択してください</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {scaleOptions[projectType]?.map((option) => {
                              const isSelected = scale === option.id;
                              return (
                                <motion.button
                                  key={option.id}
                                  onClick={() => setScale(option.id)}
                                  className={`w-full border-2 transition-all text-left ${
                                    isSelected
                                      ? 'border-[#556270] bg-background-alt'
                                      : 'border-border hover:border-[#556270]'
                                  }`}
                                  style={{
                                    padding: '1.5rem',
                                    paddingLeft: '2rem',
                                    borderLeftWidth: isSelected ? '5px' : '2px',
                                    borderLeftColor: isSelected ? currentProjectColor : undefined
                                  }}
                                  whileHover={{ scale: 1.01, y: -2 }}
                                  whileTap={{ scale: 0.99 }}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-bold text-primary">{option.name}</h3>
                                    <span className="text-lg font-bold text-primary">
                                      {option.price === 0 ? '要相談' : `¥${option.price.toLocaleString()}〜`}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
                                    <Clock size={16} />
                                    <span>{option.duration}</span>
                                  </div>
                                  {option.description && (
                                    <p className="text-sm text-text-secondary mt-2">{option.description}</p>
                                  )}
                                </motion.button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {/* STEP 3: オプション選択 */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 50, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -50, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-3">オプションを選択</h2>
                          <p className="text-text-secondary mb-8">必要なオプションを選択してください (複数選択可)</p>
                          {currentOptions.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                              {/* オプションなし */}
                              <motion.button
                                onClick={() => setSelectedOptions([])}
                                className={`w-full border-2 transition-all text-left ${
                                  selectedOptions.length === 0
                                    ? 'border-[#556270] bg-background-alt'
                                    : 'border-border hover:border-[#556270]'
                                }`}
                                style={{ padding: '1.5rem', paddingLeft: '2rem' }}
                                whileHover={{ scale: 1.01, y: -2 }}
                                whileTap={{ scale: 0.99 }}
                              >
                                <div className="flex items-center gap-4">
                                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                                    selectedOptions.length === 0 ? 'border-[#556270] bg-[#556270]' : 'border-border'
                                  }`}>
                                    {selectedOptions.length === 0 && <CheckCircle size={16} className="text-white" />}
                                  </div>
                                  <span className="text-lg font-bold text-primary">オプションは不要</span>
                                </div>
                              </motion.button>
                              {/* オプション一覧 */}
                              {currentOptions.map((option) => {
                                const isSelected = selectedOptions.includes(option.id);
                                const OptionIcon = option.icon;
                                return (
                                  <motion.button
                                    key={option.id}
                                    onClick={() => toggleOption(option.id)}
                                    className={`w-full border-2 transition-all text-left ${
                                      isSelected
                                        ? 'border-[#556270] bg-background-alt'
                                        : 'border-border hover:border-[#556270]'
                                    }`}
                                    style={{ padding: '1.5rem', paddingLeft: '2rem' }}
                                    whileHover={{ scale: 1.01, y: -2 }}
                                    whileTap={{ scale: 0.99 }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-4">
                                        <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                                          isSelected ? 'border-[#556270] bg-[#556270]' : 'border-border'
                                        }`}>
                                          {isSelected && <CheckCircle size={16} className="text-white" />}
                                        </div>
                                        {OptionIcon && <OptionIcon size={24} style={{ color: '#556270' }} />}
                                        <span className="text-lg font-bold text-primary">{option.name}</span>
                                      </div>
                                      <span className="text-lg font-bold text-primary">
                                        +¥{option.price.toLocaleString()}
                                      </span>
                                    </div>
                                  </motion.button>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-center py-12 bg-background-alt border-2 border-border">
                              <p className="text-text-secondary">このプロジェクトタイプにはオプションがありません</p>
                            </div>
                          )}
                          <p className="text-sm text-text-secondary mt-6">※レスポンシブ対応は標準搭載です</p>
                        </motion.div>
                      )}

                      {/* STEP 4: 納期選択 */}
                      {currentStep === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 50, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -50, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-3">納期を選択</h2>
                          <p className="text-text-secondary mb-8">ご希望の納期スケジュールを選択してください</p>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {deliveryOptions.map((option) => {
                              const isSelected = deliverySpeed === option.id;
                              const deliveryColor =
                                option.id === 'normal' ? '#10B981' :
                                option.id === 'rush' ? '#FF8C42' : '#FF6B6B';
                              return (
                                <motion.button
                                  key={option.id}
                                  onClick={() => setDeliverySpeed(option.id)}
                                  className={`w-full border-2 transition-all text-left ${
                                    isSelected
                                      ? 'border-[#556270] bg-background-alt'
                                      : 'border-border hover:border-[#556270]'
                                  }`}
                                  style={{
                                    padding: '1.5rem',
                                    paddingLeft: '2rem',
                                    borderLeftWidth: isSelected ? '5px' : '2px',
                                    borderLeftColor: isSelected ? deliveryColor : undefined
                                  }}
                                  whileHover={{ scale: 1.01, y: -2 }}
                                  whileTap={{ scale: 0.99 }}
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <h3 className="text-lg font-bold text-primary mb-1">{option.name}</h3>
                                      <p className="text-sm text-text-secondary">{option.description}</p>
                                    </div>
                                    {option.multiplier > 1 && (
                                      <span className="text-lg font-bold text-primary">×{option.multiplier}</span>
                                    )}
                                  </div>
                                </motion.button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>

                    {/* ナビゲーションボタン */}
                    <div className="flex gap-4" style={{ marginTop: '2rem' }}>
                      {currentStep > 1 && (
                        <motion.button
                          onClick={handleBack}
                          className="flex-1 border-2 border-border text-primary font-bold transition-all hover:border-primary"
                          style={{ padding: '1rem 1.5rem' }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <ArrowLeft size={20} />
                            <span>戻る</span>
                          </div>
                        </motion.button>
                      )}
                      {currentStep < totalSteps ? (
                        <motion.button
                          onClick={handleNext}
                          disabled={!isNextEnabled()}
                          className={`flex-1 font-bold transition-all border-2 border-primary bg-primary text-background ${
                            isNextEnabled() ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed'
                          }`}
                          style={{ padding: '1rem 1.5rem' }}
                          whileHover={isNextEnabled() ? { scale: 1.02, y: -2 } : {}}
                          whileTap={isNextEnabled() ? { scale: 0.98 } : {}}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <span>次へ</span>
                            <ArrowRight size={20} />
                          </div>
                        </motion.button>
                      ) : (
                        <Link href={`/contact?${contactQuery}`} className="flex-1">
                          <motion.button
                            className="w-full font-bold bg-primary text-background border-2 border-primary transition-all hover:opacity-90"
                            style={{ padding: '1rem 1.5rem' }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            詳しく相談する
                          </motion.button>
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* ========== 右側: 見積もりパネル (PC sticky) ========== */}
                  <div className="hidden lg:block lg:w-96">
                    <div className="lg:sticky lg:top-24">
                      <EstimatePanel
                        projectType={projectType}
                        scale={scale}
                        selectedOptions={selectedOptions}
                        deliverySpeed={deliverySpeed}
                        totalPrice={totalPrice}
                        currentOptions={currentOptions}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ========== モバイル: 底部固定バー ========== */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t-2 border-border"
        style={{ padding: '1rem 1.5rem' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-text-secondary">概算合計</p>
            <motion.p
              key={totalPrice}
              initial={{ scale: 1.2, color: '#556270' }}
              animate={{ scale: 1, color: 'var(--color-text-primary)' }}
              transition={{ duration: 0.4 }}
              className="text-xl font-bold text-primary"
            >
              {totalPrice === 0 ? '¥0' : `¥${totalPrice.toLocaleString()}〜`}
            </motion.p>
          </div>
          {/* 最終ステップのときだけ相談ボタンを表示 */}
          {currentStep === totalSteps && (
            <Link href={`/contact?${contactQuery}`}>
              <motion.button
                className="bg-primary text-background font-bold border-2 border-primary"
                style={{ padding: '0.75rem 1.5rem' }}
                whileTap={{ scale: 0.97 }}
              >
                詳しく相談する
              </motion.button>
            </Link>
          )}
        </div>
      </div>

      <Footer
        ctaText="お見積もり内容を相談しませんか?"
        ctaSubText="概算見積もりをもとに、詳しいプラン内容をご提案いたします。まずはお気軽にご相談ください。"
      />
    </>
  );
}

// ============================================================
// 見積もりパネル (PC用コンポーネントとして分離)
// ============================================================
interface EstimatePanelProps {
  projectType: ProjectType;
  scale: Scale;
  selectedOptions: string[];
  deliverySpeed: DeliverySpeed;
  totalPrice: number;
  currentOptions: Option[];
}

function EstimatePanel({
  projectType, scale, selectedOptions, deliverySpeed, totalPrice, currentOptions
}: EstimatePanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-background-alt border-2 border-border"
      style={{ padding: '2rem' }}
      whileHover={{ boxShadow: '0 0 40px rgba(85, 98, 112, 0.2)' }}
    >
      <div className="flex items-center gap-3" style={{ marginBottom: '1.5rem' }}>
        <Calculator size={24} style={{ color: '#556270' }} />
        <h3 className="text-xl font-bold text-primary">お見積もり</h3>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        {/* プロジェクト */}
        {projectType && (
          <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)', marginBottom: '1rem' }}>
            <p className="text-sm text-text-secondary" style={{ marginBottom: '0.25rem' }}>プロジェクト</p>
            <p className="font-semibold text-primary">
              {projectTypes.find(t => t.id === projectType)?.title}
            </p>
          </div>
        )}
        {/* 規模 */}
        {projectType && scale && (
          <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)', marginBottom: '1rem' }}>
            <p className="text-sm text-text-secondary" style={{ marginBottom: '0.25rem' }}>規模</p>
            <p className="font-semibold text-primary">
              {scaleOptions[projectType]?.find(s => s.id === scale)?.name}
            </p>
          </div>
        )}
        {/* オプション */}
        {selectedOptions.length > 0 && (
          <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)', marginBottom: '1rem' }}>
            <p className="text-sm text-text-secondary" style={{ marginBottom: '0.5rem' }}>オプション</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
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
        {/* 納期 (保守運用は非表示) */}
        {deliverySpeed && projectType !== 'maintenance' && (
          <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)', marginBottom: '1rem' }}>
            <p className="text-sm text-text-secondary" style={{ marginBottom: '0.25rem' }}>納期</p>
            <p className="font-semibold text-primary">
              {deliveryOptions.find(d => d.id === deliverySpeed)?.name}
            </p>
          </div>
        )}
      </div>

      {/* 合計 */}
      <div style={{ paddingTop: '1.5rem', borderTop: '2px solid var(--color-border)' }}>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">合計</span>
          <motion.span
            key={totalPrice}
            initial={{ scale: 1.3, color: '#556270' }}
            animate={{ scale: 1, color: 'var(--color-text-primary)' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-2xl font-bold text-primary"
          >
            {totalPrice === 0 ? '¥0' : `¥${totalPrice.toLocaleString()}〜`}
          </motion.span>
        </div>
        <p className="text-xs text-text-secondary" style={{ marginTop: '0.5rem' }}>
          ※こちらは概算です。詳細はお問い合わせください
        </p>
      </div>
    </motion.div>
  );
}
