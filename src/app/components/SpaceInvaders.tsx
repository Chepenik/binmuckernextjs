"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

const SpaceInvaders: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Start or restart the game
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setLevel(1);
    setIsPaused(false);
    setGameWon(false);
  };

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const createConfetti = useCallback(() => {
    if (!canvasRef.current) return;
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const preventArrowScroll = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", preventArrowScroll);
    return () => {
      window.removeEventListener("keydown", preventArrowScroll);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        const maxWidth = Math.min(800, container.clientWidth - 20);
        canvas.width = maxWidth;
        canvas.height = Math.floor(maxWidth * 0.75);
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    let playerX = canvas.width / 2 - 25;
    const playerWidth = 50;
    const playerHeight = 20;
    const bullets: { x: number; y: number }[] = [];
    const enemyBullets: { x: number; y: number }[] = [];
    const invaders: { x: number; y: number; alive: boolean; type: number }[] = [];
    const stars: { x: number; y: number; size: number; speed: number }[] = [];
    const explosions: { x: number; y: number; radius: number; alpha: number }[] = [];
    const confetti: { x: number; y: number; size: number; color: string; speed: number; angle: number }[] = [];
    let isGameOver = false;
    let isWin = false;
    const invaderRows = 3 + Math.floor(level / 2);
    const invaderCols = 8;
    const invaderSize = 30;
    let invaderDirection = 1;
    let invaderSpeed = 1 + (level * 0.2);
    const bulletSpeed = 7;
    const enemyBulletSpeed = 3 + (level * 0.3);
    let lastShot = 0;
    const shootCooldown = 300;
    let animationFrame: number;
    let levelAdvancing = false;

    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1
      });
    }

    const createInvaders = () => {
      invaders.length = 0;
      for (let r = 0; r < invaderRows; r++) {
        for (let c = 0; c < invaderCols; c++) {
          invaders.push({
            x: 50 + c * (invaderSize + 20),
            y: 50 + r * (invaderSize + 20),
            alive: true,
            type: r % 3
          });
        }
      }
    };

    createInvaders();

    const drawConfetti = () => {
      while (confetti.length > 150) {
        confetti.shift();
      }
      const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#FFFFFF"];
      if (showConfetti && confetti.length < 150) {
        for (let i = 0; i < 5; i++) {
          confetti.push({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * 100,
            size: Math.random() * 8 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 5 + 2,
            angle: Math.random() * 2 - 1
          });
        }
      }
      for (let i = confetti.length - 1; i >= 0; i--) {
        const particle = confetti[i];
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
        particle.y += particle.speed;
        particle.x += particle.angle;
        if (particle.y > canvas.height) {
          confetti.splice(i, 1);
        }
      }
    };

    const keys: { [key: string]: boolean } = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
      if (e.key === 'p' || e.key === 'P') {
        togglePause();
      }
      if ((e.key === 'Enter' || e.key === ' ') && (gameOver || gameWon || !isPlaying)) {
        startGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const shootBullet = () => {
      const now = Date.now();
      if (now - lastShot > shootCooldown) {
        bullets.push({ x: playerX + playerWidth / 2 - 2, y: canvas.height - playerHeight - 20 });
        lastShot = now;
      }
    };

    const enemyShoot = () => {
      const livingInvaders = invaders.filter(inv => inv.alive);
      if (livingInvaders.length === 0) return;
      const shooter = livingInvaders[Math.floor(Math.random() * livingInvaders.length)];
      enemyBullets.push({ 
        x: shooter.x + invaderSize / 2, 
        y: shooter.y + invaderSize 
      });
    };

    const shootInterval = setInterval(() => {
      if (isPlaying && !isPaused && !isGameOver && !isWin) {
        if (Math.random() < 0.1 + (level * 0.02)) {
          enemyShoot();
        }
      }
    }, 1000);

    const createExplosion = (x: number, y: number) => {
      explosions.push({
        x,
        y,
        radius: 5,
        alpha: 1
      });
    };

    const drawPlayerShip = (x: number, y: number, width: number, height: number) => {
      ctx.fillStyle = "#00FF00";
      ctx.beginPath();
      ctx.moveTo(x + width / 2, y);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x + width, y + height);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(x + width / 2 - 2, y + height - 8, 4, 8);
    };

    const drawInvader = (x: number, y: number, size: number, type: number) => {
      const colors = ["#FF00FF", "#00FFFF", "#FFFF00"];
      ctx.fillStyle = colors[type];
      if (type === 0) {
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = "#000";
        ctx.fillRect(x + size * 0.2, y + size * 0.3, size * 0.2, size * 0.2);
        ctx.fillRect(x + size * 0.6, y + size * 0.3, size * 0.2, size * 0.2);
      } else if (type === 1) {
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(x + size * 0.3, y + size * 0.4, size * 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + size * 0.7, y + size * 0.4, size * 0.1, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(x + size / 2, y);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x + size, y + size);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.fillRect(x + size * 0.3, y + size * 0.5, size * 0.1, size * 0.1);
        ctx.fillRect(x + size * 0.6, y + size * 0.5, size * 0.1, size * 0.1);
      }
    };

    const gameLoop = () => {
      if (!ctx || !isPlaying) return;
      ctx.fillStyle = "#000033";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      stars.forEach(star => {
        ctx.fillRect(star.x, star.y, star.size, star.size);
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      if (showConfetti) {
        drawConfetti();
      }
      if (!isPaused && !isGameOver && !isWin) {
        if (keys["ArrowLeft"] && playerX > 0) playerX -= 5;
        if (keys["ArrowRight"] && playerX < canvas.width - playerWidth) playerX += 5;
        if (keys[" "] || keys["ArrowUp"]) shootBullet();
        drawPlayerShip(playerX, canvas.height - playerHeight - 10, playerWidth, playerHeight);
        for (let i = bullets.length - 1; i >= 0; i--) {
          bullets[i].y -= bulletSpeed;
          if (bullets[i].y < 0) {
            bullets.splice(i, 1);
          }
        }
        for (let i = enemyBullets.length - 1; i >= 0; i--) {
          enemyBullets[i].y += enemyBulletSpeed;
          if (enemyBullets[i].y > canvas.height) {
            enemyBullets.splice(i, 1);
            continue;
          }
          if (
            enemyBullets[i].x >= playerX &&
            enemyBullets[i].x <= playerX + playerWidth &&
            enemyBullets[i].y >= canvas.height - playerHeight - 10 &&
            enemyBullets[i].y <= canvas.height - 10
          ) {
            enemyBullets.splice(i, 1);
            setLives(prev => {
              const newLives = prev <= 1 ? 0 : prev - 1;
              if (newLives === 0) {
                isGameOver = true;
                setGameOver(true);
              }
              return newLives;
            });
            createExplosion(playerX + playerWidth / 2, canvas.height - playerHeight - 5);
          }
        }
        ctx.fillStyle = "#FF0000";
        bullets.forEach((bullet) => {
          ctx.fillRect(bullet.x, bullet.y, 4, 10);
        });
        ctx.fillStyle = "#FFFF00";
        enemyBullets.forEach((bullet) => {
          ctx.fillRect(bullet.x, bullet.y, 4, 10);
        });
        let moveDown = false;
        invaders.forEach((invader) => {
          if (!invader.alive) return;
          invader.x += invaderSpeed * invaderDirection;
          if (invader.x <= 10 || invader.x >= canvas.width - invaderSize - 10) {
            moveDown = true;
          }
        });
        if (moveDown) {
          invaderDirection *= -1;
          invaders.forEach((invader) => {
            if (invader.alive) {
              invader.y += 20;
              if (invader.y + invaderSize >= canvas.height - playerHeight - 10) {
                isGameOver = true;
                setGameOver(true);
              }
            }
          });
        }
        invaders.forEach((invader) => {
          if (!invader.alive) return;
          drawInvader(invader.x, invader.y, invaderSize, invader.type);
        });
        for (let i = bullets.length - 1; i >= 0; i--) {
          const bullet = bullets[i];
          let bulletHit = false;
          for (let j = 0; j < invaders.length; j++) {
            const invader = invaders[j];
            if (
              invader.alive &&
              bullet.x >= invader.x &&
              bullet.x <= invader.x + invaderSize &&
              bullet.y >= invader.y &&
              bullet.y <= invader.y + invaderSize
            ) {
              invader.alive = false;
              bulletHit = true;
              const points = (3 - invader.type) * 10;
              setScore(prev => prev + points);
              createExplosion(invader.x + invaderSize / 2, invader.y + invaderSize / 2);
              break;
            }
          }
          if (bulletHit) {
            bullets.splice(i, 1);
          }
        }
        for (let i = explosions.length - 1; i >= 0; i--) {
          const explosion = explosions[i];
          ctx.beginPath();
          ctx.globalAlpha = explosion.alpha;
          ctx.fillStyle = "#FF6600";
          ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#FFFF00";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(explosion.x, explosion.y, explosion.radius + 3, 0, Math.PI * 2);
          ctx.stroke();
          explosion.radius += 1;
          explosion.alpha -= 0.05;
          if (explosion.alpha <= 0) {
            explosions.splice(i, 1);
          }
        }
        ctx.globalAlpha = 1;
        const aliveInvaders = invaders.filter(invader => invader.alive);
        if (aliveInvaders.length === 0 && invaders.length > 0 && !levelAdvancing) {
          console.log("All invaders dead, advancing level");
          levelAdvancing = true;
          setTimeout(() => {
            if (level >= 5) {
              isWin = true;
              setGameWon(true);
            } else {
              setLevel(prev => prev + 1);
              invaderSpeed += 0.2;
              createInvaders();
              createConfetti();
              levelAdvancing = false;
            }
          }, 1000);
        }
      }
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.fillText(`Score: ${score}`, 10, 20);
      ctx.fillText(`Lives: ${lives}`, 10, 40);
      ctx.fillText(`Level: ${level}`, 10, 60);
      if (isGameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2 - 20);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2 - 70, canvas.height / 2 + 20);
        ctx.fillText("Press ENTER to play again", canvas.width / 2 - 120, canvas.height / 2 + 60);
      }
      if (isWin) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00FF00";
        ctx.font = "30px Arial";
        ctx.fillText("Congratulations!", canvas.width / 2 - 100, canvas.height / 2 - 40);
        ctx.fillText("You Won The Game!", canvas.width / 2 - 120, canvas.height / 2);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2 - 70, canvas.height / 2 + 40);
        ctx.fillText("Press ENTER to play again", canvas.width / 2 - 120, canvas.height / 2 + 80);
        if (!showConfetti) {
          setShowConfetti(true);
        }
      }
      if (isPaused && !isGameOver && !isWin) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("PAUSED", canvas.width / 2 - 60, canvas.height / 2);
        ctx.font = "16px Arial";
        ctx.fillText("Press P to resume", canvas.width / 2 - 70, canvas.height / 2 + 30);
      }
      animationFrame = requestAnimationFrame(gameLoop);
    };

    if (isPlaying) {
      gameLoop();
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", updateCanvasSize);
      clearInterval(shootInterval);
      cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying, isPaused, level, gameOver, gameWon, showConfetti, lives, togglePause, createConfetti]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-white mb-2">Space Invaders</h2>
      {!isPlaying && !gameOver && !gameWon ? (
        <div className="text-center mb-4">
          <p className="text-white mb-4">Use arrow keys to move, space to shoot, P to pause</p>
          <button 
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Start Game
          </button>
        </div>
      ) : null}
      <canvas ref={canvasRef} className="bg-black border-2 border-gray-700 rounded-lg shadow-lg"></canvas>
      <div className="text-white mt-4 text-center">
        <p>Controls: Arrow keys to move, Space to shoot, P to pause</p>
        {level >= 5 && isPlaying ? (
          <p className="text-yellow-300 font-bold mt-2">Final Level! Defeat all aliens to win!</p>
        ) : null}
      </div>
    </div>
  );
};

export default SpaceInvaders;