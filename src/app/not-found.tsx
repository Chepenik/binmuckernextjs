'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function NotFoundPage() {
  // Game states
  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30-second timer
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Grid settings
  const rows = 5;
  const cols = 5;
  const totalSquares = rows * cols;

  // Start Game
  const startGame = () => {
    setIsGameActive(true);
    setScore(0);
    setTimeLeft(30);
    setActiveIndex(null);
  };

  // Timer countdown
  useEffect(() => {
    if (!isGameActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameActive, timeLeft]);

  // Randomly pick an active square every 800ms or so
  useEffect(() => {
    if (!isGameActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * totalSquares);
      setActiveIndex(randomIndex);
    }, 800);

    return () => clearInterval(interval);
  }, [isGameActive, timeLeft, totalSquares]);

  // When time runs out, end the game
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsGameActive(false);
      setActiveIndex(null);
      alert("Time's up! Your final score: " + score);
    }
  }, [timeLeft, score]);

  // Handle square click
  const handleSquareClick = (index: number) => {
    if (!isGameActive) return;
    // Only score if user clicks the "active" square
    if (index === activeIndex) {
      setScore((prev) => prev + 1);
      setActiveIndex(null);
    }
  };

  return (
    <div
      className="
        min-h-screen flex flex-col items-center justify-center
        bg-white
        p-6 text-gray-800 text-center
      "
    >
      <h1 className="text-6xl font-black mb-4 drop-shadow-lg">404 - Oops, You&apos;re Lost!</h1>
      <p className="text-lg md:text-2xl max-w-xl mb-8">
        The page you&apos;re looking for doesn&apos;t exist (yet).  
        You can{' '}
        <Link href="/" className="underline font-bold hover:text-gray-600">
          head home
        </Link>{' '}
        or play a quick game below while you&apos;re here.
      </p>

      {/* Game Start / Restart */}
      {!isGameActive && (
        <button
          onClick={startGame}
          className="
            bg-gray-700 hover:bg-gray-800 text-white
            font-semibold py-2 px-4 rounded-lg mb-6
            transition-colors
          "
        >
          {score === 0 ? 'Play Whack-a-Gold!' : 'Play Again'}
        </button>
      )}

      {isGameActive && (
        <p className="mb-4 text-xl">
          Click the gold square before it disappears!  
          Score: {score} | Time Left: {timeLeft}
        </p>
      )}

      {/* Game Grid */}
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${rows}, 60px)`,
          gridTemplateColumns: `repeat(${cols}, 60px)`,
          gap: '8px',
        }}
      >
        {Array.from({ length: totalSquares }).map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={index}
              onClick={() => handleSquareClick(index)}
              className={`
                flex items-center justify-center
                w-[60px] h-[60px]
                rounded-lg cursor-pointer
                transition-colors
                ${
                  isActive
                    ? 'bg-[#BF9B30] hover:bg-[#85BB65] text-black'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }
              `}
            >
              {isActive ? '💰' : ''}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm md:text-base opacity-90">
        <p>
          Built with{' '}
          <span role="img" aria-label="heart">
            ❤️
          </span>{' '}
          by{' '}
          <Link href="/" className="underline font-bold hover:text-[#BF9B30]">
            The Binmucker
          </Link>{' '}
        </p>
      </footer>
    </div>
  );
}
