import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Contact - お問い合わせ',
  description:
    'Webサイト制作のご相談・お見積もりのご依頼はこちらから。フォーム・LINE・Instagram でお気軽にお問い合わせください。',
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
