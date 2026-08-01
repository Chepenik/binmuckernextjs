'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Projects', href: '/#directory' },
  { label: 'Writing', href: '/blog' },
  { label: 'Daily desk', href: '/#desk' },
  { label: 'Stack', href: '/stack' },
  { label: 'About', href: '/about' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary navigation">
        <Link href="/" className="site-brand" aria-label="Binmucker home">
          <Image src="/binmuckerlogo.png" alt="" width={38} height={38} priority />
          <span><strong>Binmucker</strong><small>Conor Chepenik</small></span>
        </Link>

        <div className="site-nav-links">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </div>

        <Link href="/audit" className="site-nav-cta">Free audit</Link>

        <button
          type="button"
          className="site-menu-button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {isOpen && (
        <div id="mobile-navigation" className="site-mobile-nav">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>{link.label}</Link>
          ))}
          <Link href="/audit" className="site-mobile-cta" onClick={() => setIsOpen(false)}>Run the free audit</Link>
        </div>
      )}
    </header>
  );
}
