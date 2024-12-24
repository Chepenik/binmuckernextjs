"use client";
import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeHero } from './components/HomeHero';

export default function Page() {
  return (
    <div className="bg-gradient-to-b from-currencyGreen to-treasuryGold min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-[80px] px-4">
        <HomeHero />
      </main>
      <Footer />
    </div>
  );
}
