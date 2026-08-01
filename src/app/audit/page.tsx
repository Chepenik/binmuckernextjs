"use client";
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AuditHero } from '../components/audit/AuditHero';

export default function AuditPage() {
  return (
    <div className="site-page">
      <Header />
        <main>
          <AuditHero />
        </main>
      <Footer />
    </div>
  );
}
