import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'お問い合わせ完了',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ContactSuccessLayout({ children }: { children: ReactNode }) {
  return children;
}
