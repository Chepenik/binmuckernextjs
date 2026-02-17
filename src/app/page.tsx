"use client";
import React from 'react';
import Image from 'next/image';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeHero } from '@/app/components/HomeHero';
import { LavaBackground } from './components/LavaBackground';

export default function Page() {
  return (
    <div className="min-h-screen bg-cyber-black">
      <LavaBackground />

      {/* Binmucker logo background effect */}
      <div className="fixed inset-0 z-[1] pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.07] animate-pulse-slow">
          <Image
            src="/Binmucker.png"
            alt=""
            fill
            className="object-contain"
            priority={false}
          />
        </div>
      </div>

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
