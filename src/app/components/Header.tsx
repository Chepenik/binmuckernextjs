'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useCycle } from 'framer-motion';
import MenuToggle from './MenuToggle';
import ZapModal from './ZapModal';

export function Header() {
  const links = ['Home', 'Game', 'Zap Me'];

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
    sticky top-0 bg-transparent text-black z-50
    transition-transform duration-300 shadow-md
    ${showHeader ? 'translate-y-0' : '-translate-y-full'}
  `;

  return (
    <>
      <motion.header className={headerStyling}>
        <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between h-[80px]">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Image
              src="/binmuckerlogo.png"
              alt="binmucker logo"
              width={64}
              height={64}
              className="rounded-md"
              priority
            />
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
                  className="font-semibold hover:underline"
                >
                  {link}
                </button>
              ) : (
                <Link
                  key={link}
                  href={link === 'Home' ? '/' : link === 'Game' ? '/space-invaders' : `/${link.toLowerCase()}`}
                  className="font-semibold hover:underline"
                >
                  {link}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="border border-black px-4 py-2 rounded-full text-black hover:bg-black hover:text-white transition"
            >
              Get in Touch
            </Link>
          </div>
        </nav>

        {isOpen && (
          <motion.div
            className="md:hidden absolute top-[80px] left-0 w-full bg-white text-black shadow-md 
                       flex flex-col items-start px-4 pt-4 pb-6 space-y-4 z-50"
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
                  className="text-lg font-semibold hover:underline"
                >
                  {link}
                </button>
              ) : (
                <Link
                  key={link}
                  href={link === 'Home' ? '/' : link === 'Game' ? '/space-invaders' : `/${link.toLowerCase()}`}
                  className="text-lg font-semibold"
                  onClick={() => toggleOpen()}
                >
                  {link}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="border border-black px-4 py-2 rounded-full text-black hover:bg-black hover:text-white transition"
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
