// 'use client';

// import React, { useState } from 'react';
// import { createCheckoutSession } from '../utils/stripe';

// interface StripeCheckoutProps {
//   priceId: string;
//   buttonText?: string;
//   className?: string;
// }

// export function StripeCheckout({ 
//   priceId, 
//   buttonText = "Subscribe Now", 
//   className = "" 
// }: StripeCheckoutProps) {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleCheckout = async () => {
//     setIsLoading(true);
//     try {
//       await createCheckoutSession(priceId);
//     } catch (error) {
//       console.error('Checkout failed:', error);
//       alert('Checkout failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleCheckout}
//       disabled={isLoading}
//       className={`bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors ${className}`}
//     >
//       {isLoading ? 'Processing...' : buttonText}
//     </button>
//   );
// }

// Placeholder component for when Stripe is disabled
export function StripeCheckout({ 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  priceId: _priceId, 
  buttonText = "Subscribe Now", 
  className = "" 
}: {
  priceId: string;
  buttonText?: string;
  className?: string;
}) {
  return (
    <div className={`text-center p-4 bg-slate-100 rounded-lg border border-slate-300 ${className}`}>
      <p className="text-slate-600 font-medium">
        {buttonText} (Temporarily Disabled)
      </p>
      <p className="text-sm text-slate-500 mt-1">
        Check back soon for updates!
      </p>
    </div>
  );
} 