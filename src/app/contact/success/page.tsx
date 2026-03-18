// src/app/contact/success/page.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CheckCircle, MessageCircle, ArrowLeft, Instagram, Mail } from 'lucide-react';

interface IconProps {
  size?: number;
  style?: React.CSSProperties;
}

// LINE アイコン
const LineIcon = ({ size = 24, style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"
      fill="currentColor"
    />
  </svg>
);

// Instagram アイコン
const InstagramIcon = ({ size = 24, style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      fill="currentColor"
    />
  </svg>
);

export default function ContactSuccessPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background flex items-center justify-center" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
            style={{ maxWidth: '700px', margin: '0 auto' }}
          >
            {/* チェックアイコン */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: '#10B98120',
                margin: '0 auto 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              {/* 外側の円のアニメーション */}
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '2px solid #10B981'
                }}
              />
              <CheckCircle size={70} style={{ color: '#10B981' }} />
            </motion.div>

            {/* タイトル */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-primary mb-4"
            >
              送信完了しました
            </motion.h1>

            {/* メッセージ */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8" style={{ color: 'var(--color-text-secondary)' }}
            >
              <p className="text-lg mb-4">
                お問い合わせありがとうございます。
              </p>
              <p className="mb-6">
                <strong style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>24時間以内</strong>にご返信いたします。
              </p>
              <div className="bg-background-alt border-l-4 border-primary" style={{ padding: '1rem', marginBottom: '2rem' }}>
                <p className="text-sm text-left">
                  <strong style={{ color: 'var(--text-primary)' }}>お急ぎの場合</strong><br />
                  LINE・Instagram からもお気軽にご連絡ください。
                </p>
              </div>
            </motion.div>

            {/* ボタングループ */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-4 mb-8"
            >
              {/* トップに戻る */}
              <Link href="/">
                <motion.button
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 font-bold border-2 transition-all"
                  style={{
                    borderColor: '#10B981',
                    color: '#10B981'
                  }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: '#10B981',
                    color: '#ffffff'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft size={20} />
                  <span>トップに戻る</span>
                </motion.button>
              </Link>

              {/* LINE / Instagram / Email */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <a href="https://line.me/ti/p/shoto0720" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-bold border-2 transition-all"
                    style={{
                      borderColor: '#10B981',
                      color: '#10B981'
                    }}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: '#10B981',
                      color: '#ffffff'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LineIcon size={20} style={{ color: 'currentColor' }} />
                    <span className="text-sm">LINE</span>
                  </motion.button>
                </a>

                <a href="https://www.instagram.com/sh0t0x72/" target="_blank" rel="noopener noreferrer">
                  <motion.button
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-bold border-2 transition-all"
                    style={{
                      borderColor: '#E1306C',
                      color: '#E1306C'
                    }}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: '#E1306C',
                      color: '#ffffff'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <InstagramIcon size={20} style={{ color: 'currentColor' }} />
                    <span className="text-sm">Instagram</span>
                  </motion.button>
                </a>

                <a href="mailto:0sdm0.moriyama@gmail.com">
                  <motion.button
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-bold border-2 transition-all"
                    style={{
                      borderColor: '#FF6B6B',
                      color: '#FF6B6B'
                    }}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: '#FF6B6B',
                      color: '#ffffff'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail size={20} />
                    <span className="text-sm">Email</span>
                  </motion.button>
                </a>
              </div>
            </motion.div>

            {/* 返信優先度 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xs" style={{ color: 'var(--color-text-secondary)' }}
            >
              <p>返信優先度：LINE → Instagram → Email</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
