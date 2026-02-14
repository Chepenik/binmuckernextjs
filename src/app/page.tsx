"use client";
import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeHero } from '@/app/components/HomeHero';
import { LavaBackground } from './components/LavaBackground';

export default function Page() {
  return (
    <div className="min-h-screen bg-cyber-black">
      <LavaBackground />
      <div className="relative z-10">
        <Header />
        <main className="flex-grow pt-[80px] px-4">
          <HomeHero />
        </main>
        <Footer />
      </div>
    </div>
  );
}
