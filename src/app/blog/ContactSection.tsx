// src/app/blog/ContactSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

// ✅ 定数化（2箇所にべた書きしていたものを一元管理）
const CONTACT_EMAIL = '0sdm0.moriyama@gmail.com';
const LINE_URL = 'https://line.me/ti/p/shoto0720';

const LineIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
  </svg>
);

export default function ContactSection() {
  return (
    <section
      className="bg-background"
      style={{ padding: '4rem 0', position: 'relative', overflow: 'hidden' }}
    >
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
          style={{ maxWidth: '48rem', margin: '0 auto' }}
        >
          <h2
            className="text-3xl lg:text-4xl font-bold text-primary"
            style={{ marginBottom: '1.5rem' }}
          >
            LINEやメールでお気軽にご連絡ください
          </h2>
          <p
            style={{ marginBottom: '3rem', color: 'var(--color-text-secondary)' }}
          >
            サイトに関してのご不明点、今のサイトでいいのか不安な方もお気軽にお問い合わせください
          </p>

          <div className="flex flex-col sm:flex-row justify-center" style={{ gap: '1.5rem' }}>

            {/* LINE */}
            <motion.a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-bold text-lg border-2 transition-all"
              style={{
                padding: '1rem 2rem',
                gap: '0.75rem',
                borderColor: '#06C755',
                color: '#06C755',
                background: 'transparent',
                textDecoration: 'none',
              }}
              whileHover={{ scale: 1.05, backgroundColor: '#06C755', color: '#ffffff' }}
              whileTap={{ scale: 0.95 }}
            >
              <LineIcon size={24} />
              <span>LINE で相談</span>
            </motion.a>

            {/* メール */}
            <motion.a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center font-bold text-lg border-2 transition-all"
              style={{
                padding: '1rem 2rem',
                gap: '0.75rem',
                textDecoration: 'none',
                borderColor: '#64748b',
                color: '#64748b',
                backgroundColor: 'transparent',
              }}
              whileHover={{ scale: 1.05, backgroundColor: '#64748b', color: '#ffffff' }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={24} />
              <span>メールで相談</span>
            </motion.a>
          </div>

          {/* メールアドレス表示 */}
          <p
            className="text-sm"
            style={{ marginTop: '2rem', color: 'var(--color-text-secondary)' }}
          >
            {CONTACT_EMAIL}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
