'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Zap,
  Code2,
  Video,
  Calculator,
  GitFork,
  GraduationCap,
  ArrowUpRight,
} from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

const skills = [
  { icon: Zap, title: 'Bitcoin & Lightning', description: 'Education, tools, and advocacy for sound money and the Lightning Network.' },
  { icon: Code2, title: 'Web Development', description: 'Building with Next.js, React, TypeScript, and Tailwind CSS.' },
  { icon: Video, title: 'Content Creation', description: 'Daily writing on Medium, YouTube videos, and Nostr posts.' },
  { icon: Calculator, title: 'Finance Tools', description: 'Mortgage calculators, investment trackers, and financial education.' },
  { icon: GitFork, title: 'Open Source', description: 'Contributing to the Bitcoin ecosystem and sharing code publicly.' },
  { icon: GraduationCap, title: 'Education', description: 'Making complex topics accessible through books, games, and interactive tools.' },
];

const projects = [
  { title: 'Breathe Better', description: 'Free breathing exercise app with 5 science-backed patterns.', url: '/breathe' },
  { title: 'Space Invaders', description: 'Retro arcade game with 5 levels, power-ups, and boss fights.', url: '/space-invaders' },
  { title: 'Bitcoin Coloring Book', description: 'A fun introduction to Bitcoin for kids and families.', url: 'https://bitcoincoloring.com/' },
  { title: 'Sound Money Mortgage', description: 'Calculate monthly payments and view amortization schedules.', url: 'https://soundmoneymortgage.com/' },
  { title: 'Saylorscope', description: 'Track how investments perform over the years.', url: 'https://www.saylorscope.com/' },
  { title: 'My Medium', description: 'Daily writing about Bitcoin, technology, and self-improvement.', url: 'https://medium.com/@chepenikconor' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="heading-display text-[#E6EEF3] mb-4">Conor Chepenik</h1>
          <p className="text-neon-cyan text-xl font-semibold mb-6">Bitcoin Educator &amp; Builder</p>
          <div className="h-[2px] w-32 mx-auto rounded-full bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent mb-8" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            I build tools, write daily, and create educational content to help people
            understand Bitcoin, take control of their finances, and improve their lives.
          </p>
        </motion.div>

        {/* Story */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-neon-cyan/60 rounded-full shadow-[0_0_10px_rgba(0,194,255,0.3)]" />
            <h2 className="heading-section text-white">
              My <span className="text-neon-cyan">Story</span>
            </h2>
          </div>
          <div className="glass-dark rounded-2xl border border-white/10 p-8 space-y-5 text-gray-300 leading-relaxed">
            <p>
              I committed to writing every single day — rain or shine, inspired or not. That daily
              practice on Medium became the foundation for everything else: the projects, the tools,
              the books, and this site. Writing forces clarity, and clarity leads to building things
              that actually help people.
            </p>
            <p>
              My Bitcoin journey started with curiosity and turned into conviction. The more I
              learned about sound money, decentralization, and self-sovereignty, the more I wanted
              to share that knowledge with others. That led to the{' '}
              <a href="https://bitcoincoloring.com/" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">
                Bitcoin Coloring Book
              </a>
              , educational content on YouTube, and tools like the{' '}
              <a href="https://soundmoneymortgage.com/" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">
                Sound Money Mortgage Calculator
              </a>.
            </p>
            <p>
              Today I split my time between building web applications, creating content, and
              exploring the intersection of technology and personal well-being. The{' '}
              <Link href="/breathe" className="text-neon-cyan hover:underline">Breathe Better</Link> app
              is a perfect example — a free tool that helps people take care of themselves, no
              strings attached.
            </p>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-neon-cyan/60 rounded-full shadow-[0_0_10px_rgba(0,194,255,0.3)]" />
            <h2 className="heading-section text-white">
              What I <span className="text-neon-cyan">Do</span>
            </h2>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.title}
                variants={itemVariants}
                className="glass-dark rounded-2xl border border-white/10 p-6
                           hover:border-neon-cyan/30 hover:shadow-[0_0_20px_rgba(0,194,255,0.1)]
                           transition-all duration-300"
              >
                <skill.icon className="w-8 h-8 text-neon-cyan mb-4" />
                <h3 className="text-white font-semibold text-lg mb-2">{skill.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{skill.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Projects */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-12 bg-neon-cyan/60 rounded-full shadow-[0_0_10px_rgba(0,194,255,0.3)]" />
            <h2 className="heading-section text-white">
              Featured <span className="text-neon-cyan">Projects</span>
            </h2>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project) => {
              const isExternal = project.url.startsWith('http');
              return (
                <motion.div key={project.title} variants={itemVariants}>
                  <Link
                    href={project.url}
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group block glass-dark rounded-2xl border border-white/10 p-6 h-full
                               hover:border-neon-cyan/30 hover:shadow-[0_0_20px_rgba(0,194,255,0.1)]
                               transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-white font-semibold text-lg group-hover:text-neon-cyan transition-colors">
                        {project.title}
                      </h3>
                      <ArrowUpRight
                        className="text-gray-600 group-hover:text-neon-cyan
                                   group-hover:translate-x-1 group-hover:-translate-y-1
                                   transition-all duration-300 flex-shrink-0"
                        size={18}
                      />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* LLC Note */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-dark rounded-2xl border border-white/10 p-8 text-center">
            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mx-auto">
              Binmucker is operated by Binmucker&apos;s LLC. This site and its projects are built with
              transparency in mind. Some links are affiliate links — see the homepage for disclosures.
              For legal information, see our{' '}
              <Link href="/privacy" className="text-neon-cyan hover:underline">Privacy Policy</Link> and{' '}
              <Link href="/terms" className="text-neon-cyan hover:underline">Terms of Service</Link>.
            </p>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/contact"
            className="btn-gold-outline px-8 py-3 text-base inline-block"
          >
            Get in Touch
          </Link>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
