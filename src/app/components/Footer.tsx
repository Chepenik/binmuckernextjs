'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import ZapModal from './ZapModal';

export function Footer() {
  const year = new Date().getFullYear();
  const [isZapModalOpen, setZapModalOpen] = useState(false);

  return (
    <footer className="relative bg-cyber-black border-t border-gold-500/30 py-12">
      {/* Sharp gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      {/* Aurora background */}
      <div className="absolute inset-0 bg-aurora opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Play column */}
        <div className="mb-8 flex flex-col items-center md:items-start gap-3">
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500">Play</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link
              href="/space-invaders"
              className="text-gray-400 hover:text-neon-magenta transition-colors duration-300"
            >
              Game
            </Link>
            <Link
              href="/breathe"
              className="text-gray-400 hover:text-neon-cyan transition-colors duration-300"
            >
              Breathe
            </Link>
            <a
              href="https://chep.creator-spring.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gold-400 transition-colors duration-300"
            >
              Merch
            </a>
            <button
              type="button"
              onClick={() => setZapModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gold-400 transition-colors duration-300"
            >
              <span className="text-base" aria-hidden="true">&#9889;</span>
              Zap Me
            </button>
          </div>
        </div>

        {/* Divider above main footer row */}
        <div className="mb-8 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright with gradient */}
          <p className="text-gray-500 text-sm text-center md:text-left">
            <span className="text-gold-500">&copy;</span> {year}{' '}
            <span className="text-gradient-gold font-semibold">Binmucker LLC</span>
            . All rights reserved.
          </p>

          {/* Social Links with neon hover */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/conorchepenik/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-neon-cyan hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]
                         transition-all duration-300 transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin size="1.5em" />
            </a>
            <a
              href="https://x.com/ConorChepenik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gold-400 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]
                         transition-all duration-300 transform hover:scale-110"
              aria-label="X (Twitter)"
            >
              <FaXTwitter size="1.5em" />
            </a>
            <a
              href="https://github.com/Chepenik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-neon-magenta hover:drop-shadow-[0_0_8px_rgba(255,0,255,0.6)]
                         transition-all duration-300 transform hover:scale-110"
              aria-label="GitHub"
            >
              <FaGithub size="1.5em" />
            </a>
            <a
              href="https://www.youtube.com/@ConorChepenik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-laser hover:drop-shadow-[0_0_8px_rgba(255,7,58,0.6)]
                         transition-all duration-300 transform hover:scale-110"
              aria-label="YouTube"
            >
              <FaYoutube size="1.5em" />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-neon-cyan transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <span className="text-gray-700">&middot;</span>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-neon-cyan transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 mb-6 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

        {/* Built with credit */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Built with <span className="text-laser drop-shadow-[0_0_8px_rgba(255,7,58,0.8)]">&#10084;</span> and{' '}
            <span className="text-bitcoin drop-shadow-[0_0_8px_rgba(247,147,26,0.8)]">&#8383;</span>
          </p>
        </div>
      </div>

      <ZapModal isOpen={isZapModalOpen} onClose={() => setZapModalOpen(false)} />
    </footer>
  );
}
