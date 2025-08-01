'use client';

import React from 'react';
import { Copy, ExternalLink, X } from 'lucide-react';

interface ZapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ZapModal: React.FC<ZapModalProps> = ({ isOpen, onClose }) => {
  const btcAddress = 'bc1qfkpu72e6h58puah8m8cmjxhms4swdauzm30naglgm7au4n7ae24s6wvq2w';
  const lightningAddress = 'https://strike.me/chepenik/';

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('BTC Address copied to clipboard');
      })
      .catch((error) => {
        console.error('Failed to copy BTC Address', error);
      });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-gray-800 rounded-xl shadow-2xl max-w-md w-full relative overflow-hidden text-white">
        <button
          className="absolute top-2 right-2 text-gray-300 hover:text-white"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center pt-6">
          Support The Binmucker
        </h2>

        <div className="px-6 pb-6">
          <a
            href={lightningAddress}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-yellow-300 text-black py-3 px-4 rounded-lg font-bold hover:bg-yellow-400 transition duration-300 mb-4"
          >
            ⚡ Pay with Lightning <ExternalLink size={20} className="ml-2" />
          </a>

          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Bitcoin Address</h3>
            <div className="mb-4 p-4 bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-300 break-all font-mono">{btcAddress}</p>
            </div>
            <button
              className="inline-flex items-center justify-center bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
              onClick={() => copyToClipboard(btcAddress)}
            >
              Copy BTC Address <Copy size={20} className="ml-2" />
            </button>
          </div>

          <p className="text-center text-gray-300 font-medium mt-6">
            Thank you for supporting the Binmucker! 🙏
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZapModal;
