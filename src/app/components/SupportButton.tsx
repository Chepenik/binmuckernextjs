// 'use client';

// import React, { useState } from 'react';
// import { Heart, Coffee, Star } from 'lucide-react';
// import { createCheckoutSession } from '@/app/utils/stripe';

// interface SupportButtonProps {
//   priceId: string;
// }

// export default function SupportButton({ priceId }: SupportButtonProps) {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSupport = async () => {
//     setIsLoading(true);
//     try {
//       await createCheckoutSession(priceId);
//     } catch (error) {
//       console.error('Support error:', error);
//       alert('Something went wrong. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleSupport}
//       disabled={isLoading}
//       className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//     >
//       <div className="flex items-center gap-3">
//         <div className="flex items-center gap-1">
//           <Heart className="w-5 h-5" />
//           <Coffee className="w-5 h-5" />
//           <Star className="w-5 h-5" />
//         </div>
//         <span>
//           {isLoading ? 'Processing...' : 'Support My Work'}
//         </span>
//       </div>
//       <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-orange-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//     </button>
//   );
// }

// Placeholder component for when Stripe is disabled
export default function SupportButton({ 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  priceId: _priceId 
}: { 
  priceId: string 
}) {
  return (
    <div className="text-center p-6 bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl border border-slate-300">
      <p className="text-slate-600 font-medium">
        Support feature temporarily disabled
      </p>
      <p className="text-sm text-slate-500 mt-2">
        Check back soon for updates!
      </p>
    </div>
  );
} 