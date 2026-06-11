'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-cyber-black bg-mesh-gradient p-6 text-center">
      <motion.div
        className="max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Success icon */}
        <motion.div
          className="w-20 h-20 mx-auto mb-6 rounded-full
                     bg-gradient-to-br from-neon-green to-neon-cyan
                     flex items-center justify-center shadow-neon-green"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <CheckCircle className="w-10 h-10 text-cyber-black" />
        </motion.div>

        <h1 className="text-5xl font-display font-bold text-gradient-gold mb-6">
          Thank You!
        </h1>
        <p className="text-lg text-gray-300 mb-4">
          Your request has been sent.
        </p>
        <p className="text-gray-500 mb-8">
          I&apos;ll review your details and email your calendar invite &mdash; usually within a
          day. Want to make the call more productive? Run the free audit while you wait.
        </p>

        <div className="space-y-4">
          <Link href="/audit" className="block btn-premium py-3">
            Run the free audit
          </Link>
          <Link href="/" className="block btn-neon py-3">
            Back to Home
          </Link>
        </div>
      </motion.div>

      <footer className="mt-12 text-gray-600 text-sm">
        Built with <span className="text-laser">&#10084;</span> by Chep
      </footer>
    </section>
  );
}
