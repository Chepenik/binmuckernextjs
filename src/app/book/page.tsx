import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { LavaBackground } from '@/app/components/LavaBackground';
import { BookForm } from '@/app/components/book/BookForm';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/og';

export const metadata: Metadata = {
  title: 'Book a Call',
  description:
    'Book an AI SEO strategy call with Conor Chepenik. Get your local business found in Google and the AI answer engines. Priced in sats, paid on Lightning.',
  keywords: [
    'book AI SEO call',
    'local SEO consultation',
    'AI visibility strategy call',
    'Bitcoin consulting call',
  ],
  alternates: { canonical: 'https://binmucker.com/book' },
  openGraph: {
    title: 'Book a Call | Binmucker',
    description:
      'Book an AI SEO strategy call. Get found in Google and the AI answer engines. Priced in sats.',
    url: 'https://binmucker.com/book',
    siteName: 'Binmucker',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Call | Binmucker',
    description: 'Book an AI SEO strategy call. Get found by Google and the AI. Priced in sats.',
    images: [OG_IMAGE_URL],
  },
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ offer?: string }>;
}) {
  const { offer } = await searchParams;
  const selectedOffer = offer === 'retainer' ? 'retainer' : 'call';

  return (
    <div className="min-h-screen bg-cyber-black">
      <LavaBackground />
      <div className="relative z-10">
        <Header />
        <main className="flex-grow pt-[80px] px-4">
          <BookForm offer={selectedOffer} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
