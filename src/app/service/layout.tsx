import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Service - 提供サービス・料金',
  description:
    'Webサイト制作・デザインのサービス内容、制作の流れ、料金プラン、よくある質問をご案内します。',
};

export default function ServiceLayout({ children }: { children: ReactNode }) {
  return children;
}
