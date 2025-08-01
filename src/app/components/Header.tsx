'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useCycle } from 'framer-motion';
import MenuToggle from './MenuToggle';
import ZapModal from './ZapModal';

export function Header() {
  const links = ['Game', 'Zap Me'];

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
    sticky top-0 bg-gradient-to-r from-cyan-500 via-teal-500 to-orange-400 text-white z-50
    transition-transform duration-300 shadow-2xl border-b-2 border-orange-300/30
    ${showHeader ? 'translate-y-0' : '-translate-y-full'}
  `;

  return (
    <>
      <motion.header className={headerStyling}>
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-teal-600/20 to-orange-500/20 animate-pulse"></div>
        
        <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between h-[80px] relative z-10">
          <Link href="/" className="hover:opacity-90 transition-opacity group">
            <div className="relative">
              <Image
                src="/binmuckerlogo.png"
                alt="binmucker logo"
                width={64}
                height={64}
                className="rounded-md shadow-lg group-hover:shadow-orange-300/50 transition-shadow"
                priority
              />
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-orange-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </Link>

          <div className="md:hidden">
            <MenuToggle toggle={() => toggleOpen()} />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) =>
              link === 'Zap Me' ? (
                <button
                  key={link}
                  onClick={() => setZapModalOpen(true)}
                  className="font-bold text-white hover:text-orange-200 transition-colors duration-300 relative group"
                >
                  <span className="relative z-10">{link}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-cyan-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              ) : (
                <Link
                  key={link}
                  href={link === 'Game' ? '/space-invaders' : `/${link.toLowerCase()}`}
                  className="font-bold text-white hover:text-orange-200 transition-colors duration-300 relative group"
                >
                  <span className="relative z-10">{link}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-cyan-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="border-2 border-orange-300 px-6 py-3 rounded-full text-white font-bold hover:bg-gradient-to-r hover:from-orange-400 hover:to-cyan-400 hover:border-transparent transition-all duration-300 shadow-lg hover:shadow-orange-300/50 transform hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>
        </nav>

        {isOpen && (
          <motion.div
            className="md:hidden absolute top-[80px] left-0 w-full bg-gradient-to-br from-cyan-500 via-teal-500 to-orange-400 text-white shadow-2xl 
                       flex flex-col items-start px-4 pt-4 pb-6 space-y-4 z-50 border-b-2 border-orange-300/30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link) =>
              link === 'Zap Me' ? (
                <button
                  key={link}
                  onClick={() => {
                    setZapModalOpen(true);
                    toggleOpen(0);
                  }}
                  className="text-lg font-bold hover:text-orange-200 transition-colors duration-300"
                >
                  {link}
                </button>
              ) : (
                <Link
                  key={link}
                  href={link === 'Game' ? '/space-invaders' : `/${link.toLowerCase()}`}
                  className="text-lg font-bold hover:text-orange-200 transition-colors duration-300"
                  onClick={() => toggleOpen()}
                >
                  {link}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="border-2 border-orange-300 px-6 py-3 rounded-full text-white font-bold hover:bg-gradient-to-r hover:from-orange-400 hover:to-cyan-400 hover:border-transparent transition-all duration-300 shadow-lg hover:shadow-orange-300/50 transform hover:scale-105"
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
