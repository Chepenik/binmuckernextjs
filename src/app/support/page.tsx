'use client';

import React from 'react';
import Link from 'next/link';
import SupportButton from '../components/SupportButton';
import { Coffee, Heart, Star, Zap } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-6">
            Support My Work
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help me continue building awesome tools, creating content, and sharing knowledge with the community!
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <Coffee className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Keep the Coffee Flowing</h3>
            <p className="text-gray-600">Your support helps fuel late-night coding sessions and endless debugging marathons.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">More Free Tools</h3>
            <p className="text-gray-600">I'll build more useful tools and share them with the community for free.</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
            <p className="text-gray-600">Get early access to new features and exclusive content.</p>
          </div>
        </div>

        {/* Support Button Section */}
        <div className="text-center mb-16">
          <div className="bg-white rounded-3xl p-12 shadow-2xl max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Choose Your Support Level
            </h2>
            <p className="text-gray-600 mb-8">
              Every contribution, no matter how small, makes a huge difference in helping me continue this journey.
            </p>
            
            {/* Support Button */}
            <div className="mb-8">
              <SupportButton priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || "price_1YourRecurringPriceId"} />
            </div>
            
            <p className="text-sm text-gray-500">
              💝 Your support means the world to me. Thank you for being part of this journey!
            </p>
          </div>
        </div>

        {/* What You Get */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            What You Get
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-yellow-500" />
                <span className="text-gray-700">Early access to new tools and features</span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-red-500" />
                <span className="text-gray-700">Priority support and feedback</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-purple-500" />
                <span className="text-gray-700">Exclusive behind-the-scenes content</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Coffee className="w-6 h-6 text-orange-500" />
                <span className="text-gray-700">More time to build and create</span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-pink-500" />
                <span className="text-gray-700">Community recognition and thanks</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-blue-500" />
                <span className="text-gray-700">Faster bug fixes and improvements</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 