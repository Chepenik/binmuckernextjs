'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-md mx-auto text-center p-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your subscription! Your recurring donation has been set up successfully.
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
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
} 