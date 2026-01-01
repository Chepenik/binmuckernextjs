"use client";

import SpaceInvaders from "@/app/components/SpaceInvaders";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SpaceInvadersPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cyber-black bg-mesh-gradient p-4">
      {/* Back button */}
      <Link
        href="/"
        className="fixed top-6 left-6 text-gray-400 hover:text-gold-400 transition-colors
                   flex items-center gap-2 z-10"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">Back</span>
      </Link>

      {/* Title with neon glow */}
      <h1 className="text-4xl font-display font-bold text-gradient-neon text-glow-cyan mb-6">
        Space Invaders
      </h1>

      {/* Game container */}
      <div className="max-w-4xl w-full glass rounded-2xl p-6 border border-neon-cyan/30 shadow-neon-cyan">
        <SpaceInvaders />
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center max-w-2xl">
        <h2 className="text-2xl font-display font-semibold text-gold-400 mb-4">
          How to Play
        </h2>
        <p className="text-gray-400 mb-6">
          Defend Earth through 5 increasingly difficult levels!
          The aliens get faster and more numerous with each level.
          Can you save humanity?
        </p>
        <ul className="text-left text-gray-300 space-y-3 max-w-md mx-auto">
          <li className="flex items-center gap-3">
            <span className="text-neon-cyan">&#9670;</span>
            Use <kbd className="px-2 py-1 bg-cyber-700 rounded text-gold-400 text-sm mx-1">&#8592; &#8594;</kbd> to move
          </li>
          <li className="flex items-center gap-3">
            <span className="text-neon-cyan">&#9670;</span>
            Press <kbd className="px-2 py-1 bg-cyber-700 rounded text-gold-400 text-sm mx-1">Space</kbd> or <kbd className="px-2 py-1 bg-cyber-700 rounded text-gold-400 text-sm mx-1">&#8593;</kbd> to shoot
          </li>
          <li className="flex items-center gap-3">
            <span className="text-neon-cyan">&#9670;</span>
            Press <kbd className="px-2 py-1 bg-cyber-700 rounded text-gold-400 text-sm mx-1">P</kbd> to pause
          </li>
          <li className="flex items-center gap-3">
            <span className="text-neon-cyan">&#9670;</span>
            Destroy all aliens to advance
          </li>
        </ul>
        <p className="text-sm italic text-gray-500 mt-6">
          Remember: In space, no one can hear you rage-quit.
        </p>
      </div>

      <div className="mt-8">
        <Link href="/" className="btn-gold-outline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
