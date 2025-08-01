'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Heart, Coffee, Star, Sparkles, Zap } from 'lucide-react';
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
    title: 'Fold Bitcoin Card',
    description: 'Earn 2% unlimited bitcoin rewards with the Fold Credit Card',
    url: 'https://foldapp.com/credit-card?r=bohpA',
    category: 'Finance',
    gradient: 'from-yellow-200 via-orange-300 to-red-400',
  },
  {
    title: 'Gemini Credit Card',
    description: 'Earn extra crypto rewards when you use this link to apply for the Gemini Credit Card and are approved',
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
              Welcome to my digital space
            </span>
            <Sparkles className="w-6 h-6 text-amber-500" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent leading-tight">
            Most people call me <span className="text-amber-600">Chep</span>, 
            <br />
            though some know me as the <span className="text-slate-800">Binmucker</span>.
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            I&apos;m passionate about building things. This website serves as a hub for memes, personal projects, mortgage tools, 
            and everything in between.
          </p>
        </div>
        
        {/* Enhanced Support Section with green effects */}
        <div className="mb-16 relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 rounded-3xl opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-green-400/10 to-emerald-500/10 rounded-3xl animate-pulse"></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute top-4 left-4 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-60"></div>
            <div className="absolute top-8 right-8 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-ping opacity-50" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-4 right-4 w-1 h-1 bg-green-300 rounded-full animate-ping opacity-30" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          <div className="relative bg-gradient-to-br from-white/90 via-white/95 to-white/90 rounded-3xl p-8 md:p-12 shadow-2xl border border-emerald-200/50 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-red-100 to-red-200 rounded-full shadow-lg">
                  <Heart className="w-8 h-8 text-red-500" />
                </div>
                <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full shadow-lg">
                  <Coffee className="w-8 h-8 text-amber-600" />
                </div>
                <div className="p-3 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full shadow-lg">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              
              <h2 className="text-4xl font-bold text-slate-800 mb-4">
                Support The Binmucker
              </h2>
              
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6">
                If you find my tools, content, or projects helpful, consider supporting my work! 
                Every contribution helps me build more awesome stuff for the community.
              </p>
              
              {/* Enhanced CTA button */}
              <button
                onClick={() => setZapModalOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <Zap className="w-5 h-5 group-hover:animate-pulse" />
                <span>Support My Work</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
            
            <div className="flex flex-col items-center gap-6">
              <p className="text-sm text-slate-500 text-center max-w-md">
                💝 Your support fuels more late-night coding sessions and free tools for everyone!
              </p>
            </div>
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
      </section>

      {/* Zap Modal */}
      <ZapModal isOpen={isZapModalOpen} onClose={() => setZapModalOpen(false)} />
    </>
  );
}
