import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { ServicesHero } from '@/app/components/services/ServicesHero';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Bitcoin-native consulting, content creation, SEO audits, automation, and Bitcoin integration strategy. All services priced in sats.',
  openGraph: {
    title: 'Services | Binmucker',
    description:
      'Bitcoin-native consulting, content creation, SEO audits, automation, and Bitcoin integration strategy by Conor Chepenik.',
    url: 'https://binmucker.com/services',
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
      </main>
    </>
  );
}
