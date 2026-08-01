import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <strong>Binmucker</strong>
          <p>Small useful things, shipped in public.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/blog">Writing</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
        <p className="site-copyright">© {new Date().getFullYear()} Binmucker LLC</p>
      </div>
    </footer>
  );
}
