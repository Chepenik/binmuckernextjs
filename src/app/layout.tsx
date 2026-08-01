import React from 'react';
import type { Metadata } from 'next';
import { Inter, Orbitron, JetBrains_Mono, Cinzel } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/og';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

// Engraved Art Deco display face for headings.
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Binmucker | Useful Things for a More Sovereign Life',
    template: '%s | Binmucker',
  },
  description:
    'Conor Chepenik\'s internet home base: useful tools, daily writing, Bitcoin projects, breathing practice, experiments, and the ideas behind them.',
  keywords: [
    'Binmucker',
    'binmucker.com',
    'Conor Chepenik',
    'personal site',
    'link tree',
    'creator portfolio',
    'Bitcoin educator',
    'Bitcoin builder',
    'Lightning Network',
    'Nostr',
    'daily writing',
    'local business audit',
    'local SEO audit',
    'sound money',
    'Breathe Better',
    'Space Invaders',
    'Bitcoin Coloring Book',
  ],
  authors: [{ name: 'Conor Chepenik', url: 'https://binmucker.com' }],
  creator: 'Conor Chepenik',
  metadataBase: new URL('https://binmucker.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Binmucker | Useful Things for a More Sovereign Life',
    description:
      'Useful tools, daily writing, Bitcoin projects, breathing practice, and experiments by Conor Chepenik.',
    url: 'https://binmucker.com',
    siteName: 'Binmucker',
    images: [OG_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Binmucker | Useful Things for a More Sovereign Life',
    description:
      'Useful tools, daily writing, Bitcoin projects, and experiments by Conor Chepenik.',
    creator: '@ConorChepenik',
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'llms-txt': 'https://binmucker.com/llms.txt',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://binmucker.com/#website',
      name: 'Binmucker',
      url: 'https://binmucker.com',
      description:
        'The personal internet home base of Conor Chepenik. Free tools, daily writing, Bitcoin and Lightning projects, health experiments, and a retro browser game.',
      author: { '@id': 'https://binmucker.com/#person' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://binmucker.com/#organization',
      name: 'Binmucker LLC',
      url: 'https://binmucker.com',
      founder: { '@id': 'https://binmucker.com/#person' },
      description: 'Free local business audit tools and digital products by Conor Chepenik.',
    },
    {
      '@type': 'Person',
      '@id': 'https://binmucker.com/#person',
      name: 'Conor Chepenik',
      url: 'https://binmucker.com',
      email: 'chepenikconor@gmail.com',
      jobTitle: 'Builder',
      worksFor: { '@id': 'https://binmucker.com/#organization' },
      knowsAbout: ['Local SEO', 'Bitcoin', 'Lightning Network', 'Nostr', 'Web Development'],
      sameAs: [
        'https://www.linkedin.com/in/conorchepenik/',
        'https://x.com/ConorChepenik',
        'https://github.com/Chepenik',
        'https://www.youtube.com/@ConorChepenik',
        'https://medium.com/@chepenikconor',
        'https://ko-fi.com/chepenik',
      ],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://binmucker.com/#audit-tool',
      name: 'Local Business Audit Tool',
      url: 'https://binmucker.com/#audit',
      description: 'Free AI-powered local business audit. Analyzes Google Business Profile, website SEO, reviews, content, and competitive position with actionable recommendations.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      isPartOf: { '@id': 'https://binmucker.com/#website' },
    },
    {
      '@type': 'WebApplication',
      name: 'Breathe Better',
      url: 'https://binmucker.com/breathe',
      description: 'Free breathing exercise app with 5 science-backed patterns. No accounts, no payments.',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      isPartOf: { '@id': 'https://binmucker.com/#website' },
    },
    {
      '@type': 'VideoGame',
      name: 'Space Invaders',
      url: 'https://binmucker.com/space-invaders',
      description: 'Free browser-based retro arcade game with 5 levels, power-ups, boss fights, and endless mode.',
      genre: 'Arcade',
      gamePlatform: 'Web Browser',
      playMode: 'SinglePlayer',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      isPartOf: { '@id': 'https://binmucker.com/#website' },
    },
    {
      '@type': 'ItemList',
      name: 'Featured Projects & Resources',
      description: 'Curated collection of projects, tools, and resources by Conor Chepenik.',
      url: 'https://binmucker.com',
      numberOfItems: 12,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'About', url: 'https://binmucker.com/about' },
        { '@type': 'ListItem', position: 2, name: 'Blog', url: 'https://binmucker.com/blog' },
        { '@type': 'ListItem', position: 3, name: 'Bitcoin Coloring Book', url: 'https://bitcoincoloring.com/' },
        { '@type': 'ListItem', position: 4, name: 'Sound Money Mortgage Calculator', url: 'https://soundmoneymortgage.com/' },
        { '@type': 'ListItem', position: 5, name: 'Saylorscope', url: 'https://www.saylorscope.com/' },
        { '@type': 'ListItem', position: 6, name: 'Medium Blog', url: 'https://medium.com/@chepenikconor' },
        { '@type': 'ListItem', position: 7, name: 'Nostr Profile', url: 'https://primal.net/p/npub16syt2k5uky4pxycfttxrxmwwzht2t3008f2q68kw4almjl4guu9qea8t7y' },
        { '@type': 'ListItem', position: 8, name: 'Breathe Better', url: 'https://binmucker.com/breathe' },
        { '@type': 'ListItem', position: 9, name: 'Space Invaders', url: 'https://binmucker.com/space-invaders' },
        { '@type': 'ListItem', position: 10, name: 'GuitarGui', url: 'https://guitargui.com/' },
        { '@type': 'ListItem', position: 11, name: 'Venice AI', url: 'https://venice.ai/chat?ref=pnaIip' },
        { '@type': 'ListItem', position: 12, name: 'Gemini Credit Card', url: 'https://creditcard.exchange.gemini.com/credit-card/apply?referral_code=jljkt4e94' },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} ${cinzel.variable}`}>
      <head>
        <link rel="preconnect" href="https://i.nostr.build" />
      </head>
      <body className="bg-cyber-black min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
