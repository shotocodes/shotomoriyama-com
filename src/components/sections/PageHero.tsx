// src/components/sections/PageHero.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import GridBackground from '@/components/shared/GridBackground';
import AnimatedTitle from '@/components/ui/AnimatedTitle';

interface PageHeroProps {
  title: string;
  subtitle: string;
  description?: string;
  graphic?: ReactNode;
  accentColor?: string;
  useAnimatedTitle?: boolean;
  showGrid?: boolean;
}

export default function PageHero({
  title,
  subtitle,
  description,
  graphic,
  accentColor = '#0066FF',
  useAnimatedTitle = false,
  showGrid = true
}: PageHeroProps) {
  return (
    <section
  className={`bg-background pt-24 lg:pt-100 ${graphic ? 'pb-20 lg:pb-20' : 'pb-20 lg:pb-32'}`}
  style={{ position: 'relative', overflow: 'hidden'}}
>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* 左側: テキスト */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {useAnimatedTitle ? (
              <div style={{ marginBottom: '1rem' }}>
                <AnimatedTitle text={title} accentColor={accentColor} />
              </div>
            ) : (
              <h1
                className="text-5xl lg:text-7xl font-bold text-primary"
                style={{ marginBottom: '1rem' }}
              >
                {title}
              </h1>
            )}

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                height: '3px',
                background: accentColor,
                marginBottom: '1.5rem'
              }}
            />

            <p
              className="text-xl text-text-secondary"
              style={{ marginBottom: description ? '1rem' : 0 }}
            >
              {subtitle}
            </p>

            {description && (
              <p className="text-base text-text-secondary">{description}</p>
            )}
          </motion.div>

          {/* 右側: グラフィック (graphicがない場合 or モバイルは非表示) */}
          {graphic && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:flex"
              style={{
                position: 'relative',
                height: '500px',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {graphic}
            </motion.div>
          )}

        </div>
      </div>
      <div className="hidden lg:block">
        <GridBackground
        show={showGrid}
        opacity={0.3}
        gridSize={40}
        color="rgba(0, 0, 0, 0.3)"
      /></div>

    </section>
  );
}
