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
      <div className="mt-8 text-center max-w-3xl">
        <h2 className="text-2xl font-display font-semibold text-gold-400 mb-4">
          How to Play
        </h2>
        <p className="text-gray-400 mb-6">
          Defend Earth through 5 levels or test your skills in Endless Mode!
          Build combos, collect power-ups, and hunt mystery UFOs for massive bonus points!
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          {/* Controls */}
          <div className="glass p-4 rounded-xl border border-neon-cyan/20">
            <h3 className="text-lg font-semibold text-neon-cyan mb-3">Controls</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-cyber-700 rounded text-gold-400 text-xs">&#8592; &#8594;</kbd>
                <span>Move ship</span>
              </li>
              <li className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-cyber-700 rounded text-gold-400 text-xs">Space</kbd>
                <span>Fire weapons</span>
              </li>
              <li className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-cyber-700 rounded text-gold-400 text-xs">P</kbd>
                <span>Pause game</span>
              </li>
            </ul>
          </div>

          {/* Power-ups */}
          <div className="glass p-4 rounded-xl border border-gold-500/20">
            <h3 className="text-lg font-semibold text-gold-400 mb-3">Power-Ups</h3>
            <ul className="text-gray-300 space-y-1 text-sm">
              <li><span className="text-yellow-400">R</span> Rapid Fire - Shoot 3x faster</li>
              <li><span className="text-blue-400">S</span> Spread Shot - 5-way bullets</li>
              <li><span className="text-green-400">O</span> Shield - Block one hit</li>
              <li><span className="text-red-400">B</span> Bomb - Clear all enemies</li>
              <li><span className="text-purple-400">T</span> Slow-Mo - Slow down time</li>
              <li><span className="text-pink-400">P</span> Piercing - Shots go through</li>
              <li><span className="text-yellow-300">2X</span> Double Points</li>
              <li><span className="text-cyan-400">M</span> Magnet - Attract power-ups</li>
            </ul>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="mt-6 glass p-4 rounded-xl border border-purple-500/20">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">Pro Tips</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>&#9733; Chain kills quickly to build combo multipliers up to 15x!</li>
            <li>&#9733; Watch for red UFOs flying across the top - worth up to 300 points!</li>
            <li>&#9733; Diving aliens will chase you - stay mobile!</li>
            <li>&#9733; Boss levels at 3 and 5 have extra-tough enemies</li>
            <li>&#9733; Beat level 5 to unlock bragging rights, then try Endless Mode!</li>
          </ul>
        </div>

        <p className="text-sm italic text-gray-500 mt-6">
          12 achievements to unlock. Can you get them all?
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
