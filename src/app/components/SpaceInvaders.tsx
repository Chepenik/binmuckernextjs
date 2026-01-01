"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

// Types
interface PowerUp {
  x: number;
  y: number;
  type: 'rapidFire' | 'spreadShot' | 'shield' | 'bomb' | 'extraLife';
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  life: number;
  color: string;
}

interface Invader {
  x: number;
  y: number;
  alive: boolean;
  type: number;
  hp: number;
  maxHp: number;
  isBoss: boolean;
  flashTimer: number;
}

// Sound System using Web Audio API
class SoundSystem {
  private audioContext: AudioContext | null = null;
  private initialized = false;

  init() {
    if (this.initialized) return;
    try {
      this.audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      this.initialized = true;
    } catch {
      console.warn('Web Audio API not supported');
    }
  }

  playShoot() {
    if (!this.audioContext) return;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.frequency.setValueAtTime(880, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, this.audioContext.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.1);
  }

  playExplosion() {
    if (!this.audioContext) return;
    const bufferSize = this.audioContext.sampleRate * 0.2;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }
    const source = this.audioContext.createBufferSource();
    const gain = this.audioContext.createGain();
    source.buffer = buffer;
    source.connect(gain);
    gain.connect(this.audioContext.destination);
    gain.gain.setValueAtTime(0.4, this.audioContext.currentTime);
    source.start();
  }

  playPowerUp() {
    if (!this.audioContext) return;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.1);
    osc.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.2);
    gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.2);
  }

  playHit() {
    if (!this.audioContext) return;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.15);
    gain.gain.setValueAtTime(0.4, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.15);
  }

  playLevelUp() {
    if (!this.audioContext) return;
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      osc.connect(gain);
      gain.connect(this.audioContext!.destination);
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, this.audioContext!.currentTime + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.2, this.audioContext!.currentTime + i * 0.1 + 0.05);
      gain.gain.linearRampToValueAtTime(0, this.audioContext!.currentTime + i * 0.1 + 0.2);
      osc.start(this.audioContext!.currentTime + i * 0.1);
      osc.stop(this.audioContext!.currentTime + i * 0.1 + 0.2);
    });
  }

  playGameOver() {
    if (!this.audioContext) return;
    const notes = [400, 350, 300, 250];
    notes.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      osc.connect(gain);
      gain.connect(this.audioContext!.destination);
      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, this.audioContext!.currentTime + i * 0.15);
      gain.gain.linearRampToValueAtTime(0.3, this.audioContext!.currentTime + i * 0.15 + 0.05);
      gain.gain.linearRampToValueAtTime(0, this.audioContext!.currentTime + i * 0.15 + 0.25);
      osc.start(this.audioContext!.currentTime + i * 0.15);
      osc.stop(this.audioContext!.currentTime + i * 0.15 + 0.25);
    });
  }

  playCombo() {
    if (!this.audioContext) return;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.frequency.setValueAtTime(600, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, this.audioContext.currentTime + 0.05);
    gain.gain.setValueAtTime(0.15, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.05);
  }
}

const soundSystem = new SoundSystem();

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
  const [combo, setCombo] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [hasShield, setHasShield] = useState(false);
  const [activePowerUp, setActivePowerUp] = useState<string | null>(null);
  const [powerUpTimer, setPowerUpTimer] = useState(0);

  // Load high score on mount
  useEffect(() => {
    const saved = localStorage.getItem('spaceInvadersHighScore');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  // Save high score when it changes
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('spaceInvadersHighScore', score.toString());
    }
  }, [score, highScore]);

  const startGame = () => {
    soundSystem.init();
    setIsPlaying(true);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setLevel(1);
    setIsPaused(false);
    setGameWon(false);
    setCombo(0);
    setHasShield(false);
    setActivePowerUp(null);
    setPowerUpTimer(0);
  };

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const createConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  // Prevent arrow key scrolling
  useEffect(() => {
    const preventArrowScroll = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", preventArrowScroll);
    return () => window.removeEventListener("keydown", preventArrowScroll);
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

    // Game state
    let playerX = canvas.width / 2 - 25;
    const playerWidth = 50;
    const playerHeight = 20;
    const bullets: { x: number; y: number; angle?: number }[] = [];
    const enemyBullets: { x: number; y: number }[] = [];
    const invaders: Invader[] = [];
    const stars: { x: number; y: number; size: number; speed: number }[] = [];
    const particles: Particle[] = [];
    const powerUps: PowerUp[] = [];
    const floatingTexts: FloatingText[] = [];
    const confetti: { x: number; y: number; size: number; color: string; speed: number; angle: number }[] = [];

    let isGameOver = false;
    let isWin = false;
    const invaderCols = 8;
    const invaderSize = 30;
    let invaderDirection = 1;
    let invaderSpeed = 1 + (level * 0.2);
    const bulletSpeed = 8;
    const enemyBulletSpeed = 3 + (level * 0.3);
    let lastShot = 0;
    let baseCooldown = 300;
    let animationFrame: number;
    let levelAdvancing = false;
    let shakeIntensity = 0;
    let lastKillTime = 0;
    let currentCombo = 0;
    let currentPowerUp: string | null = null;
    let powerUpEndTime = 0;
    let playerHasShield = false;

    // Create star field
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
      const invaderRows = 3 + Math.floor(level / 2);
      const isBossLevel = level === 3 || level === 5;

      for (let r = 0; r < invaderRows; r++) {
        for (let c = 0; c < invaderCols; c++) {
          const isBoss = isBossLevel && r === 0 && c === 3;
          invaders.push({
            x: 50 + c * (invaderSize + 20),
            y: 50 + r * (invaderSize + 20),
            alive: true,
            type: r % 3,
            hp: isBoss ? (level === 5 ? 10 : 5) : 1,
            maxHp: isBoss ? (level === 5 ? 10 : 5) : 1,
            isBoss,
            flashTimer: 0
          });
        }
      }
    };

    createInvaders();

    const createParticles = (x: number, y: number, count: number, color: string, speed: number = 3) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed * (0.5 + Math.random()),
          vy: Math.sin(angle) * speed * (0.5 + Math.random()),
          life: 1,
          maxLife: 1,
          color,
          size: 2 + Math.random() * 3
        });
      }
    };

    const createFloatingText = (x: number, y: number, text: string, color: string) => {
      floatingTexts.push({ x, y, text, life: 1, color });
    };

    const spawnPowerUp = (x: number, y: number) => {
      if (Math.random() > 0.15) return; // 15% chance
      const types: PowerUp['type'][] = ['rapidFire', 'spreadShot', 'shield', 'bomb', 'extraLife'];
      const weights = [30, 25, 20, 15, 10]; // Weighted probabilities
      const totalWeight = weights.reduce((a, b) => a + b, 0);
      let random = Math.random() * totalWeight;
      let type: PowerUp['type'] = 'rapidFire';
      for (let i = 0; i < types.length; i++) {
        random -= weights[i];
        if (random <= 0) {
          type = types[i];
          break;
        }
      }
      powerUps.push({ x, y, type, speed: 2 });
    };

    const applyPowerUp = (type: PowerUp['type']) => {
      soundSystem.playPowerUp();
      switch (type) {
        case 'rapidFire':
          currentPowerUp = 'rapidFire';
          powerUpEndTime = Date.now() + 10000;
          setActivePowerUp('Rapid Fire');
          setPowerUpTimer(10);
          break;
        case 'spreadShot':
          currentPowerUp = 'spreadShot';
          powerUpEndTime = Date.now() + 10000;
          setActivePowerUp('Spread Shot');
          setPowerUpTimer(10);
          break;
        case 'shield':
          playerHasShield = true;
          setHasShield(true);
          createFloatingText(playerX + playerWidth / 2, canvas.height - 50, 'SHIELD!', '#00FF00');
          break;
        case 'bomb':
          // Clear all enemies with explosion effects
          invaders.forEach(inv => {
            if (inv.alive) {
              createParticles(inv.x + invaderSize / 2, inv.y + invaderSize / 2, 8, '#FF6600');
              inv.alive = false;
              setScore(prev => prev + 10);
            }
          });
          shakeIntensity = 15;
          soundSystem.playExplosion();
          createFloatingText(canvas.width / 2, canvas.height / 2, 'BOOM!', '#FF0000');
          break;
        case 'extraLife':
          setLives(prev => Math.min(prev + 1, 5));
          createFloatingText(playerX + playerWidth / 2, canvas.height - 50, '+1 LIFE!', '#FF69B4');
          break;
      }
    };

    const drawConfetti = () => {
      const colors = ["#FFD700", "#00FFFF", "#FF00FF", "#39FF14", "#FF6600"];
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
        if (particle.y > canvas.height) confetti.splice(i, 1);
      }
    };

    const keys: { [key: string]: boolean } = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
      if (e.key === 'p' || e.key === 'P') togglePause();
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
      const cooldown = currentPowerUp === 'rapidFire' ? baseCooldown / 2 : baseCooldown;
      if (now - lastShot > cooldown) {
        soundSystem.playShoot();
        if (currentPowerUp === 'spreadShot') {
          bullets.push({ x: playerX + playerWidth / 2 - 2, y: canvas.height - playerHeight - 20, angle: 0 });
          bullets.push({ x: playerX + playerWidth / 2 - 2, y: canvas.height - playerHeight - 20, angle: -0.15 });
          bullets.push({ x: playerX + playerWidth / 2 - 2, y: canvas.height - playerHeight - 20, angle: 0.15 });
        } else {
          bullets.push({ x: playerX + playerWidth / 2 - 2, y: canvas.height - playerHeight - 20 });
        }
        lastShot = now;
      }
    };

    const enemyShoot = () => {
      const livingInvaders = invaders.filter(inv => inv.alive);
      if (livingInvaders.length === 0) return;
      const shooter = livingInvaders[Math.floor(Math.random() * livingInvaders.length)];
      enemyBullets.push({ x: shooter.x + invaderSize / 2, y: shooter.y + invaderSize });

      // Boss shoots more bullets
      if (shooter.isBoss) {
        enemyBullets.push({ x: shooter.x + invaderSize / 4, y: shooter.y + invaderSize });
        enemyBullets.push({ x: shooter.x + invaderSize * 3 / 4, y: shooter.y + invaderSize });
      }
    };

    const shootInterval = setInterval(() => {
      if (isPlaying && !isPaused && !isGameOver && !isWin) {
        if (Math.random() < 0.12 + (level * 0.02)) enemyShoot();
      }
    }, 800);

    const drawPlayerShip = (x: number, y: number, width: number, height: number) => {
      // Glow effect
      ctx.shadowColor = playerHasShield ? '#00FF00' : '#00FFFF';
      ctx.shadowBlur = playerHasShield ? 20 : 10;

      ctx.fillStyle = playerHasShield ? "#00FF88" : "#00FF00";
      ctx.beginPath();
      ctx.moveTo(x + width / 2, y);
      ctx.lineTo(x, y + height);
      ctx.lineTo(x + width, y + height);
      ctx.closePath();
      ctx.fill();

      // Engine glow
      ctx.fillStyle = "#00FFFF";
      ctx.fillRect(x + width / 2 - 3, y + height - 8, 6, 10);

      // Shield visual
      if (playerHasShield) {
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x + width / 2, y + height / 2, width * 0.7, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
    };

    const drawInvader = (inv: Invader) => {
      const { x, y, type, isBoss, hp, maxHp, flashTimer } = inv;
      const size = isBoss ? invaderSize * 2 : invaderSize;
      const colors = ["#FF00FF", "#00FFFF", "#FFFF00"];

      // Flash white when hit
      if (flashTimer > 0) {
        ctx.fillStyle = '#FFFFFF';
      } else {
        ctx.fillStyle = isBoss ? '#FF6600' : colors[type];
      }

      // Glow for boss
      if (isBoss) {
        ctx.shadowColor = '#FF6600';
        ctx.shadowBlur = 15;
      }

      if (type === 0 || isBoss) {
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

      ctx.shadowBlur = 0;

      // Health bar for boss
      if (isBoss && hp < maxHp) {
        ctx.fillStyle = '#333';
        ctx.fillRect(x, y - 10, size, 5);
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(x, y - 10, size * (hp / maxHp), 5);
      }
    };

    const drawPowerUp = (pu: PowerUp) => {
      const colors: Record<string, string> = {
        rapidFire: '#FFD700',
        spreadShot: '#00BFFF',
        shield: '#00FF00',
        bomb: '#FF4444',
        extraLife: '#FF69B4'
      };
      const symbols: Record<string, string> = {
        rapidFire: 'R',
        spreadShot: 'S',
        shield: 'O',
        bomb: 'B',
        extraLife: '+'
      };

      ctx.shadowColor = colors[pu.type];
      ctx.shadowBlur = 15;
      ctx.fillStyle = colors[pu.type];
      ctx.beginPath();
      ctx.arc(pu.x, pu.y, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#000';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(symbols[pu.type], pu.x, pu.y + 4);
    };

    const gameLoop = () => {
      if (!ctx || !isPlaying) return;

      // Apply screen shake
      ctx.save();
      if (shakeIntensity > 0) {
        ctx.translate(
          (Math.random() - 0.5) * shakeIntensity,
          (Math.random() - 0.5) * shakeIntensity
        );
        shakeIntensity *= 0.9;
        if (shakeIntensity < 0.5) shakeIntensity = 0;
      }

      // Dark blue background
      ctx.fillStyle = "#000022";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      ctx.fillStyle = "white";
      stars.forEach(star => {
        ctx.globalAlpha = 0.5 + Math.random() * 0.5;
        ctx.fillRect(star.x, star.y, star.size, star.size);
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      ctx.globalAlpha = 1;

      if (showConfetti) drawConfetti();

      // Check power-up expiration
      if (currentPowerUp && Date.now() > powerUpEndTime) {
        currentPowerUp = null;
        setActivePowerUp(null);
        setPowerUpTimer(0);
      } else if (currentPowerUp) {
        setPowerUpTimer(Math.ceil((powerUpEndTime - Date.now()) / 1000));
      }

      if (!isPaused && !isGameOver && !isWin) {
        // Player movement
        if (keys["ArrowLeft"] && playerX > 0) playerX -= 6;
        if (keys["ArrowRight"] && playerX < canvas.width - playerWidth) playerX += 6;
        if (keys[" "] || keys["ArrowUp"]) shootBullet();

        drawPlayerShip(playerX, canvas.height - playerHeight - 10, playerWidth, playerHeight);

        // Update bullets
        for (let i = bullets.length - 1; i >= 0; i--) {
          const bullet = bullets[i];
          bullet.y -= bulletSpeed;
          if (bullet.angle) bullet.x += Math.sin(bullet.angle) * bulletSpeed;
          if (bullet.y < 0 || bullet.x < 0 || bullet.x > canvas.width) {
            bullets.splice(i, 1);
          }
        }

        // Update enemy bullets
        for (let i = enemyBullets.length - 1; i >= 0; i--) {
          enemyBullets[i].y += enemyBulletSpeed;
          if (enemyBullets[i].y > canvas.height) {
            enemyBullets.splice(i, 1);
            continue;
          }
          // Check player collision
          if (
            enemyBullets[i].x >= playerX &&
            enemyBullets[i].x <= playerX + playerWidth &&
            enemyBullets[i].y >= canvas.height - playerHeight - 10 &&
            enemyBullets[i].y <= canvas.height - 10
          ) {
            enemyBullets.splice(i, 1);

            if (playerHasShield) {
              playerHasShield = false;
              setHasShield(false);
              createParticles(playerX + playerWidth / 2, canvas.height - playerHeight, 10, '#00FF00');
              soundSystem.playHit();
            } else {
              shakeIntensity = 10;
              soundSystem.playHit();
              setLives(prev => {
                const newLives = prev <= 1 ? 0 : prev - 1;
                if (newLives === 0) {
                  isGameOver = true;
                  setGameOver(true);
                  soundSystem.playGameOver();
                }
                return newLives;
              });
              createParticles(playerX + playerWidth / 2, canvas.height - playerHeight - 5, 15, '#FF0000');
            }
          }
        }

        // Draw player bullets with glow
        ctx.shadowColor = '#FF0000';
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#FF4444";
        bullets.forEach((bullet) => {
          ctx.fillRect(bullet.x, bullet.y, 4, 12);
        });
        ctx.shadowBlur = 0;

        // Draw enemy bullets
        ctx.shadowColor = '#FFFF00';
        ctx.shadowBlur = 8;
        ctx.fillStyle = "#FFFF00";
        enemyBullets.forEach((bullet) => {
          ctx.fillRect(bullet.x, bullet.y, 4, 10);
        });
        ctx.shadowBlur = 0;

        // Update invaders
        let moveDown = false;
        invaders.forEach((invader) => {
          if (!invader.alive) return;
          if (invader.flashTimer > 0) invader.flashTimer--;
          invader.x += invaderSpeed * invaderDirection;
          const size = invader.isBoss ? invaderSize * 2 : invaderSize;
          if (invader.x <= 10 || invader.x >= canvas.width - size - 10) {
            moveDown = true;
          }
        });

        if (moveDown) {
          invaderDirection *= -1;
          invaders.forEach((invader) => {
            if (invader.alive) {
              invader.y += 15;
              if (invader.y + (invader.isBoss ? invaderSize * 2 : invaderSize) >= canvas.height - playerHeight - 10) {
                isGameOver = true;
                setGameOver(true);
                soundSystem.playGameOver();
              }
            }
          });
        }

        // Draw invaders
        invaders.forEach((invader) => {
          if (invader.alive) drawInvader(invader);
        });

        // Check bullet-invader collisions
        for (let i = bullets.length - 1; i >= 0; i--) {
          const bullet = bullets[i];
          let bulletHit = false;
          for (let j = 0; j < invaders.length; j++) {
            const invader = invaders[j];
            const size = invader.isBoss ? invaderSize * 2 : invaderSize;
            if (
              invader.alive &&
              bullet.x >= invader.x &&
              bullet.x <= invader.x + size &&
              bullet.y >= invader.y &&
              bullet.y <= invader.y + size
            ) {
              bulletHit = true;
              invader.hp--;
              invader.flashTimer = 5;

              if (invader.hp <= 0) {
                invader.alive = false;

                // Combo system
                const now = Date.now();
                if (now - lastKillTime < 2000) {
                  currentCombo++;
                  if (currentCombo > 1) soundSystem.playCombo();
                } else {
                  currentCombo = 1;
                }
                lastKillTime = now;
                setCombo(currentCombo);

                const basePoints = invader.isBoss ? 100 : (3 - invader.type) * 10;
                const comboMultiplier = Math.min(currentCombo, 10);
                const points = basePoints * comboMultiplier;
                setScore(prev => prev + points);

                // Visual feedback
                createParticles(invader.x + size / 2, invader.y + size / 2, invader.isBoss ? 30 : 12, invader.isBoss ? '#FF6600' : '#FF00FF');
                createFloatingText(invader.x + size / 2, invader.y, `+${points}`, currentCombo > 1 ? '#FFD700' : '#FFFFFF');
                if (currentCombo > 1) {
                  createFloatingText(invader.x + size / 2, invader.y - 20, `x${comboMultiplier}`, '#00FFFF');
                }

                soundSystem.playExplosion();
                spawnPowerUp(invader.x + size / 2, invader.y + size / 2);
              } else {
                createParticles(bullet.x, bullet.y, 5, '#FFFF00');
              }
              break;
            }
          }
          if (bulletHit) bullets.splice(i, 1);
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.1; // Gravity
          p.life -= 0.02;

          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size * p.life, p.size * p.life);

          if (p.life <= 0) particles.splice(i, 1);
        }
        ctx.globalAlpha = 1;

        // Update power-ups
        for (let i = powerUps.length - 1; i >= 0; i--) {
          const pu = powerUps[i];
          pu.y += pu.speed;
          drawPowerUp(pu);

          // Check player collision
          const dist = Math.hypot(pu.x - (playerX + playerWidth / 2), pu.y - (canvas.height - playerHeight));
          if (dist < 30) {
            applyPowerUp(pu.type);
            powerUps.splice(i, 1);
            continue;
          }

          if (pu.y > canvas.height) powerUps.splice(i, 1);
        }

        // Update floating texts
        for (let i = floatingTexts.length - 1; i >= 0; i--) {
          const ft = floatingTexts[i];
          ft.y -= 1.5;
          ft.life -= 0.02;

          ctx.globalAlpha = ft.life;
          ctx.fillStyle = ft.color;
          ctx.font = 'bold 16px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(ft.text, ft.x, ft.y);

          if (ft.life <= 0) floatingTexts.splice(i, 1);
        }
        ctx.globalAlpha = 1;

        // Check level complete
        const aliveInvaders = invaders.filter(invader => invader.alive);
        if (aliveInvaders.length === 0 && invaders.length > 0 && !levelAdvancing) {
          levelAdvancing = true;
          soundSystem.playLevelUp();
          createConfetti();

          setTimeout(() => {
            if (level >= 5) {
              isWin = true;
              setGameWon(true);
            } else {
              setLevel(prev => prev + 1);
              invaderSpeed += 0.2;
              createInvaders();
              levelAdvancing = false;
            }
          }, 1500);
        }
      }

      // UI
      ctx.textAlign = 'left';
      ctx.fillStyle = "white";
      ctx.font = "bold 16px Arial";
      ctx.fillText(`Score: ${score}`, 10, 25);

      // Lives as hearts
      ctx.fillStyle = lives <= 1 ? '#FF0000' : '#FF69B4';
      let livesText = '';
      for (let i = 0; i < lives; i++) livesText += '❤ ';
      ctx.fillText(livesText, 10, 50);

      ctx.fillStyle = "white";
      ctx.fillText(`Level: ${level}`, 10, 75);

      // High score
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFD700';
      ctx.fillText(`High: ${highScore}`, canvas.width - 10, 25);

      // Combo display
      if (combo > 1) {
        ctx.fillStyle = '#00FFFF';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`COMBO x${Math.min(combo, 10)}`, canvas.width - 10, 50);
      }

      // Power-up timer
      if (activePowerUp && powerUpTimer > 0) {
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 14px Arial';
        ctx.fillText(`${activePowerUp}: ${powerUpTimer}s`, canvas.width - 10, 75);
      }

      // Shield indicator
      if (hasShield) {
        ctx.fillStyle = '#00FF00';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('SHIELD', canvas.width - 10, activePowerUp ? 95 : 75);
      }

      ctx.textAlign = 'left';

      // Game Over screen
      if (isGameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = "#FF0000";
        ctx.font = "bold 40px Arial";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 40);
        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);
        if (score >= highScore && score > 0) {
          ctx.fillStyle = '#FFD700';
          ctx.fillText('NEW HIGH SCORE!', canvas.width / 2, canvas.height / 2 + 45);
        }
        ctx.fillStyle = '#00FFFF';
        ctx.font = "18px Arial";
        ctx.fillText("Press ENTER to play again", canvas.width / 2, canvas.height / 2 + 85);
        ctx.textAlign = 'left';
      }

      // Win screen
      if (isWin) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 36px Arial";
        ctx.fillText("VICTORY!", canvas.width / 2, canvas.height / 2 - 50);
        ctx.fillStyle = "#00FF00";
        ctx.font = "28px Arial";
        ctx.fillText("You Saved Earth!", canvas.width / 2, canvas.height / 2);
        ctx.fillStyle = "white";
        ctx.font = "22px Arial";
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
        if (score >= highScore && score > 0) {
          ctx.fillStyle = '#FFD700';
          ctx.fillText('NEW HIGH SCORE!', canvas.width / 2, canvas.height / 2 + 75);
        }
        ctx.fillStyle = '#00FFFF';
        ctx.font = "18px Arial";
        ctx.fillText("Press ENTER to play again", canvas.width / 2, canvas.height / 2 + 115);
        ctx.textAlign = 'left';
        if (!showConfetti) setShowConfetti(true);
      }

      // Pause screen
      if (isPaused && !isGameOver && !isWin) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 36px Arial";
        ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2);
        ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.fillText("Press P to resume", canvas.width / 2, canvas.height / 2 + 35);
        ctx.textAlign = 'left';
      }

      ctx.restore();
      animationFrame = requestAnimationFrame(gameLoop);
    };

    if (isPlaying) gameLoop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", updateCanvasSize);
      clearInterval(shootInterval);
      cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying, isPaused, level, gameOver, gameWon, showConfetti, lives, togglePause, createConfetti, score, highScore, combo, activePowerUp, powerUpTimer, hasShield]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center">
      {!isPlaying && !gameOver && !gameWon ? (
        <div className="text-center mb-4">
          <p className="text-gray-300 mb-2">Arrow keys to move | Space to shoot | P to pause</p>
          <p className="text-gold-400 mb-4 text-sm">Collect power-ups | Build combos for bonus points!</p>
          {highScore > 0 && (
            <p className="text-neon-cyan mb-4">High Score: {highScore}</p>
          )}
          <button
            onClick={startGame}
            className="btn-premium px-8 py-3 text-lg"
          >
            Start Game
          </button>
        </div>
      ) : null}
      <canvas
        ref={canvasRef}
        className="bg-cyber-black border-2 border-gold-500/30 rounded-lg shadow-neon-gold"
      />
      {isPlaying && !gameOver && !gameWon && (
        <div className="text-gray-400 mt-4 text-center text-sm">
          <p>&#8592; &#8594; Move | Space: Shoot | P: Pause</p>
          {level >= 5 && (
            <p className="text-gold-400 font-bold mt-2">Final Level - Defeat the Boss!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SpaceInvaders;
