import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Order - ご依頼の流れ',
  description:
    'Webサイト制作のご依頼から納品までの流れをステップごとにご案内します。初めての方も安心してご依頼いただけます。',
};

export default function OrderLayout({ children }: { children: ReactNode }) {
  return children;
}
