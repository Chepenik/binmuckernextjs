'use client';

import React from 'react';
import { FaLinkedin, FaTwitter, FaFeatherAlt } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-transparent text-black border-t border-gray-200 py-6 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} binmucker. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors"
          >
            <FaLinkedin size="1.5em" />
          </a>
          <a
            href="https://x.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors"
          >
            <FaTwitter size="1.5em" />
          </a>
          <a
            href="https://nostr.directory/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors"
          >
            <FaFeatherAlt size="1.5em" />
          </a>
        </div>
      </div>
    </footer>
  );
}
