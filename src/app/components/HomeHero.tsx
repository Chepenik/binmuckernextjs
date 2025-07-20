'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Heart, Coffee, Star } from 'lucide-react';
import SupportButton from './SupportButton';

interface BlockLink {
  title: string;
  description: string;
  url: string;
  category: string;
  gradient: string;
}

const links: BlockLink[] = [
  {
    title: 'My Nostr',
    description: 'A decentralized network where I get paid to shitpost',
    url: 'https://primal.net/p/npub16syt2k5uky4pxycfttxrxmwwzht2t3008f2q68kw4almjl4guu9qea8t7y',
    category: 'Entertainment',
    gradient: 'from-pink-200 to-pink-600',
  },
  {
    title: 'Mortgage Calculator',
    description: 'Calculate monthly payments and view amortization schedules',
    url: 'https://mortgagecalculator-conorchepenik.replit.app/',
    category: 'Finance',
    gradient: 'from-green-200 to-green-600',
  },
  {
    title: 'My Medium',
    description: 'The place where I have decided to write everyday for the rest of my life',
    url: 'https://medium.com/@chepenikconor',
    category: 'Writing',
    gradient: 'from-blue-200 to-blue-600',
  },
  {
    title: 'Breath Better',
    description: 'An app to help you improve your breathing techniques',
    url: 'https://breathbetter.io',
    category: 'Health',
    gradient: 'from-teal-200 to-teal-600',
  },
  {
    title: 'Join Crowdhealth',
    description: 'Escape the grip of big insurance with CrowdHealth - the free-market disruptor empowering you to control your healthcare costs and choices',
    url: 'https://www.joincrowdhealth.com/?referral_code=GQRENX',
    category: 'Healthcare',
    gradient: 'from-orange-200 to-orange-600',
  },
  {
    title: 'Fold Bitcoin Card',
    description: 'Earn 2% unlimited bitcoin rewards with the Fold Credit Card',
    url: 'https://foldapp.com/credit-card?r=bohpA',
    category: 'Finance',
    gradient: 'from-purple-300 to-orange-300',
  },
  {
    title: 'Gemini Credit Card',
    description: 'Earn extra crypto rewards when you use this link to apply for the Gemini Credit Card and are approved',
    url: 'https://creditcard.exchange.gemini.com/credit-card/apply?referral_code=jljkt4e94',
    category: 'Finance',
    gradient: 'from-red-400 to-sky-300',
  },
  {
    title: 'Handwritten Letters',
    description: 'Buy personal handwritten letters with sats',
    url: 'https://quotestoansweryourquestions.replit.app/',
    category: 'Shop',
    gradient: 'from-pink-200 to-pink-600',
  },
  {
    title: 'Saylorscope',
    description: 'Track how investments well likely perform over the years',
    url: 'https://www.saylorscope.com/',
    category: 'Finance',
    gradient: 'from-purple-200 to-purple-600',
  },
];

export function HomeHero() {
  return (
    <section className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Most people call me Chep, though some know me as the Binmucker.
        </h1>
        <p className="text-lg text-gray-600">
          I&apos;m passionate about building things. This website serves as a hub for memes, personal projects, mortgage tools, 
          and everything in between.
        </p>
      </div>
      
      {/* Support Section - Prominently placed */}
      <div className="mb-12 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-3xl p-8 shadow-lg border border-purple-100">
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-red-500" />
            <Coffee className="w-8 h-8 text-orange-500" />
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Support The Binmucker
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            If you find my tools, content, or projects helpful, consider supporting my work! 
            Every contribution helps me build more awesome stuff for the community.
          </p>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <SupportButton priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || "price_1YourRecurringPriceId"} />
          <p className="text-sm text-gray-500 text-center">
            💝 Your support fuels more late-night coding sessions and free tools for everyone!
          </p>
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Explore My Stuff
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.url}
            className={`block p-4 rounded-lg bg-gradient-to-br ${link.gradient} hover:opacity-90 transition-opacity`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">{link.title}</h3>
                <p className="text-sm text-gray-700">{link.description}</p>
              </div>
              <ArrowUpRight className="text-gray-800/70" />
            </div>
            <div className="text-xs text-gray-700">
              <span className="px-2 py-1 rounded-full bg-white/40">
                {link.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
