import React from 'react';
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

export const metadata = {
  title: 'binmucker.com',
  description: 'Showcase of memes, finance tools, and more.',
  metadataBase: new URL('https://binmucker.com'),
  openGraph: {
    title: 'binmucker.com',
    description: 'Showcase of memes, finance tools, and more.',
    url: 'https://binmucker.com',
    siteName: 'binmucker.com',
    images: [
      {
        url: 'https://i.nostr.build/lWaH02jqNNEXV0B1.jpg',
        width: 1200,
        height: 630,
        alt: 'binmucker.com preview image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'binmucker.com',
    description: 'Showcase of memes, finance tools, and more.',
    images: ['https://i.nostr.build/lWaH02jqNNEXV0B1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-cyber-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
