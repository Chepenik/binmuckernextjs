'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Coffee, Sparkles } from 'lucide-react';
import ZapModal from './ZapModal';

interface BlockLink {
  title: string;
  description: string;
  url: string;
  category: string;
  gradient: string;
  icon?: string;
}

const links: BlockLink[] = [
  {
    title: 'Bitcoin Coloring Book',
    description: 'A fun introduction to Bitcoin for kids and families. Learn about sound money, self-custody, and the future of finance through engaging coloring activities.',
    url: 'https://bitcoincoloring.com/',
    category: 'Education',
    gradient: 'from-orange-200 via-yellow-300 to-amber-400',
  },
  {
    title: 'My Nostr',
    description: 'A decentralized network where I get paid to shitpost',
    url: 'https://primal.net/p/npub16syt2k5uky4pxycfttxrxmwwzht2t3008f2q68kw4almjl4guu9qea8t7y',
    category: 'Entertainment',
    gradient: 'from-purple-200 via-purple-300 to-indigo-400',
  },
  {
    title: 'Mortgage Calculator',
    description: 'Calculate monthly payments and view amortization schedules',
    url: 'https://mortgagecalculator-conorchepenik.replit.app/',
    category: 'Finance',
    gradient: 'from-emerald-200 via-teal-300 to-cyan-400',
  },
  {
    title: 'My Medium',
    description: 'The place where I have decided to write everyday for the rest of my life',
    url: 'https://medium.com/@chepenikconor',
    category: 'Writing',
    gradient: 'from-blue-200 via-indigo-300 to-purple-400',
  },
  {
    title: 'Breath Better',
    description: 'An app to help you improve your breathing techniques',
    url: 'https://breathbetter.io',
    category: 'Health',
    gradient: 'from-teal-200 via-emerald-300 to-green-400',
  },
  {
    title: 'Join Crowdhealth',
    description: 'Escape the grip of big insurance with CrowdHealth - the free-market disruptor empowering you to control your healthcare costs and choices',
    url: 'https://www.joincrowdhealth.com/?referral_code=GQRENX',
    category: 'Healthcare',
    gradient: 'from-orange-200 via-red-300 to-pink-400',
  },
  {
    title: 'Gemini Credit Card',
    description: 'Earn Bitcoin rewards when you use this link to apply for the Gemini Credit Card and are approved',
    url: 'https://creditcard.exchange.gemini.com/credit-card/apply?referral_code=jljkt4e94',
    category: 'Finance',
    gradient: 'from-pink-200 via-rose-300 to-red-400',
  },
  {
    title: 'Handwritten Letters',
    description: 'Buy personal handwritten letters with sats',
    url: 'https://quotestoansweryourquestions.replit.app/',
    category: 'Shop',
    gradient: 'from-rose-200 via-pink-300 to-purple-400',
  },
  {
    title: 'Saylorscope',
    description: 'Track how investments well likely perform over the years',
    url: 'https://www.saylorscope.com/',
    category: 'Finance',
    gradient: 'from-indigo-200 via-purple-300 to-violet-400',
  },
];

export function HomeHero() {
  const [isZapModalOpen, setZapModalOpen] = useState(false);

  return (
    <>
      <section className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Hero Section with enhanced typography */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-amber-500" />
            <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
              If you want to fix the world, the best place to start is with yourself.
            </span>
            <Sparkles className="w-6 h-6 text-amber-500" />
          </div>
        </div>
        
        {/* Projects Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-slate-400 to-amber-400 rounded-full"></div>
            <h2 className="text-3xl font-bold text-slate-800">
              Explore My Stuff
            </h2>
          </div>
          
          <p className="text-slate-600 mb-8 max-w-2xl">
            A curated collection of projects, tools, and resources I&apos;ve built or found useful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link) => (
            <Link
              key={link.title}
              href={link.url}
              className={`group block p-6 rounded-2xl bg-gradient-to-br ${link.gradient} hover:shadow-2xl transition-all duration-300 border border-slate-200/50 hover:border-slate-300/50 hover:scale-105 backdrop-blur-sm`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 mb-2 text-lg group-hover:text-slate-900 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed group-hover:text-slate-800 transition-colors">
                    {link.description}
                  </p>
                </div>
                <ArrowUpRight className="text-slate-600 group-hover:text-slate-800 transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/60 text-xs font-medium text-slate-700 border border-slate-200/50">
                  {link.category}
                </span>
                <div className="w-2 h-2 bg-slate-400 rounded-full group-hover:bg-slate-600 transition-colors"></div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Ko-fi Support Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-200/50">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              ☕ Coffee Fuel
            </h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              I won&apos;t hold a grudge if you don&apos;t leave a tip (seriously, I won&apos;t even remember), 
              but know they&apos;re always greatly appreciated. I hope only people who got legitimate 
              value from my projects would leave one - I&apos;m not looking for handouts, just 
              supporting those who found my stuff genuinely useful.
            </p>
            <a
              href="https://ko-fi.com/chepenik"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            >
              <Coffee className="w-5 h-5 group-hover:animate-pulse" />
              <span>Buy me a coffee</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Zap Modal */}
      <ZapModal isOpen={isZapModalOpen} onClose={() => setZapModalOpen(false)} />
    </>
  );
}
