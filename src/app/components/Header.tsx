'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useCycle } from 'framer-motion';
import MenuToggle from './MenuToggle';

export function Header() {
  const links = ['Audit', 'Stack', 'Blog', 'About'];

  const [isOpen, toggleOpen] = useCycle(false, true);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

          <div className="hidden md:flex items-center space-x-7">
            {links.map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className={`relative text-[13px] font-medium uppercase tracking-[0.18em] hover:text-gold-400
                           transition-colors duration-300 group py-2
                           ${link === 'Audit' ? 'text-neon-cyan' : 'text-gray-300'}`}
              >
                <span className="relative z-10">{link}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5
                                 bg-gradient-to-r from-neon-cyan to-gold-400
                                 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
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
            {links.map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className={`text-base font-medium uppercase tracking-[0.16em]
                           hover:text-gold-400 transition-colors duration-300
                           ${link === 'Audit' ? 'text-neon-cyan' : 'text-gray-300'}`}
                onClick={() => toggleOpen()}
              >
                {link}
              </Link>
            ))}
          </motion.div>
        )}
      </motion.header>
    </>
  );
}
