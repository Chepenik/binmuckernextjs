'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';

interface BlockLink {
  title: string;
  description: string;
  url: string;
  timeAgo: string;
  category: string;
  gradient: string;
}

const links: BlockLink[] = [
  {
    title: 'My Nostr',
    description: 'A decentralized network where I get paid to shitpost',
    url: 'https://primal.net/p/npub16syt2k5uky4pxycfttxrxmwwzht2t3008f2q68kw4almjl4guu9qea8t7y',
    timeAgo: '2 minutes ago',
    category: 'Entertainment',
    gradient: 'from-pink-200 to-pink-300',
  },
  {
    title: 'Mortgage Calculator',
    description: 'Calculate monthly payments and view amortization schedules',
    url: 'https://mortgagecalculator-conorchepenik.replit.app/',
    timeAgo: '5 minutes ago',
    category: 'Finance',
    gradient: 'from-green-200 to-green-300',
  },
  {
    title: 'Finance Tools',
    description: 'Essential calculators and tools for financial planning',
    url: '/finance',
    timeAgo: '10 minutes ago',
    category: 'Finance',
    gradient: 'from-purple-200 to-purple-300',
  },
  {
    title: 'Bitcoin Resources',
    description: 'A curated collection of Bitcoin educational resources',
    url: '/bitcoin',
    timeAgo: '15 minutes ago',
    category: 'Education',
    gradient: 'from-blue-200 to-blue-300',
  },
  {
    title: 'Developer Tools',
    description: 'Essential tools and resources for developers',
    url: '/dev-tools',
    timeAgo: '20 minutes ago',
    category: 'Development',
    gradient: 'from-yellow-200 to-yellow-300',
  },
  {
    title: 'Community Hub',
    description: 'Connect and collaborate with our growing community',
    url: '/community',
    timeAgo: '25 minutes ago',
    category: 'Social',
    gradient: 'from-indigo-200 to-indigo-300',
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
          I&apos;m passionate about building things. This website serves as a hub for memes, personal projects, mortgage tools, useful links, 
          and everything in between.
        </p>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Explore Our Highlights
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
            <div className="flex items-center gap-2 text-xs text-gray-700">
              <Clock className="w-3 h-3" />
              <span>{link.timeAgo}</span>
              <span className="px-2 py-1 rounded-full bg-white/40">{link.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}