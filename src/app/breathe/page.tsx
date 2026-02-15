'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wind, Brain, Target } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const benefits = [
  {
    icon: Wind,
    title: 'Feel calmer',
    description: 'Activate your parasympathetic nervous system and release tension with every breath.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: Brain,
    title: 'Think clearer',
    description: 'Increase oxygen flow to your brain and sharpen your focus and mental clarity.',
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: Target,
    title: 'Build a habit',
    description: 'Start with just one minute a day. Small consistent practice creates lasting change.',
    gradient: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-400',
  },
];

export default function BreatheLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111827] to-[#1f2937]">
      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        {/* Hero */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-6">
            <Wind className="w-4 h-4" />
            Free breathing exercises
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Find your calm through{' '}
            <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
              mindful breathing
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Science-backed breathing patterns to reduce stress, improve focus, and bring balance to your day.
            No accounts, no payments — just breathe.
          </p>

          <Link
            href="/breathe/practice"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-lg
                       bg-gradient-to-r from-pink-500 to-violet-500
                       hover:from-pink-400 hover:to-violet-400
                       transition-all duration-200 shadow-lg shadow-violet-500/25
                       hover:shadow-violet-500/40"
          >
            Start Breathing
            <Wind className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-4`}>
                <benefit.icon className={`w-6 h-6 ${benefit.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
