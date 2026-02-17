"use client";
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LavaBackground } from '../components/LavaBackground';
import { AuditHero } from '../components/audit/AuditHero';

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-cyber-black">
      <LavaBackground />
      <div className="relative z-10">
        <Header />
        <main className="flex-grow pt-[80px] px-4">
          <AuditHero />
        </main>
        <Footer />
      </div>
    </div>
  );
}
