'use client';

import { motion } from 'framer-motion';
import { LucideIcon, CheckCircle } from 'lucide-react';

interface CircleCardProps {
  icon: LucideIcon;
  title: string;
  titleEn: string;
  description: string;
  features: string[];
  iconColor: string;
  circlePadding: {
    paddingLeft: string;
    paddingBottom: string;
  };
  opacity?: number;
  isHovered?: boolean;
  isMobile?: boolean;
  index?: number;
}

// ============================================================
// モバイル用シンプルカード
// ============================================================
export function MobileServiceCard({
  icon: Icon,
  title,
  description,
  features,
  iconColor,
}: Omit<CircleCardProps, 'circlePadding'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-background-alt border-2 border-border"
      style={{ padding: '1.5rem' }}
    >
      {/* アイコン + タイトル */}
      <div className="flex items-center gap-4" style={{ marginBottom: '1rem' }}>
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: '3.5rem',
            height: '3.5rem',
            backgroundColor: `${iconColor}20`,
            borderRadius: '50%'
          }}
        >
          <Icon size={28} style={{ color: iconColor }} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-primary">{title}</h3>
      </div>

      {/* 説明 */}
      <p
        className="text-sm text-text-secondary leading-relaxed whitespace-pre-line"
        style={{ marginBottom: '1.25rem' }}
      >
        {description}
      </p>

      {/* 機能リスト */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center" style={{ gap: '0.5rem' }}>
            <CheckCircle size={14} style={{ color: iconColor, flexShrink: 0 }} />
            <span className="text-sm text-text-secondary">{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================
// スクロール時の単一カード表示（PC用・90%未満）
// ============================================================
export function ScrollCircleCard({
  icon: Icon,
  title,
  titleEn,
  description,
  features,
  iconColor,
  circlePadding,
  opacity = 1
}: CircleCardProps) {
  // 小円サイズ (lg: w-60 = 240px)
  const smallCircleSize = 240;
  // 大円内テキストのleft offset = 小円の右端から少し右
  const textOffset = smallCircleSize * 0.55;

  return (
    <div
      className="absolute bottom-20 left-3 md:left-10 lg:left-[10%] xl:left-[20%] z-30"
      style={{
        opacity,
        transition: 'opacity 0.3s ease-out',
        pointerEvents: opacity > 0.5 ? 'auto' : 'none'
      }}
    >
      <div className="relative flex items-center">

        {/* 小さい円 */}
        <div className="relative z-20 flex-shrink-0">
          <div
            className="w-20 h-20 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-60 lg:h-60 rounded-full border-2 flex flex-col items-center justify-center"
            style={{
              backgroundColor: 'var(--circle-small-bg)',
              borderColor: 'rgba(128, 128, 128, 0.2)'
            }}
          >
            <Icon
              className="w-5 h-5 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-[60px] lg:h-[60px] mb-2"
              strokeWidth={1.5}
              style={{ color: iconColor }}
            />
            <span
              className="text-[8px] sm:text-[11px] md:text-[13px] lg:text-[14px] font-bold tracking-wider px-2 text-center leading-tight"
              style={{ color: 'var(--circle-small-text)' }}
            >
              {titleEn}
            </span>
          </div>
        </div>

        {/* 大きい円 */}
        <div
          className="absolute rounded-full z-10 flex items-center
            w-[260px] h-[260px]
            sm:w-[420px] sm:h-[420px]
            md:w-[500px] md:h-[500px]
            lg:w-[650px] lg:h-[650px]"
          style={{
            left: '70px',
            backgroundColor: 'var(--circle-large-bg)',
            border: '2px solid var(--circle-large-border)',
          }}
        >
          {/* テキストエリア: 小円の右端より右に配置 */}
          <div
            style={{
              paddingLeft: `calc(30% + 0.5rem)`,
              paddingRight: '2rem',
              width: '100%'
            }}
          >
            <h3
              className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary"
              style={{ marginBottom: circlePadding.paddingBottom }}
            >
              {title}
            </h3>
            <p
              className="text-[10px] sm:text-sm md:text-base lg:text-lg leading-relaxed text-text-secondary whitespace-pre-line"
              style={{ marginBottom: circlePadding.paddingBottom }}
            >
              {description}
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center" style={{ gap: '0.5rem' }}>
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: iconColor }}
                  />
                  <span
                    className="text-[10px] sm:text-sm md:text-base lg:text-[17px] leading-loose"
                    style={{ color: 'var(--circle-large-text)' }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================================
// ホバー可能な並列カード表示（PC用・90%以降）
// ============================================================
export function HoverCircleCard({
  icon: Icon,
  title,
  titleEn,
  description,
  features,
  iconColor,
  isHovered = false,
  index = 0
}: CircleCardProps) {
  return (
    <div className="relative flex items-center justify-center cursor-pointer">
      {!isHovered ? (
        // ========== 小円 ==========
        <motion.div
          layoutId={`circle-${index}`}
          className="rounded-full border-2 flex flex-col items-center justify-center"
          style={{
            width: '224px',
            height: '224px',
            backgroundColor: 'var(--circle-small-bg)',
            borderColor: 'rgba(128, 128, 128, 0.2)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon
            style={{ color: iconColor, width: '56px', height: '56px', marginBottom: '0.5rem' }}
            strokeWidth={1.5}
          />
          <span
            className="text-[14px] font-bold tracking-wider px-2 text-center leading-tight"
            style={{ color: 'var(--circle-small-text)' }}
          >
            {titleEn}
          </span>
        </motion.div>

      ) : (
        // ========== 大円（モーフィング） ==========
        <motion.div
          layoutId={`circle-${index}`}
          className="rounded-full flex items-center justify-center"
          style={{
            width: '620px',
            height: '620px',
            backgroundColor: 'var(--circle-large-bg)',
            border: '2px solid var(--circle-large-border)',
            boxShadow: 'var(--circle-large-shadow)',
          }}
          animate={{
            rotate: [0, 0.8, -0.8, 0],
          }}
          transition={{
            layout: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
            rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            style={{ padding: '3rem 3.5rem', width: '100%' }}
          >
            {/* 閉じるヒント */}
            <p
              className="text-xs text-text-secondary"
              style={{ marginBottom: '1rem', opacity: 0.6 }}
            >
              クリックで閉じる ×
            </p>

            {/* アイコン + タイトル */}
            <div className="flex items-center" style={{ gap: '1rem', marginBottom: '1rem' }}>
              <Icon
                style={{ color: iconColor, width: '40px', height: '40px', flexShrink: 0 }}
                strokeWidth={1.5}
              />
              <h3
                className="text-4xl font-bold text-primary"
              >
                {title}
              </h3>
            </div>

            {/* 説明 */}
            <p
              className="text-lg leading-relaxed text-text-secondary whitespace-pre-line"
              style={{ marginBottom: '1.5rem' }}
            >
              {description}
            </p>

            {/* 機能リスト */}
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center" style={{ gap: '0.75rem' }}>
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: iconColor }}
                  />
                  <span
                    className="text-lg"
                    style={{ color: 'var(--circle-large-text)' }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
