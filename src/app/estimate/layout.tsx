import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Estimate - かんたん見積もり',
  description:
    'ページ数やご希望の機能を選ぶだけで、Webサイト制作の概算費用をその場でシミュレーションできます。',
};

export default function EstimateLayout({ children }: { children: ReactNode }) {
  return children;
}
