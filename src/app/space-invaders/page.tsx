"use client";

import SpaceInvaders from "@/app/components/SpaceInvaders";
import Link from "next/link";

export default function SpaceInvadersPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1e3a8a] to-[#2563eb] text-white p-4">
      <h1 className="text-4xl font-bold mb-6">Space Invaders</h1>
      
      <div className="max-w-4xl w-full bg-black/30 p-6 rounded-lg shadow-lg">
        <SpaceInvaders />
      </div>
      
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">How to Play</h2>
        <p className="mb-4 text-yellow-300">
          Defend Earth through 5 increasingly difficult levels! 
          The aliens get faster and more numerous with each level. 
          Can you save humanity? (No pressure...)
        </p>
        <ul className="list-disc list-inside text-left max-w-md mx-auto mb-4">
          <li>Use <span className="font-bold">Left/Right Arrow Keys</span> to move your ship</li>
          <li>Press <span className="font-bold">Space</span> or <span className="font-bold">Up Arrow</span> to shoot</li>
          <li>Press <span className="font-bold">P</span> to pause the game</li>
          <li>Destroy all aliens to advance to the next level</li>
          <li>Watch out for enemy bullets! They&apos;re not sending their best...</li>
        </ul>
        <p className="text-sm italic text-gray-300">
          Remember: In space, no one can hear you rage-quit.
        </p>
      </div>
      
      <div className="mt-6 flex gap-4">
        <Link 
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
