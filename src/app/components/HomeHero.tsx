'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

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
    title: 'Join Crowdhealth',
    description: 'Escape the grip of big insurance with CrowdHealth - the free-market disruptor empowering you to control your healthcare costs and choices',
    url: 'https://www.joincrowdhealth.com/?referral_code=GQRENX',
    category: 'Healthcare',
    gradient: 'from-orange-200 to-orange-600',
  },
  {
    title: 'Buy Bitcoin w/ Swan',
    description: 'Get BTC, retirement exposure, and secure multisig custody',
    url: 'https://www.swanbitcoin.com/conorchepenik/',
    category: 'Finance',
    gradient: 'from-yellow-300 to-blue-600',
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
