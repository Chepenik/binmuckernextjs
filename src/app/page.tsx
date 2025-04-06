"use client";
import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeHero } from '@/app/components/HomeHero';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Header />
      <main className="flex-grow pt-[80px] px-4">
        <HomeHero />
      </main>
      <Footer />
    </div>
  );
}
