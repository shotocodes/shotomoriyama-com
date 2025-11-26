// src/components/sections/ContactSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { siteContent } from '@/src/lib/constants/content';

const contactSchema = z.object({
  name: z.string().min(1, 'お名前を入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  subject: z.string().min(1, '件名を入力してください'),
  message: z.string().min(10, 'お問い合わせ内容は10文字以上で入力してください'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const { contact } = siteContent;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: 実際の送信処理を実装
      // 例: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });

      // デモ用の遅延
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Form submitted:', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-background-alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-primary mb-6 tracking-wider">
            C O N T A C T
          </h2>
          <p className="text-lg text-text-secondary mb-4">{contact.subtitle}</p>
          <p className="text-base text-text-secondary">{contact.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                お名前 <span className="text-red-500">*</span>
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-background"
                placeholder="山田 太郎"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-background"
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                件名 <span className="text-red-500">*</span>
              </label>
              <input
                {...register('subject')}
                type="text"
                id="subject"
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-background"
                placeholder="Webサイト制作について"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                お問い合わせ内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={6}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all bg-background resize-none"
                placeholder="お問い合わせ内容をご記入ください"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '送信中...' : '送信する'}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-100 text-green-700 rounded-lg text-center"
              >
                お問い合わせありがとうございます。2営業日以内にご返信いたします。
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-100 text-red-700 rounded-lg text-center"
              >
                送信に失敗しました。お手数ですが、もう一度お試しください。
              </motion.div>
            )}
          </form>

          {/* Alternative Contact */}
          <div className="mt-12 text-center">
            <p className="text-sm text-text-secondary mb-4">
              または、直接メールでもお問い合わせいただけます
            </p>
            <a
              href="mailto:0sdm0.moriyama@gmail.com"
              className="text-accent hover:text-accent/80 transition-colors font-medium"
            >
              0sdm0.moriyama@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
