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
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Binmucker',
  url: 'https://binmucker.com',
  description:
    'Digital portfolio of Conor Chepenik featuring Bitcoin tools, memes, browser games, and creative projects.',
  author: {
    '@type': 'Person',
    name: 'Conor Chepenik',
    url: 'https://binmucker.com',
    sameAs: [
      'https://www.linkedin.com/in/conorchepenik/',
      'https://x.com/ConorChepenik',
      'https://github.com/Chepenik',
      'https://www.youtube.com/@ConorChepenik',
    ],
  },
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
