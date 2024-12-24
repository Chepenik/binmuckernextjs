import React from 'react';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-teal-400 to-cyan-300 p-6 text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Thank You!</h1>
        <p className="text-lg text-gray-800 mb-6">Your message has been sent successfully. I appreciate you reaching out and will get back to you as soon as possible!</p>
        <p className="text-md text-gray-700 mb-8">In the meantime, feel free to explore more of my website or connect with me on social media.</p>
        <div className="space-y-4">
          <Link href="/" className="block bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition">Back to Home</Link>
          <Link href="/contact" className="block bg-cyan-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-cyan-600 transition">Send Another Message</Link>
        </div>
      </div>
      <footer className="mt-12 text-gray-700 text-sm">Built with ❤️ by Chep</footer>
    </section>
  );
}
