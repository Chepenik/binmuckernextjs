import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeHero } from '@/app/components/HomeHero';

export default function Page() {
  return (
    <div className="home-page min-h-screen">
      <Header />
      <main>
        <HomeHero />
      </main>
      <Footer />
    </div>
  );
}
