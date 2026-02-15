'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useCycle } from 'framer-motion';
import MenuToggle from './MenuToggle';
import ZapModal from './ZapModal';

export function Header() {
  const links = ['About', 'Blog', 'Game', 'Breathe', 'Merch', 'Zap Me'];

  const [isOpen, toggleOpen] = useCycle(false, true);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isZapModalOpen, setZapModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(lastScrollY > currentScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);

      if (isOpen && currentScrollY > 10) {
        toggleOpen(0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isOpen, toggleOpen]);

  const headerStyling = `
    sticky top-0 z-50
    bg-cyber-black/80 backdrop-blur-xl
    border-b border-gold-500/20
    transition-all duration-500
    ${showHeader ? 'translate-y-0' : '-translate-y-full'}
  `;

  return (
    <>
      <motion.header className={headerStyling}>
        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 bg-mesh-gradient opacity-50 pointer-events-none" />

        {/* Sharp accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

        <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between h-[80px] relative z-10">
          <Link href="/" className="hover:opacity-90 transition-opacity group">
            <div className="relative">
              <Image
                src="/binmuckerlogo.png"
                alt="binmucker logo"
                width={64}
                height={64}
                className="rounded-lg border border-gold-500/30 shadow-lg
                           group-hover:border-gold-400 group-hover:shadow-neon-gold
                           transition-all duration-300"
                priority
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gold-500/10 to-neon-cyan/10
                              opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>

          <div className="md:hidden">
            <MenuToggle toggle={() => toggleOpen()} isOpen={isOpen} />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) =>
              link === 'Zap Me' ? (
                <button
                  key={link}
                  onClick={() => setZapModalOpen(true)}
                  className="relative font-semibold text-gray-300 hover:text-gold-400
                             transition-colors duration-300 group py-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-lg">&#9889;</span>
                    {link}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5
                                   bg-gradient-to-r from-neon-cyan to-gold-400
                                   group-hover:w-full transition-all duration-300" />
                </button>
              ) : link === 'Merch' ? (
                <a
                  key={link}
                  href="https://chep.creator-spring.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative font-semibold text-gray-300 hover:text-gold-400
                             transition-colors duration-300 group py-2"
                >
                  <span className="relative z-10">{link}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5
                                   bg-gradient-to-r from-neon-cyan to-gold-400
                                   group-hover:w-full transition-all duration-300" />
                </a>
              ) : (
                <Link
                  key={link}
                  href={link === 'Game' ? '/space-invaders' : `/${link.toLowerCase()}`}
                  className="relative font-semibold text-gray-300 hover:text-gold-400
                             transition-colors duration-300 group py-2"
                >
                  <span className="relative z-10">{link}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5
                                   bg-gradient-to-r from-neon-cyan to-gold-400
                                   group-hover:w-full transition-all duration-300" />
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="btn-gold-outline px-6 py-2.5 text-sm"
            >
              Get in Touch
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-[80px] left-0 w-full
                       bg-cyber-black/95 backdrop-blur-xl
                       border-b border-gold-500/20
                       flex flex-col items-start px-6 pt-4 pb-6 space-y-4 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Mobile mesh gradient */}
            <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />

            {links.map((link) =>
              link === 'Zap Me' ? (
                <button
                  key={link}
                  onClick={() => {
                    setZapModalOpen(true);
                    toggleOpen(0);
                  }}
                  className="relative z-10 text-lg font-semibold text-gray-300
                             hover:text-gold-400 transition-colors duration-300
                             flex items-center gap-2"
                >
                  <span className="text-xl">&#9889;</span>
                  {link}
                </button>
              ) : link === 'Merch' ? (
                <a
                  key={link}
                  href="https://chep.creator-spring.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 text-lg font-semibold text-gray-300
                             hover:text-gold-400 transition-colors duration-300"
                  onClick={() => toggleOpen()}
                >
                  {link}
                </a>
              ) : (
                <Link
                  key={link}
                  href={link === 'Game' ? '/space-invaders' : `/${link.toLowerCase()}`}
                  className="relative z-10 text-lg font-semibold text-gray-300
                             hover:text-gold-400 transition-colors duration-300"
                  onClick={() => toggleOpen()}
                >
                  {link}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="relative z-10 btn-gold-outline px-6 py-2.5 text-sm mt-2"
              onClick={() => toggleOpen()}
            >
              Get in Touch
            </Link>
          </motion.div>
        )}
      </motion.header>

      {/* Zap Modal */}
      <ZapModal isOpen={isZapModalOpen} onClose={() => setZapModalOpen(false)} />
    </>
  );
}
