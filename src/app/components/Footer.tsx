'use client';

import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-cyber-black border-t border-gold-500/20 py-10">
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright with gradient */}
          <p className="text-gray-500 text-sm">
            <span className="text-gold-500">&copy;</span> {year}{' '}
            <span className="text-gradient-gold font-semibold">binmucker</span>
            . All rights reserved.
          </p>

          {/* Social Links with neon hover */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/conorchepenik/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-neon-cyan hover:shadow-neon-cyan
                         transition-all duration-300 transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin size="1.5em" />
            </a>
            <a
              href="https://x.com/ConorChepenik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gold-400 hover:shadow-neon-gold
                         transition-all duration-300 transform hover:scale-110"
              aria-label="X (Twitter)"
            >
              <FaXTwitter size="1.5em" />
            </a>
            <a
              href="https://github.com/Chepenik"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-neon-magenta hover:shadow-neon-magenta
                         transition-all duration-300 transform hover:scale-110"
              aria-label="GitHub"
            >
              <FaGithub size="1.5em" />
            </a>
          </div>
        </div>

        {/* Built with credit */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            Built with <span className="text-laser">&#10084;</span> and{' '}
            <span className="text-bitcoin">&#8383;</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
