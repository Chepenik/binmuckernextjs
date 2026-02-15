import React from 'react';
import type { Metadata } from 'next';
import { Inter, Orbitron, JetBrains_Mono } from 'next/font/google';
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

export const metadata: Metadata = {
  title: {
    default: 'Binmucker - Digital Creations by Conor Chepenik',
    template: '%s | Binmucker',
  },
  description:
    'Binmucker is the digital portfolio of Conor Chepenik. Explore Bitcoin tools, memes, browser games, finance resources, and creative projects.',
  keywords: [
    'Binmucker',
    'binmucker.com',
    'Conor Chepenik',
    'Bitcoin',
    'digital creations',
    'memes',
    'finance tools',
    'browser games',
    'Space Invaders',
    'Lightning Network',
    'Nostr',
  ],
  authors: [{ name: 'Conor Chepenik', url: 'https://binmucker.com' }],
  creator: 'Conor Chepenik',
  metadataBase: new URL('https://binmucker.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Binmucker - Digital Creations by Conor Chepenik',
    description:
      'Explore Bitcoin tools, memes, browser games, and creative digital projects by Conor Chepenik.',
    url: 'https://binmucker.com',
    siteName: 'Binmucker',
    images: [
      {
        url: 'https://i.nostr.build/lWaH02jqNNEXV0B1.jpg',
        width: 1200,
        height: 630,
        alt: 'Binmucker - Digital Creations by Conor Chepenik',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Binmucker - Digital Creations by Conor Chepenik',
    description:
      'Explore Bitcoin tools, memes, browser games, and creative digital projects.',
    creator: '@ConorChepenik',
    images: ['https://i.nostr.build/lWaH02jqNNEXV0B1.jpg'],
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
        'Digital portfolio of Conor Chepenik featuring Bitcoin tools, breathing exercises, browser games, and creative projects.',
      author: { '@id': 'https://binmucker.com/#person' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://binmucker.com/#organization',
      name: "Binmucker's LLC",
      url: 'https://binmucker.com',
      founder: { '@id': 'https://binmucker.com/#person' },
      description: 'Digital products, Bitcoin education, and creative tools by Conor Chepenik.',
    },
    {
      '@type': 'Person',
      '@id': 'https://binmucker.com/#person',
      name: 'Conor Chepenik',
      url: 'https://binmucker.com',
      email: 'chepenikconor@gmail.com',
      jobTitle: 'Bitcoin Educator & Builder',
      worksFor: { '@id': 'https://binmucker.com/#organization' },
      knowsAbout: ['Bitcoin', 'Lightning Network', 'Nostr', 'Web Development', 'Breathing Exercises'],
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
      numberOfItems: 7,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'About', url: 'https://binmucker.com/about' },
        { '@type': 'ListItem', position: 2, name: 'Blog', url: 'https://binmucker.com/blog' },
        { '@type': 'ListItem', position: 3, name: 'Bitcoin Coloring Book', url: 'https://bitcoincoloring.com/' },
        { '@type': 'ListItem', position: 4, name: 'Sound Money Mortgage Calculator', url: 'https://soundmoneymortgage.com/' },
        { '@type': 'ListItem', position: 5, name: 'Saylorscope', url: 'https://www.saylorscope.com/' },
        { '@type': 'ListItem', position: 6, name: 'Medium Blog', url: 'https://medium.com/@chepenikconor' },
        { '@type': 'ListItem', position: 7, name: 'Nostr Profile', url: 'https://primal.net/p/npub16syt2k5uky4pxycfttxrxmwwzht2t3008f2q68kw4almjl4guu9qea8t7y' },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-cyber-black min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
