'use client';

import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // X (Twitter) logo

export function Footer() {
  return (
    <footer className="bg-transparent text-black border-t border-gray-200 py-6 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} binmucker. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a
            href="https://www.linkedin.com/in/conorchepenik/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0077B5] transition-colors"
          >
            <FaLinkedin size="1.5em" />
          </a>
          <a
            href="https://x.com/ConorChepenik"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1DA1F2] transition-colors"
          >
            <FaXTwitter size="1.5em" />
          </a>
          <a
            href="https://github.com/Chepenik"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#171515] transition-colors"
          >
            <FaGithub size="1.5em" />
          </a>
        </div>
      </div>
    </footer>
  );
}
