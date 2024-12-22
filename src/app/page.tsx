import React from 'react';
import './globals.css';     
import { Inter } from 'next/font/google';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeHero } from './components/HomeHero';

const inter = Inter({ subsets: ['latin'] });

export default function Page() {
  return (
    <div
      className={`${inter.className} 
                  bg-gradient-to-b from-currencyGreen to-treasuryGold
                  min-h-screen flex flex-col`}
    >
      <Header />
      <main className="flex-grow pt-[80px] px-4">
        <HomeHero />
      </main>
      <Footer />
    </div>
  );
}