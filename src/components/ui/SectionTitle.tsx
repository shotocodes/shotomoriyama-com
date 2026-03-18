// src/components/ui/SectionTitle.tsx
'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  accentColor?: string;
  marginBottom?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  accentColor = '#0066FF',
  marginBottom = '4rem'
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
      style={{ marginBottom }}
    >
      <h2 className="text-3xl lg:text-4xl font-bold text-primary">
        {title}
      </h2>
      <p className="text-lg text-text-secondary" style={{ marginTop: '1rem' }}>
        {subtitle}
      </p>

      {/* 区切り線 */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '80px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          height: '2px',
          background: accentColor,
          margin: '1.5rem auto 0'
        }}
      />
    </motion.div>
  );
}
