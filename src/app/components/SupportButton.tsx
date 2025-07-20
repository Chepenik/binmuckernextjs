'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import { Heart, Sparkles, Zap } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function SupportButton({ priceId }: { priceId: string }) {
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{left: string, top: string, animationDelay: string, animationDuration: string}>>([]);

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const particleData = [...Array(6)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${2 + Math.random() * 2}s`
    }));
    setParticles(particleData);
  }, []);

  const handleClick = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error(error.message);
        alert('Checkout failed. Please try again.');
      }
    } catch (error) {
      console.error('Support button error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative group">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
      
      {/* Main button */}
      <button
        onClick={handleClick}
        disabled={loading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative z-10 w-full max-w-md mx-auto
          bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600
          hover:from-purple-700 hover:via-pink-700 hover:to-orange-700
          disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600
          text-white font-bold py-6 px-12 rounded-2xl text-2xl
          transform transition-all duration-300 ease-out
          hover:scale-105 hover:shadow-2xl
          active:scale-95
          disabled:transform-none disabled:cursor-not-allowed
          border-2 border-white/20 hover:border-white/40
          shadow-lg hover:shadow-purple-500/50
          flex items-center justify-center gap-3
          ${isHovered ? 'animate-bounce' : ''}
        `}
      >
        {/* Sparkle effects */}
        {isHovered && (
          <>
            <Sparkles className="absolute -top-2 -left-2 text-yellow-300 animate-ping" size={16} />
            <Sparkles className="absolute -top-2 -right-2 text-yellow-300 animate-ping" size={16} style={{ animationDelay: '0.2s' }} />
            <Sparkles className="absolute -bottom-2 -left-4 text-yellow-300 animate-ping" size={16} style={{ animationDelay: '0.4s' }} />
            <Sparkles className="absolute -bottom-2 -right-4 text-yellow-300 animate-ping" size={16} style={{ animationDelay: '0.6s' }} />
          </>
        )}
        
        {/* Button content */}
        <div className="flex items-center gap-3">
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Heart className={`text-red-300 ${isHovered ? 'animate-pulse' : ''}`} size={28} />
              <span className="relative">
                Support My Work
                {/* Glowing text effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Support My Work
                </span>
              </span>
              <Zap className={`text-yellow-300 ${isHovered ? 'animate-pulse' : ''}`} size={28} />
            </>
          )}
        </div>
        
        {/* Ripple effect on click */}
        {loading && (
          <div className="absolute inset-0 rounded-2xl bg-white/20 animate-ping"></div>
        )}
      </button>
      
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-60 animate-pulse"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration
            }}
          />
        ))}
      </div>
    </div>
  );
} 