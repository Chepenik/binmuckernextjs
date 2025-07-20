'use client';

import React from 'react';
import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-md mx-auto text-center p-8">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your payment was cancelled. No charges were made to your account.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Return to Home
          </Link>
          <Link
            href="/contact"
            className="block w-full border border-gray-700 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Need Help?
          </Link>
        </div>
      </div>
    </div>
  );
} 