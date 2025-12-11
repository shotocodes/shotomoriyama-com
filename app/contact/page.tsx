// src/app/contact/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import { ja } from 'date-fns/locale';
import { addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import Header from '@/components/layout/Header';
import { Mail, Send, Calendar, ExternalLink } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(1, 'お名前を入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  phone: z.string().optional(),
  consultationType: z.string().min(1, 'ご相談内容を選択してください'),
  budget: z.string().optional(),
  referenceUrl: z.string().optional(),
  message: z.string().min(10, '詳細は10文字以上で入力してください'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // /order からのデータ取得
  useEffect(() => {
    // URLパラメータから取得
    const params = new URLSearchParams(window.location.search);
    const price = params.get('price');
    const projectType = params.get('project');

    if (price) {
      setEstimatedPrice(parseInt(price));
      setValue('budget', 'custom');
    }

    if (projectType) {
      const typeMap: Record<string, string> = {
        'website': 'Webサイト制作',
        'landing': 'ランディングページ',
        'ecommerce': 'ECサイト',
        'design': 'ロゴ・グラフィック',
        'maintenance': '保守・運用サポート'
      };
      setValue('consultationType', typeMap[projectType] || '');
    }

    // sessionStorage からも取得 (フォールバック)
    const estimateData = sessionStorage.getItem('estimateData');
    if (estimateData && !price) {
      try {
        const data = JSON.parse(estimateData);
        setEstimatedPrice(data.totalPrice);
        setValue('budget', 'custom');
      } catch (e) {
        console.error('Failed to parse estimate data:', e);
      }
    }
  }, [setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: 実際の送信処理を実装
      const submitData = {
        ...data,
        deliveryDate: selectedDate,
        estimatedPrice: estimatedPrice > 0 ? estimatedPrice : null,
      };

      console.log('Form submitted:', submitData);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitStatus('success');
      reset();
      setSelectedDate(null);
      sessionStorage.removeItem('estimateData');
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const consultationTypes = [
    'Webサイト制作',
    'ランディングページ',
    'ECサイト',
    'ロゴ・グラフィック',
    '保守・運用サポート',
    'その他のご相談'
  ];

  const budgetOptions = [
    { value: 'undecided', label: '未定・相談したい' },
    { value: '0-100000', label: '〜10万円' },
    { value: '100000-300000', label: '10万円〜30万円' },
    { value: '300000-500000', label: '30万円〜50万円' },
    { value: '500000-1000000', label: '50万円〜100万円' },
    { value: '1000000+', label: '100万円以上' },
  ];

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
                CONTACT
              </h1>
              <p className="text-xl lg:text-2xl text-text-secondary mb-3">
                お問い合わせ
              </p>
              <p className="text-sm lg:text-base text-text-secondary">
                お気軽にご相談ください。2営業日以内にご返信いたします
              </p>
            </motion.div>
          </div>
        </section>

        {/* フォームセクション */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

              {/* 見積もりデータ表示 */}
              {estimatedPrice > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-12 p-6 bg-background-alt rounded-lg border-2"
                  style={{ borderColor: '#556270' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Send size={24} style={{ color: '#556270' }} />
                    <h3 className="text-lg font-bold text-primary">
                      かんたん見積もりの結果
                    </h3>
                  </div>
                  <p className="text-3xl font-bold text-primary">
                    ¥{estimatedPrice.toLocaleString()}〜
                  </p>
                  <p className="text-sm text-text-secondary mt-2">
                    この金額を基に詳しくご相談させていただきます
                  </p>
                </motion.div>
              )}

              {/* フォーム */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                  {/* お名前 */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border-2 border-border rounded-lg focus:ring-2 focus:ring-[#556270] focus:border-transparent transition-all bg-background text-primary"
                      placeholder="山田 太郎"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  {/* メールアドレス */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border-2 border-border rounded-lg focus:ring-2 focus:ring-[#556270] focus:border-transparent transition-all bg-background text-primary"
                      placeholder="example@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  {/* 電話番号 */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                      電話番号 <span className="text-sm text-text-secondary">(任意)</span>
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border-2 border-border rounded-lg focus:ring-2 focus:ring-[#556270] focus:border-transparent transition-all bg-background text-primary"
                      placeholder="090-1234-5678"
                    />
                  </div>

                  {/* ご相談内容 */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-3">
                      ご相談内容 <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      {consultationTypes.map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-3 p-4 border-2 border-border rounded-lg hover:border-[#556270] transition-all cursor-pointer"
                        >
                          <input
                            {...register('consultationType')}
                            type="radio"
                            value={type}
                            className="w-4 h-4 text-[#556270] focus:ring-[#556270]"
                          />
                          <span className="text-primary">{type}</span>
                        </label>
                      ))}
                    </div>
                    {errors.consultationType && (
                      <p className="mt-1 text-sm text-red-500">{errors.consultationType.message}</p>
                    )}
                  </div>

                  {/* ご予算 */}
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-primary mb-2">
                      ご予算 <span className="text-sm text-text-secondary">(任意)</span>
                    </label>
                    <select
                      {...register('budget')}
                      id="budget"
                      className="w-full px-4 py-3 border-2 border-border rounded-lg focus:ring-2 focus:ring-[#556270] focus:border-transparent transition-all bg-background text-primary"
                    >
                      <option value="">選択してください</option>
                      {budgetOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                      {estimatedPrice > 0 && (
                        <option value="custom">
                          ¥{estimatedPrice.toLocaleString()}〜 (見積もりから)
                        </option>
                      )}
                    </select>
                  </div>

                  {/* 希望納期 */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      希望納期 <span className="text-sm text-text-secondary">(任意)</span>
                    </label>
                    <div className="relative">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={addDays(new Date(), 7)}
                        locale={ja}
                        dateFormat="yyyy年MM月dd日"
                        placeholderText="日付を選択してください"
                        className="w-full px-4 py-3 border-2 border-border rounded-lg focus:ring-2 focus:ring-[#556270] focus:border-transparent transition-all bg-background text-primary"
                      />
                      <Calendar
                        size={20}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none"
                      />
                    </div>
                    <p className="mt-2 text-xs text-text-secondary">
                      ※最短で1週間後から選択可能です
                    </p>
                  </div>

                  {/* 参考URL */}
                  <div>
                    <label htmlFor="referenceUrl" className="block text-sm font-medium text-primary mb-2">
                      参考URL <span className="text-sm text-text-secondary">(任意)</span>
                    </label>
                    <input
                      {...register('referenceUrl')}
                      type="url"
                      id="referenceUrl"
                      className="w-full px-4 py-3 border-2 border-border rounded-lg focus:ring-2 focus:ring-[#556270] focus:border-transparent transition-all bg-background text-primary"
                      placeholder="https://example.com"
                    />
                    <p className="mt-2 text-xs text-text-secondary">
                      参考にしたいサイトがあればURLをご記入ください
                    </p>
                  </div>

                  {/* 詳細・ご要望 */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                      詳細・ご要望 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      {...register('message')}
                      id="message"
                      rows={8}
                      className="w-full px-4 py-3 border-2 border-border rounded-lg focus:ring-2 focus:ring-[#556270] focus:border-transparent transition-all bg-background resize-none text-primary"
                      placeholder="ご要望やご質問などを詳しくご記入ください"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  {/* 送信ボタン */}
                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-3 px-12 py-4 rounded-lg font-bold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      style={{
                        backgroundImage: 'linear-gradient(to right, #556270, #8892A0)'
                      }}
                    >
                      <Send size={20} />
                      <span>{isSubmitting ? '送信中...' : '送信する'}</span>
                    </button>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg text-center border-2"
                      style={{
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        color: '#10B981'
                      }}
                    >
                      お問い合わせありがとうございます。2営業日以内にご返信いたします。
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-lg text-center border-2"
                      style={{
                        borderColor: '#EF4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: '#EF4444'
                      }}
                    >
                      送信に失敗しました。お手数ですが、もう一度お試しください。
                    </motion.div>
                  )}
                </form>

                {/* 代替連絡手段 */}
                <div className="mt-16 text-center pt-12 border-t-2 border-border">
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
          </div>
        </section>
      </div>
    </>
  );
}
