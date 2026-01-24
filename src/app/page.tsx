"use client";
import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeHero } from '@/app/components/HomeHero';

export default function Page() {
  return (
    <div className="min-h-screen bg-cyber-black bg-aurora bg-cyber-grid">
      <Header />
      <main className="flex-grow pt-[80px] px-4">
        <HomeHero />
      </main>
      <Footer />
    </div>
  );
}
