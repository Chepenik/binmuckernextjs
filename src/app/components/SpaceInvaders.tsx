"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

// Types
interface PowerUp {
  x: number;
  y: number;
  type: 'rapidFire' | 'spreadShot' | 'shield' | 'bomb' | 'extraLife' | 'slowMo' | 'piercing' | 'doublePoints' | 'magnet';
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
  scale: number;
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
  isDiving: boolean;
  diveTargetX: number;
  diveSpeed: number;
  originalY: number;
}

interface MysteryShip {
  x: number;
  y: number;
  speed: number;
  active: boolean;
  points: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

// Sound System using Web Audio API
class SoundSystem {
  private audioContext: AudioContext | null = null;
  private initialized = false;
  private masterVolume = 0.5;

  init() {
    if (this.initialized) return;
    try {
      this.audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      this.initialized = true;
    } catch {
      console.warn('Web Audio API not supported');
    }
  }

  setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
  }

  playShoot() {
    if (!this.audioContext) return;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.frequency.setValueAtTime(880, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, this.audioContext.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3 * this.masterVolume, this.audioContext.currentTime);
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
    gain.gain.setValueAtTime(0.4 * this.masterVolume, this.audioContext.currentTime);
    source.start();
  }

  playBigExplosion() {
    if (!this.audioContext) return;
    const bufferSize = this.audioContext.sampleRate * 0.4;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 1.5);
    }
    const source = this.audioContext.createBufferSource();
    const gain = this.audioContext.createGain();
    source.buffer = buffer;
    source.connect(gain);
    gain.connect(this.audioContext.destination);
    gain.gain.setValueAtTime(0.6 * this.masterVolume, this.audioContext.currentTime);
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
    gain.gain.setValueAtTime(0.3 * this.masterVolume, this.audioContext.currentTime);
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
    gain.gain.setValueAtTime(0.4 * this.masterVolume, this.audioContext.currentTime);
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
      gain.gain.linearRampToValueAtTime(0.2 * this.masterVolume, this.audioContext!.currentTime + i * 0.1 + 0.05);
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
      gain.gain.linearRampToValueAtTime(0.3 * this.masterVolume, this.audioContext!.currentTime + i * 0.15 + 0.05);
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
    gain.gain.setValueAtTime(0.15 * this.masterVolume, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.05);
  }

  playMystery() {
    if (!this.audioContext) return;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, this.audioContext.currentTime);
    gain.gain.setValueAtTime(0.15 * this.masterVolume, this.audioContext.currentTime);
    // Wobble effect
    const lfo = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();
    lfo.frequency.value = 8;
    lfoGain.gain.value = 50;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();
    osc.start();
    setTimeout(() => {
      lfo.stop();
      osc.stop();
    }, 200);
  }

  playAchievement() {
    if (!this.audioContext) return;
    const notes = [659, 784, 1047, 1319];
    notes.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator();
      const gain = this.audioContext!.createGain();
      osc.connect(gain);
      gain.connect(this.audioContext!.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, this.audioContext!.currentTime + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.25 * this.masterVolume, this.audioContext!.currentTime + i * 0.08 + 0.03);
      gain.gain.linearRampToValueAtTime(0, this.audioContext!.currentTime + i * 0.08 + 0.15);
      osc.start(this.audioContext!.currentTime + i * 0.08);
      osc.stop(this.audioContext!.currentTime + i * 0.08 + 0.15);
    });
  }
}

const soundSystem = new SoundSystem();

// Achievement definitions
const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_kill', name: 'First Blood', description: 'Destroy your first alien', unlocked: false, icon: '🎯' },
  { id: 'combo_5', name: 'Combo Master', description: 'Get a 5x combo', unlocked: false, icon: '🔥' },
  { id: 'combo_10', name: 'Unstoppable', description: 'Get a 10x combo', unlocked: false, icon: '💥' },
  { id: 'mystery_ship', name: 'UFO Hunter', description: 'Destroy a mystery ship', unlocked: false, icon: '🛸' },
  { id: 'level_3', name: 'Getting Serious', description: 'Reach level 3', unlocked: false, icon: '⭐' },
  { id: 'level_5', name: 'Hero', description: 'Complete level 5', unlocked: false, icon: '🏆' },
  { id: 'endless_10', name: 'Endless Warrior', description: 'Reach endless wave 10', unlocked: false, icon: '♾️' },
  { id: 'score_5000', name: 'High Scorer', description: 'Score 5,000 points', unlocked: false, icon: '💰' },
  { id: 'score_10000', name: 'Point Master', description: 'Score 10,000 points', unlocked: false, icon: '💎' },
  { id: 'no_damage', name: 'Untouchable', description: 'Complete a level without taking damage', unlocked: false, icon: '🛡️' },
  { id: 'boss_killer', name: 'Boss Slayer', description: 'Defeat a boss', unlocked: false, icon: '👑' },
  { id: 'power_collector', name: 'Collector', description: 'Collect 10 power-ups in one game', unlocked: false, icon: '📦' },
];

const SpaceInvaders: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef({
    score: 0,
    lives: 3,
    level: 1,
    combo: 0,
    hasShield: false,
    activePowerUp: null as string | null,
    powerUpTimer: 0,
    isEndless: false,
    endlessWave: 0,
    totalKills: 0,
    powerUpsCollected: 0,
    damageTakenThisLevel: false,
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const [displayLives, setDisplayLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [displayLevel, setDisplayLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [displayCombo, setDisplayCombo] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [displayShield, setDisplayShield] = useState(false);
  const [displayPowerUp, setDisplayPowerUp] = useState<string | null>(null);
  const [displayPowerUpTimer, setDisplayPowerUpTimer] = useState(0);
  const [isEndless, setIsEndless] = useState(false);
  const [endlessWave, setEndlessWave] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [showAchievements, setShowAchievements] = useState(false);

  // Touch controls state
  const [touchControls, setTouchControls] = useState({ left: false, right: false, shoot: false });

  // Load saved data on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('spaceInvadersHighScore');
    if (savedHighScore) setHighScore(parseInt(savedHighScore, 10));

    const savedAchievements = localStorage.getItem('spaceInvadersAchievements');
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    } else {
      setAchievements(ACHIEVEMENTS);
    }
  }, []);

  // Save high score when it changes
  useEffect(() => {
    if (displayScore > highScore) {
      setHighScore(displayScore);
      localStorage.setItem('spaceInvadersHighScore', displayScore.toString());
    }
  }, [displayScore, highScore]);

  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      const achievement = prev.find(a => a.id === id);
      if (achievement && !achievement.unlocked) {
        soundSystem.playAchievement();
        const updated = prev.map(a => a.id === id ? { ...a, unlocked: true } : a);
        localStorage.setItem('spaceInvadersAchievements', JSON.stringify(updated));
        setNewAchievement(updated.find(a => a.id === id)!);
        setTimeout(() => setNewAchievement(null), 3000);
        return updated;
      }
      return prev;
    });
  }, []);

  const startGame = useCallback((endless: boolean = false) => {
    soundSystem.init();
    gameStateRef.current = {
      score: 0,
      lives: 3,
      level: endless ? 6 : 1,
      combo: 0,
      hasShield: false,
      activePowerUp: null,
      powerUpTimer: 0,
      isEndless: endless,
      endlessWave: endless ? 1 : 0,
      totalKills: 0,
      powerUpsCollected: 0,
      damageTakenThisLevel: false,
    };
    setIsPlaying(true);
    setDisplayScore(0);
    setDisplayLives(3);
    setGameOver(false);
    setDisplayLevel(endless ? 6 : 1);
    setIsPaused(false);
    setGameWon(false);
    setDisplayCombo(0);
    setDisplayShield(false);
    setDisplayPowerUp(null);
    setDisplayPowerUpTimer(0);
    setIsEndless(endless);
    setEndlessWave(endless ? 1 : 0);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
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

  // Main game loop
  useEffect(() => {
    if (!canvasRef.current || !isPlaying) return;

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
    const bullets: { x: number; y: number; angle?: number; piercing?: boolean }[] = [];
    const enemyBullets: { x: number; y: number; speed?: number }[] = [];
    const invaders: Invader[] = [];
    const stars: { x: number; y: number; size: number; speed: number; twinkle: number }[] = [];
    const particles: Particle[] = [];
    const powerUps: PowerUp[] = [];
    const floatingTexts: FloatingText[] = [];
    const confetti: { x: number; y: number; size: number; color: string; speed: number; angle: number; rotation: number }[] = [];
    let mysteryShip: MysteryShip = { x: -60, y: 30, speed: 0, active: false, points: 0 };

    let isGameOver = false;
    let isWin = false;
    const invaderCols = 8;
    const invaderSize = 30;
    let invaderDirection = 1;
    let invaderSpeed = 1 + (gameStateRef.current.level * 0.25);
    const bulletSpeed = 10;
    let enemyBulletSpeed = 3.5 + (gameStateRef.current.level * 0.4);
    let lastShot = 0;
    const baseCooldown = 250;
    let animationFrame: number;
    let levelAdvancing = false;
    let shakeIntensity = 0;
    let lastKillTime = 0;
    let currentCombo = 0;
    let currentPowerUp: string | null = null;
    let powerUpEndTime = 0;
    let playerHasShield = false;
    let slowMoActive = false;
    let slowMoEndTime = 0;
    let doublePointsActive = false;
    let doublePointsEndTime = 0;
    let magnetActive = false;
    let magnetEndTime = 0;
    let piercingActive = false;
    let piercingEndTime = 0;
    let screenFlash = 0;
    let screenFlashColor = '#FFFFFF';
    let gameTime = 0;
    let lastMysterySpawn = 0;

    // Create star field with twinkling
    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * Math.PI * 2
      });
    }

    const createInvaders = () => {
      invaders.length = 0;
      const state = gameStateRef.current;
      const effectiveLevel = state.isEndless ? 5 + Math.floor(state.endlessWave / 2) : state.level;
      const invaderRows = Math.min(3 + Math.floor(effectiveLevel / 2), 6);
      const isBossLevel = state.level === 3 || state.level === 5 || (state.isEndless && state.endlessWave % 5 === 0);

      for (let r = 0; r < invaderRows; r++) {
        for (let c = 0; c < invaderCols; c++) {
          const isBoss = isBossLevel && r === 0 && (c === 3 || c === 4);
          const baseHp = isBoss ? (effectiveLevel >= 5 ? 15 : 8) : Math.ceil(effectiveLevel / 3);
          invaders.push({
            x: 50 + c * (invaderSize + 20),
            y: 50 + r * (invaderSize + 20),
            alive: true,
            type: r % 3,
            hp: baseHp,
            maxHp: baseHp,
            isBoss,
            flashTimer: 0,
            isDiving: false,
            diveTargetX: 0,
            diveSpeed: 0,
            originalY: 50 + r * (invaderSize + 20)
          });
        }
      }

      // Update speeds for level
      invaderSpeed = 1 + (effectiveLevel * 0.25) + (state.isEndless ? state.endlessWave * 0.1 : 0);
      enemyBulletSpeed = 3.5 + (effectiveLevel * 0.4);
    };

    createInvaders();

    const createParticles = (x: number, y: number, count: number, color: string, speed: number = 4, size: number = 3) => {
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
          size: size + Math.random() * size
        });
      }
    };

    const createFloatingText = (x: number, y: number, text: string, color: string, scale: number = 1) => {
      floatingTexts.push({ x, y, text, life: 1, color, scale });
    };

    const triggerScreenFlash = (color: string, intensity: number = 0.3) => {
      screenFlash = intensity;
      screenFlashColor = color;
    };

    const spawnMysteryShip = () => {
      if (mysteryShip.active) return;
      const goingRight = Math.random() > 0.5;
      mysteryShip = {
        x: goingRight ? -60 : canvas.width + 10,
        y: 25,
        speed: goingRight ? 3 : -3,
        active: true,
        points: [50, 100, 150, 200, 300][Math.floor(Math.random() * 5)]
      };
      soundSystem.playMystery();
    };

    const spawnPowerUp = (x: number, y: number) => {
      if (Math.random() > 0.2) return; // 20% chance
      const types: PowerUp['type'][] = ['rapidFire', 'spreadShot', 'shield', 'bomb', 'extraLife', 'slowMo', 'piercing', 'doublePoints', 'magnet'];
      const weights = [20, 18, 15, 10, 8, 10, 8, 7, 4];
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
      const state = gameStateRef.current;
      soundSystem.playPowerUp();
      state.powerUpsCollected++;
      if (state.powerUpsCollected >= 10) {
        unlockAchievement('power_collector');
      }

      switch (type) {
        case 'rapidFire':
          currentPowerUp = 'rapidFire';
          powerUpEndTime = Date.now() + 12000;
          state.activePowerUp = 'Rapid Fire';
          setDisplayPowerUp('Rapid Fire');
          setDisplayPowerUpTimer(12);
          createFloatingText(playerX + playerWidth / 2, canvas.height - 50, 'RAPID FIRE!', '#FFD700', 1.2);
          break;
        case 'spreadShot':
          currentPowerUp = 'spreadShot';
          powerUpEndTime = Date.now() + 12000;
          state.activePowerUp = 'Spread Shot';
          setDisplayPowerUp('Spread Shot');
          setDisplayPowerUpTimer(12);
          createFloatingText(playerX + playerWidth / 2, canvas.height - 50, 'SPREAD SHOT!', '#00BFFF', 1.2);
          break;
        case 'shield':
          playerHasShield = true;
          state.hasShield = true;
          setDisplayShield(true);
          createFloatingText(playerX + playerWidth / 2, canvas.height - 50, 'SHIELD!', '#00FF00', 1.2);
          triggerScreenFlash('#00FF00', 0.2);
          break;
        case 'bomb':
          let bombKills = 0;
          invaders.forEach(inv => {
            if (inv.alive) {
              createParticles(inv.x + invaderSize / 2, inv.y + invaderSize / 2, 10, '#FF6600', 5);
              inv.alive = false;
              bombKills++;
              state.score += doublePointsActive ? 20 : 10;
            }
          });
          shakeIntensity = 20;
          soundSystem.playBigExplosion();
          createFloatingText(canvas.width / 2, canvas.height / 2, `BOOM! +${bombKills * (doublePointsActive ? 20 : 10)}`, '#FF4444', 1.5);
          triggerScreenFlash('#FF4400', 0.4);
          setDisplayScore(state.score);
          break;
        case 'extraLife':
          if (state.lives < 5) {
            state.lives++;
            setDisplayLives(state.lives);
          }
          createFloatingText(playerX + playerWidth / 2, canvas.height - 50, '+1 LIFE!', '#FF69B4', 1.2);
          triggerScreenFlash('#FF69B4', 0.2);
          break;
        case 'slowMo':
          slowMoActive = true;
          slowMoEndTime = Date.now() + 8000;
          createFloatingText(playerX + playerWidth / 2, canvas.height - 50, 'SLOW MOTION!', '#9400D3', 1.2);
          triggerScreenFlash('#9400D3', 0.2);
          break;
        case 'piercing':
          piercingActive = true;
          piercingEndTime = Date.now() + 10000;
          createFloatingText(playerX + playerWidth / 2, canvas.height - 50, 'PIERCING SHOTS!', '#FF1493', 1.2);
          triggerScreenFlash('#FF1493', 0.2);
          break;
        case 'doublePoints':
          doublePointsActive = true;
          doublePointsEndTime = Date.now() + 15000;
          createFloatingText(playerX + playerWidth / 2, canvas.height - 50, 'DOUBLE POINTS!', '#FFD700', 1.3);
          triggerScreenFlash('#FFD700', 0.3);
          break;
        case 'magnet':
          magnetActive = true;
          magnetEndTime = Date.now() + 12000;
          createFloatingText(playerX + playerWidth / 2, canvas.height - 50, 'MAGNET!', '#00CED1', 1.2);
          triggerScreenFlash('#00CED1', 0.2);
          break;
      }
    };

    const keys: { [key: string]: boolean } = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
      if (e.key === 'p' || e.key === 'P') togglePause();
      if ((e.key === 'Enter' || e.key === ' ') && (gameOver || gameWon || !isPlaying)) {
        startGame(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const shootBullet = () => {
      const now = Date.now();
      const cooldown = currentPowerUp === 'rapidFire' ? baseCooldown / 3 : baseCooldown;
      if (now - lastShot > cooldown) {
        soundSystem.playShoot();
        const bulletProps = { piercing: piercingActive };
        if (currentPowerUp === 'spreadShot') {
          bullets.push({ x: playerX + playerWidth / 2 - 2, y: canvas.height - playerHeight - 20, angle: 0, ...bulletProps });
          bullets.push({ x: playerX + playerWidth / 2 - 2, y: canvas.height - playerHeight - 20, angle: -0.2, ...bulletProps });
          bullets.push({ x: playerX + playerWidth / 2 - 2, y: canvas.height - playerHeight - 20, angle: 0.2, ...bulletProps });
          bullets.push({ x: playerX + playerWidth / 2 - 2, y: canvas.height - playerHeight - 20, angle: -0.1, ...bulletProps });
          bullets.push({ x: playerX + playerWidth / 2 - 2, y: canvas.height - playerHeight - 20, angle: 0.1, ...bulletProps });
        } else {
          bullets.push({ x: playerX + playerWidth / 2 - 2, y: canvas.height - playerHeight - 20, ...bulletProps });
        }
        lastShot = now;
      }
    };

    const enemyShoot = () => {
      const livingInvaders = invaders.filter(inv => inv.alive && !inv.isDiving);
      if (livingInvaders.length === 0) return;
      const shooter = livingInvaders[Math.floor(Math.random() * livingInvaders.length)];
      const speedMod = slowMoActive ? 0.5 : 1;
      enemyBullets.push({ x: shooter.x + invaderSize / 2, y: shooter.y + invaderSize, speed: enemyBulletSpeed * speedMod });

      // Boss shoots more bullets in patterns
      if (shooter.isBoss) {
        enemyBullets.push({ x: shooter.x + invaderSize / 4, y: shooter.y + invaderSize, speed: enemyBulletSpeed * speedMod });
        enemyBullets.push({ x: shooter.x + invaderSize * 3 / 4, y: shooter.y + invaderSize, speed: enemyBulletSpeed * speedMod });
        enemyBullets.push({ x: shooter.x + invaderSize, y: shooter.y + invaderSize, speed: enemyBulletSpeed * speedMod });
      }
    };

    // Start diving attack for random invader
    const startDiveAttack = () => {
      const livingInvaders = invaders.filter(inv => inv.alive && !inv.isDiving && !inv.isBoss);
      if (livingInvaders.length === 0) return;
      if (Math.random() > 0.15) return; // 15% chance per check

      const diver = livingInvaders[Math.floor(Math.random() * livingInvaders.length)];
      diver.isDiving = true;
      diver.diveTargetX = playerX + playerWidth / 2;
      diver.diveSpeed = 4 + gameStateRef.current.level * 0.5;
    };

    const shootInterval = setInterval(() => {
      if (isPlaying && !isPaused && !isGameOver && !isWin) {
        const state = gameStateRef.current;
        const shootChance = 0.15 + (state.level * 0.03) + (state.isEndless ? state.endlessWave * 0.02 : 0);
        if (Math.random() < shootChance) enemyShoot();
        startDiveAttack();

        // Spawn mystery ship occasionally
        if (gameTime - lastMysterySpawn > 15000 && Math.random() < 0.3) {
          spawnMysteryShip();
          lastMysterySpawn = gameTime;
        }
      }
    }, 600);

    const drawPlayerShip = (x: number, y: number, width: number, height: number) => {
      ctx.shadowColor = playerHasShield ? '#00FF00' : '#00FFFF';
      ctx.shadowBlur = playerHasShield ? 25 : 15;

      // Main body
      const gradient = ctx.createLinearGradient(x, y, x, y + height);
      gradient.addColorStop(0, playerHasShield ? '#00FF88' : '#00FF00');
      gradient.addColorStop(1, playerHasShield ? '#008844' : '#008800');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(x + width / 2, y);
      ctx.lineTo(x + 5, y + height);
      ctx.lineTo(x + width - 5, y + height);
      ctx.closePath();
      ctx.fill();

      // Cockpit
      ctx.fillStyle = '#00FFFF';
      ctx.beginPath();
      ctx.ellipse(x + width / 2, y + height * 0.4, 6, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Engine flames
      const flameHeight = 8 + Math.sin(gameTime / 50) * 3;
      const flameGradient = ctx.createLinearGradient(x + width / 2, y + height, x + width / 2, y + height + flameHeight);
      flameGradient.addColorStop(0, '#00FFFF');
      flameGradient.addColorStop(0.5, '#0088FF');
      flameGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = flameGradient;
      ctx.beginPath();
      ctx.moveTo(x + width / 2 - 8, y + height);
      ctx.lineTo(x + width / 2, y + height + flameHeight);
      ctx.lineTo(x + width / 2 + 8, y + height);
      ctx.closePath();
      ctx.fill();

      // Shield visual
      if (playerHasShield) {
        ctx.strokeStyle = `rgba(0, 255, 0, ${0.5 + Math.sin(gameTime / 100) * 0.3})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x + width / 2, y + height / 2, width * 0.8, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
    };

    const drawInvader = (inv: Invader) => {
      const { x, y, type, isBoss, hp, maxHp, flashTimer } = inv;
      const size = isBoss ? invaderSize * 2 : invaderSize;
      const colors = ["#FF00FF", "#00FFFF", "#FFFF00"];

      // Pulsing glow
      const pulseIntensity = 10 + Math.sin(gameTime / 200 + x) * 5;
      ctx.shadowColor = isBoss ? '#FF6600' : colors[type];
      ctx.shadowBlur = pulseIntensity;

      if (flashTimer > 0) {
        ctx.fillStyle = '#FFFFFF';
      } else {
        const gradient = ctx.createRadialGradient(x + size / 2, y + size / 2, 0, x + size / 2, y + size / 2, size / 2);
        gradient.addColorStop(0, isBoss ? '#FFAA00' : colors[type]);
        gradient.addColorStop(1, isBoss ? '#FF4400' : colors[type].replace('FF', '88'));
        ctx.fillStyle = gradient;
      }

      if (type === 0 || isBoss) {
        // Square alien with animated features
        ctx.fillRect(x, y, size, size);
        ctx.fillStyle = "#000";
        const eyeOffset = Math.sin(gameTime / 150) * 2;
        ctx.fillRect(x + size * 0.2 + eyeOffset, y + size * 0.3, size * 0.2, size * 0.2);
        ctx.fillRect(x + size * 0.6 + eyeOffset, y + size * 0.3, size * 0.2, size * 0.2);
        // Mouth animation
        ctx.fillRect(x + size * 0.3, y + size * 0.7, size * 0.4, size * 0.1 + Math.sin(gameTime / 100) * 2);
      } else if (type === 1) {
        // Circle alien
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(x + size * 0.3, y + size * 0.4, size * 0.12, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + size * 0.7, y + size * 0.4, size * 0.12, 0, Math.PI * 2);
        ctx.fill();
        // Tentacles
        ctx.strokeStyle = flashTimer > 0 ? '#FFFFFF' : colors[type];
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(x + size * (0.25 + i * 0.25), y + size);
          ctx.quadraticCurveTo(
            x + size * (0.25 + i * 0.25) + Math.sin(gameTime / 100 + i) * 5,
            y + size + 8,
            x + size * (0.25 + i * 0.25),
            y + size + 12
          );
          ctx.stroke();
        }
      } else {
        // Triangle alien
        ctx.beginPath();
        ctx.moveTo(x + size / 2, y);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x + size, y + size);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.fillRect(x + size * 0.35, y + size * 0.5, size * 0.12, size * 0.12);
        ctx.fillRect(x + size * 0.55, y + size * 0.5, size * 0.12, size * 0.12);
      }

      ctx.shadowBlur = 0;

      // Health bar for multi-hp enemies
      if (maxHp > 1 && hp < maxHp) {
        ctx.fillStyle = '#333';
        ctx.fillRect(x, y - 8, size, 4);
        const healthPercent = hp / maxHp;
        ctx.fillStyle = healthPercent > 0.5 ? '#00FF00' : healthPercent > 0.25 ? '#FFFF00' : '#FF0000';
        ctx.fillRect(x, y - 8, size * healthPercent, 4);
      }
    };

    const drawMysteryShip = () => {
      if (!mysteryShip.active) return;

      const { x, y, points } = mysteryShip;
      const width = 50;
      const height = 20;

      // UFO glow
      ctx.shadowColor = '#FF0000';
      ctx.shadowBlur = 20 + Math.sin(gameTime / 50) * 10;

      // UFO body
      const gradient = ctx.createRadialGradient(x + width / 2, y + height / 2, 0, x + width / 2, y + height / 2, width / 2);
      gradient.addColorStop(0, '#FF6666');
      gradient.addColorStop(1, '#CC0000');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Dome
      ctx.fillStyle = '#FFCCCC';
      ctx.beginPath();
      ctx.ellipse(x + width / 2, y + height / 3, width / 4, height / 3, 0, Math.PI, Math.PI * 2);
      ctx.fill();

      // Lights
      ctx.fillStyle = `hsl(${(gameTime / 10) % 360}, 100%, 50%)`;
      for (let i = 0; i < 5; i++) {
        const lightX = x + 8 + i * 9;
        ctx.beginPath();
        ctx.arc(lightX, y + height - 3, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Points indicator
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${points}`, x + width / 2, y - 5);

      ctx.shadowBlur = 0;
    };

    const drawPowerUp = (pu: PowerUp) => {
      const colors: Record<string, string> = {
        rapidFire: '#FFD700',
        spreadShot: '#00BFFF',
        shield: '#00FF00',
        bomb: '#FF4444',
        extraLife: '#FF69B4',
        slowMo: '#9400D3',
        piercing: '#FF1493',
        doublePoints: '#FFD700',
        magnet: '#00CED1'
      };
      const symbols: Record<string, string> = {
        rapidFire: 'R',
        spreadShot: 'S',
        shield: 'O',
        bomb: 'B',
        extraLife: '+',
        slowMo: 'T',
        piercing: 'P',
        doublePoints: '2X',
        magnet: 'M'
      };

      // Pulsing glow
      const pulse = Math.sin(gameTime / 100) * 5 + 15;
      ctx.shadowColor = colors[pu.type];
      ctx.shadowBlur = pulse;

      // Outer ring
      ctx.strokeStyle = colors[pu.type];
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pu.x, pu.y, 14 + Math.sin(gameTime / 80) * 2, 0, Math.PI * 2);
      ctx.stroke();

      // Inner circle
      ctx.fillStyle = colors[pu.type];
      ctx.beginPath();
      ctx.arc(pu.x, pu.y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#000';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(symbols[pu.type], pu.x, pu.y + 3);
    };

    const drawCRTEffect = () => {
      // Scanlines
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      for (let i = 0; i < canvas.height; i += 4) {
        ctx.fillRect(0, i, canvas.width, 2);
      }

      // Vignette
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height / 3,
        canvas.width / 2, canvas.height / 2, canvas.height
      );
      vignette.addColorStop(0, 'transparent');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const gameLoop = () => {
      if (!ctx || !isPlaying) return;

      gameTime += slowMoActive ? 8 : 16;
      const state = gameStateRef.current;

      // Apply screen shake
      ctx.save();
      if (shakeIntensity > 0) {
        ctx.translate(
          (Math.random() - 0.5) * shakeIntensity,
          (Math.random() - 0.5) * shakeIntensity
        );
        shakeIntensity *= 0.85;
        if (shakeIntensity < 0.5) shakeIntensity = 0;
      }

      // Background with gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, '#000011');
      bgGradient.addColorStop(0.5, '#000022');
      bgGradient.addColorStop(1, '#001133');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with twinkling
      stars.forEach(star => {
        star.twinkle += 0.05;
        const alpha = 0.4 + Math.sin(star.twinkle) * 0.4;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.size > 1.5 ? '#FFFFAA' : 'white';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed * (slowMoActive ? 0.3 : 1);
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      ctx.globalAlpha = 1;

      // Screen flash effect
      if (screenFlash > 0) {
        ctx.fillStyle = screenFlashColor;
        ctx.globalAlpha = screenFlash;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        screenFlash *= 0.85;
        if (screenFlash < 0.01) screenFlash = 0;
      }

      // Check power-up expirations
      const now = Date.now();
      if (currentPowerUp && now > powerUpEndTime) {
        currentPowerUp = null;
        state.activePowerUp = null;
        setDisplayPowerUp(null);
        setDisplayPowerUpTimer(0);
      } else if (currentPowerUp) {
        const remaining = Math.ceil((powerUpEndTime - now) / 1000);
        setDisplayPowerUpTimer(remaining);
      }

      if (slowMoActive && now > slowMoEndTime) slowMoActive = false;
      if (doublePointsActive && now > doublePointsEndTime) doublePointsActive = false;
      if (magnetActive && now > magnetEndTime) magnetActive = false;
      if (piercingActive && now > piercingEndTime) piercingActive = false;

      // Draw confetti for victory
      if (isWin || levelAdvancing) {
        const colors = ["#FFD700", "#00FFFF", "#FF00FF", "#39FF14", "#FF6600", "#FF1493"];
        if (confetti.length < 200) {
          for (let i = 0; i < 3; i++) {
            confetti.push({
              x: Math.random() * canvas.width,
              y: -20 - Math.random() * 50,
              size: Math.random() * 8 + 3,
              color: colors[Math.floor(Math.random() * colors.length)],
              speed: Math.random() * 4 + 2,
              angle: Math.random() * 2 - 1,
              rotation: Math.random() * Math.PI * 2
            });
          }
        }
        for (let i = confetti.length - 1; i >= 0; i--) {
          const p = confetti[i];
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2);
          ctx.restore();
          p.y += p.speed;
          p.x += p.angle;
          p.rotation += 0.1;
          if (p.y > canvas.height + 20) confetti.splice(i, 1);
        }
      }

      if (!isPaused && !isGameOver && !isWin) {
        const speedMod = slowMoActive ? 0.4 : 1;

        // Player movement (including touch controls)
        const moveSpeed = 7;
        if ((keys["ArrowLeft"] || touchControls.left) && playerX > 0) {
          playerX -= moveSpeed;
        }
        if ((keys["ArrowRight"] || touchControls.right) && playerX < canvas.width - playerWidth) {
          playerX += moveSpeed;
        }
        if (keys[" "] || keys["ArrowUp"] || touchControls.shoot) shootBullet();

        drawPlayerShip(playerX, canvas.height - playerHeight - 10, playerWidth, playerHeight);

        // Update mystery ship
        if (mysteryShip.active) {
          mysteryShip.x += mysteryShip.speed * speedMod;
          drawMysteryShip();
          if (mysteryShip.x < -60 || mysteryShip.x > canvas.width + 10) {
            mysteryShip.active = false;
          }
        }

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
          const eb = enemyBullets[i];
          eb.y += (eb.speed || enemyBulletSpeed) * speedMod;
          if (eb.y > canvas.height) {
            enemyBullets.splice(i, 1);
            continue;
          }
          // Check player collision
          if (
            eb.x >= playerX &&
            eb.x <= playerX + playerWidth &&
            eb.y >= canvas.height - playerHeight - 10 &&
            eb.y <= canvas.height - 10
          ) {
            enemyBullets.splice(i, 1);

            if (playerHasShield) {
              playerHasShield = false;
              state.hasShield = false;
              setDisplayShield(false);
              createParticles(playerX + playerWidth / 2, canvas.height - playerHeight, 15, '#00FF00', 5);
              soundSystem.playHit();
              triggerScreenFlash('#00FF00', 0.15);
            } else {
              state.damageTakenThisLevel = true;
              shakeIntensity = 15;
              soundSystem.playHit();
              state.lives--;
              setDisplayLives(state.lives);
              currentCombo = 0;
              state.combo = 0;
              setDisplayCombo(0);
              if (state.lives <= 0) {
                isGameOver = true;
                setGameOver(true);
                soundSystem.playGameOver();
              }
              createParticles(playerX + playerWidth / 2, canvas.height - playerHeight - 5, 20, '#FF0000', 6);
              triggerScreenFlash('#FF0000', 0.3);
            }
          }
        }

        // Draw player bullets with glow
        ctx.shadowColor = piercingActive ? '#FF1493' : '#FF4444';
        ctx.shadowBlur = 12;
        ctx.fillStyle = piercingActive ? '#FF1493' : '#FF4444';
        bullets.forEach((bullet) => {
          ctx.beginPath();
          ctx.ellipse(bullet.x + 2, bullet.y + 6, 3, 8, 0, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.shadowBlur = 0;

        // Draw enemy bullets
        ctx.shadowColor = '#FFFF00';
        ctx.shadowBlur = 10;
        enemyBullets.forEach((bullet) => {
          ctx.fillStyle = '#FFFF00';
          ctx.beginPath();
          ctx.ellipse(bullet.x + 2, bullet.y + 5, 3, 6, 0, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.shadowBlur = 0;

        // Update invaders
        let moveDown = false;
        invaders.forEach((invader) => {
          if (!invader.alive) return;
          if (invader.flashTimer > 0) invader.flashTimer--;

          if (invader.isDiving) {
            // Diving behavior
            const dx = invader.diveTargetX - invader.x;
            invader.x += Math.sign(dx) * Math.min(Math.abs(dx), 2) * speedMod;
            invader.y += invader.diveSpeed * speedMod;

            // Check if diver hit player
            const size = invader.isBoss ? invaderSize * 2 : invaderSize;
            if (
              invader.x < playerX + playerWidth &&
              invader.x + size > playerX &&
              invader.y + size > canvas.height - playerHeight - 10
            ) {
              if (playerHasShield) {
                playerHasShield = false;
                state.hasShield = false;
                setDisplayShield(false);
                invader.alive = false;
                createParticles(invader.x + size / 2, invader.y + size / 2, 15, '#00FF00');
                soundSystem.playExplosion();
              } else {
                state.damageTakenThisLevel = true;
                invader.alive = false;
                shakeIntensity = 15;
                state.lives--;
                setDisplayLives(state.lives);
                createParticles(playerX + playerWidth / 2, canvas.height - playerHeight, 20, '#FF0000', 6);
                triggerScreenFlash('#FF0000', 0.4);
                soundSystem.playHit();
                if (state.lives <= 0) {
                  isGameOver = true;
                  setGameOver(true);
                  soundSystem.playGameOver();
                }
              }
            }

            // Remove diver if off screen
            if (invader.y > canvas.height) {
              invader.alive = false;
            }
          } else {
            // Normal movement
            invader.x += invaderSpeed * invaderDirection * speedMod;
            const size = invader.isBoss ? invaderSize * 2 : invaderSize;
            if (invader.x <= 10 || invader.x >= canvas.width - size - 10) {
              moveDown = true;
            }
          }
        });

        if (moveDown) {
          invaderDirection *= -1;
          invaders.forEach((invader) => {
            if (invader.alive && !invader.isDiving) {
              invader.y += 20;
              const size = invader.isBoss ? invaderSize * 2 : invaderSize;
              if (invader.y + size >= canvas.height - playerHeight - 10) {
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

          // Check mystery ship
          if (mysteryShip.active) {
            if (
              bullet.x >= mysteryShip.x &&
              bullet.x <= mysteryShip.x + 50 &&
              bullet.y >= mysteryShip.y &&
              bullet.y <= mysteryShip.y + 20
            ) {
              const points = doublePointsActive ? mysteryShip.points * 2 : mysteryShip.points;
              state.score += points;
              setDisplayScore(state.score);
              createParticles(mysteryShip.x + 25, mysteryShip.y + 10, 25, '#FF0000', 6);
              createFloatingText(mysteryShip.x + 25, mysteryShip.y, `+${points}!`, '#FFD700', 1.5);
              soundSystem.playBigExplosion();
              triggerScreenFlash('#FF0000', 0.2);
              mysteryShip.active = false;
              unlockAchievement('mystery_ship');
              if (!bullet.piercing) {
                bullets.splice(i, 1);
                continue;
              }
            }
          }

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
              if (!bullet.piercing) bulletHit = true;
              invader.hp--;
              invader.flashTimer = 6;

              if (invader.hp <= 0) {
                invader.alive = false;
                state.totalKills++;

                // First kill achievement
                if (state.totalKills === 1) {
                  unlockAchievement('first_kill');
                }

                // Boss kill achievement
                if (invader.isBoss) {
                  unlockAchievement('boss_killer');
                }

                // Combo system
                if (now - lastKillTime < 1500) {
                  currentCombo++;
                  if (currentCombo > 1) soundSystem.playCombo();
                  if (currentCombo >= 5) unlockAchievement('combo_5');
                  if (currentCombo >= 10) unlockAchievement('combo_10');
                } else {
                  currentCombo = 1;
                }
                lastKillTime = now;
                state.combo = currentCombo;
                setDisplayCombo(currentCombo);

                const basePoints = invader.isBoss ? 150 : (3 - invader.type) * 10 + 10;
                const comboMultiplier = Math.min(currentCombo, 15);
                let points = basePoints * comboMultiplier;
                if (doublePointsActive) points *= 2;
                state.score += points;
                setDisplayScore(state.score);

                // Score achievements
                if (state.score >= 5000) unlockAchievement('score_5000');
                if (state.score >= 10000) unlockAchievement('score_10000');

                // Visual feedback
                const particleCount = invader.isBoss ? 40 : 15;
                createParticles(invader.x + size / 2, invader.y + size / 2, particleCount, invader.isBoss ? '#FF6600' : '#FF00FF', invader.isBoss ? 8 : 5);
                createFloatingText(invader.x + size / 2, invader.y, `+${points}`, currentCombo > 1 ? '#FFD700' : '#FFFFFF', currentCombo > 5 ? 1.3 : 1);
                if (currentCombo > 1) {
                  createFloatingText(invader.x + size / 2, invader.y - 25, `x${comboMultiplier}`, '#00FFFF', 1.2);
                }

                if (invader.isBoss) {
                  soundSystem.playBigExplosion();
                  shakeIntensity = 12;
                  triggerScreenFlash('#FF6600', 0.3);
                } else {
                  soundSystem.playExplosion();
                }
                spawnPowerUp(invader.x + size / 2, invader.y + size / 2);
              } else {
                createParticles(bullet.x, bullet.y, 6, '#FFFF00', 3, 2);
              }
              break;
            }
          }
          if (bulletHit) bullets.splice(i, 1);
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx * speedMod;
          p.y += p.vy * speedMod;
          p.vy += 0.15;
          p.life -= 0.025;

          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fill();

          if (p.life <= 0) particles.splice(i, 1);
        }
        ctx.globalAlpha = 1;

        // Update power-ups
        for (let i = powerUps.length - 1; i >= 0; i--) {
          const pu = powerUps[i];

          // Magnet effect
          if (magnetActive) {
            const dx = playerX + playerWidth / 2 - pu.x;
            const dy = canvas.height - playerHeight - pu.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 200) {
              pu.x += (dx / dist) * 4;
              pu.y += (dy / dist) * 4;
            }
          }

          pu.y += pu.speed * speedMod;
          drawPowerUp(pu);

          // Check player collision
          const dist = Math.hypot(pu.x - (playerX + playerWidth / 2), pu.y - (canvas.height - playerHeight));
          if (dist < 35) {
            applyPowerUp(pu.type);
            powerUps.splice(i, 1);
            continue;
          }

          if (pu.y > canvas.height + 20) powerUps.splice(i, 1);
        }

        // Update floating texts
        for (let i = floatingTexts.length - 1; i >= 0; i--) {
          const ft = floatingTexts[i];
          ft.y -= 2;
          ft.life -= 0.025;

          ctx.globalAlpha = ft.life;
          ctx.fillStyle = ft.color;
          ctx.font = `bold ${Math.floor(16 * ft.scale)}px Arial`;
          ctx.textAlign = 'center';
          ctx.shadowColor = ft.color;
          ctx.shadowBlur = 10;
          ctx.fillText(ft.text, ft.x, ft.y);
          ctx.shadowBlur = 0;

          if (ft.life <= 0) floatingTexts.splice(i, 1);
        }
        ctx.globalAlpha = 1;

        // Check level complete
        const aliveInvaders = invaders.filter(invader => invader.alive);
        if (aliveInvaders.length === 0 && invaders.length > 0 && !levelAdvancing) {
          levelAdvancing = true;
          soundSystem.playLevelUp();

          // No damage achievement
          if (!state.damageTakenThisLevel) {
            unlockAchievement('no_damage');
          }

          setTimeout(() => {
            if (state.isEndless) {
              // Endless mode - continue with harder waves
              state.endlessWave++;
              setEndlessWave(state.endlessWave);
              state.damageTakenThisLevel = false;
              if (state.endlessWave >= 10) unlockAchievement('endless_10');
              createInvaders();
              confetti.length = 0;
              levelAdvancing = false;
            } else if (state.level >= 5) {
              // Won the game!
              isWin = true;
              setGameWon(true);
              unlockAchievement('level_5');
            } else {
              state.level++;
              setDisplayLevel(state.level);
              state.damageTakenThisLevel = false;
              if (state.level >= 3) unlockAchievement('level_3');
              createInvaders();
              confetti.length = 0;
              levelAdvancing = false;
            }
          }, 1500);
        }
      }

      // CRT effect
      drawCRTEffect();

      // UI - Score and stats
      ctx.textAlign = 'left';
      ctx.fillStyle = "white";
      ctx.font = "bold 18px 'Courier New', monospace";
      ctx.shadowColor = '#00FFFF';
      ctx.shadowBlur = 5;
      ctx.fillText(`SCORE: ${state.score.toLocaleString()}`, 12, 28);
      ctx.shadowBlur = 0;

      // Lives as hearts with animation
      ctx.fillStyle = state.lives <= 1 ? '#FF0000' : '#FF69B4';
      let livesText = '';
      for (let i = 0; i < state.lives; i++) livesText += '\u2764 ';
      ctx.fillText(livesText, 12, 55);

      // Level/Wave display
      ctx.fillStyle = "#00FFFF";
      if (state.isEndless) {
        ctx.fillText(`ENDLESS WAVE: ${state.endlessWave}`, 12, 82);
      } else {
        ctx.fillText(`LEVEL: ${state.level}/5`, 12, 82);
      }

      // High score
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFD700';
      ctx.shadowColor = '#FFD700';
      ctx.shadowBlur = 5;
      ctx.fillText(`HIGH: ${highScore.toLocaleString()}`, canvas.width - 12, 28);
      ctx.shadowBlur = 0;

      // Combo display with animation
      if (state.combo > 1) {
        const comboScale = 1 + Math.sin(gameTime / 50) * 0.1;
        ctx.fillStyle = state.combo >= 10 ? '#FF4444' : state.combo >= 5 ? '#FFD700' : '#00FFFF';
        ctx.font = `bold ${Math.floor(22 * comboScale)}px 'Courier New', monospace`;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 15;
        ctx.fillText(`COMBO x${Math.min(state.combo, 15)}!`, canvas.width - 12, 55);
        ctx.shadowBlur = 0;
      }

      // Active power-ups
      let yOffset = 75;
      ctx.font = 'bold 14px Arial';
      if (displayPowerUp && displayPowerUpTimer > 0) {
        ctx.fillStyle = '#FFD700';
        ctx.fillText(`${displayPowerUp}: ${displayPowerUpTimer}s`, canvas.width - 12, yOffset);
        yOffset += 20;
      }
      if (slowMoActive) {
        const remaining = Math.ceil((slowMoEndTime - now) / 1000);
        ctx.fillStyle = '#9400D3';
        ctx.fillText(`Slow-Mo: ${remaining}s`, canvas.width - 12, yOffset);
        yOffset += 20;
      }
      if (doublePointsActive) {
        const remaining = Math.ceil((doublePointsEndTime - now) / 1000);
        ctx.fillStyle = '#FFD700';
        ctx.fillText(`2X Points: ${remaining}s`, canvas.width - 12, yOffset);
        yOffset += 20;
      }
      if (piercingActive) {
        const remaining = Math.ceil((piercingEndTime - now) / 1000);
        ctx.fillStyle = '#FF1493';
        ctx.fillText(`Piercing: ${remaining}s`, canvas.width - 12, yOffset);
        yOffset += 20;
      }
      if (magnetActive) {
        const remaining = Math.ceil((magnetEndTime - now) / 1000);
        ctx.fillStyle = '#00CED1';
        ctx.fillText(`Magnet: ${remaining}s`, canvas.width - 12, yOffset);
        yOffset += 20;
      }
      if (state.hasShield) {
        ctx.fillStyle = '#00FF00';
        ctx.fillText('SHIELD ACTIVE', canvas.width - 12, yOffset);
      }

      ctx.textAlign = 'left';

      // Game Over screen
      if (isGameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';

        ctx.fillStyle = "#FF0000";
        ctx.font = "bold 48px Arial";
        ctx.shadowColor = '#FF0000';
        ctx.shadowBlur = 20;
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 60);
        ctx.shadowBlur = 0;

        ctx.fillStyle = "white";
        ctx.font = "28px Arial";
        ctx.fillText(`Final Score: ${state.score.toLocaleString()}`, canvas.width / 2, canvas.height / 2);

        if (state.score >= highScore && state.score > 0) {
          ctx.fillStyle = '#FFD700';
          ctx.font = "bold 24px Arial";
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 10;
          ctx.fillText('NEW HIGH SCORE!', canvas.width / 2, canvas.height / 2 + 40);
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = '#00FFFF';
        ctx.font = "20px Arial";
        ctx.fillText("Press ENTER to play again", canvas.width / 2, canvas.height / 2 + 90);
        ctx.textAlign = 'left';
      }

      // Win screen
      if (isWin) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';

        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 44px Arial";
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 25;
        ctx.fillText("VICTORY!", canvas.width / 2, canvas.height / 2 - 70);
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#00FF00";
        ctx.font = "32px Arial";
        ctx.fillText("Earth is Saved!", canvas.width / 2, canvas.height / 2 - 20);

        ctx.fillStyle = "white";
        ctx.font = "26px Arial";
        ctx.fillText(`Final Score: ${state.score.toLocaleString()}`, canvas.width / 2, canvas.height / 2 + 30);

        if (state.score >= highScore && state.score > 0) {
          ctx.fillStyle = '#FFD700';
          ctx.font = "bold 22px Arial";
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 10;
          ctx.fillText('NEW HIGH SCORE!', canvas.width / 2, canvas.height / 2 + 65);
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = '#FF00FF';
        ctx.font = "18px Arial";
        ctx.fillText("Try Endless Mode for infinite waves!", canvas.width / 2, canvas.height / 2 + 100);

        ctx.fillStyle = '#00FFFF';
        ctx.font = "18px Arial";
        ctx.fillText("Press ENTER to play again", canvas.width / 2, canvas.height / 2 + 130);
        ctx.textAlign = 'left';
      }

      // Pause screen
      if (isPaused && !isGameOver && !isWin) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';

        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 44px Arial";
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 15;
        ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2 - 20);
        ctx.shadowBlur = 0;

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Press P to resume", canvas.width / 2, canvas.height / 2 + 25);
        ctx.textAlign = 'left';
      }

      ctx.restore();
      animationFrame = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", updateCanvasSize);
      clearInterval(shootInterval);
      cancelAnimationFrame(animationFrame);
    };
  }, [isPlaying, isPaused, gameOver, gameWon, togglePause, startGame, highScore, touchControls, unlockAchievement]);

  // Touch control handlers
  const handleTouchStart = (control: 'left' | 'right' | 'shoot') => {
    setTouchControls(prev => ({ ...prev, [control]: true }));
  };

  const handleTouchEnd = (control: 'left' | 'right' | 'shoot') => {
    setTouchControls(prev => ({ ...prev, [control]: false }));
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="flex flex-col items-center">
      {/* Achievement notification */}
      {newAchievement && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <span className="text-2xl">{newAchievement.icon}</span>
            <div>
              <div className="font-bold">Achievement Unlocked!</div>
              <div className="text-sm">{newAchievement.name}</div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements modal */}
      {showAchievements && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-cyber-900 rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto border border-gold-500/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gold-400">Achievements ({unlockedCount}/{achievements.length})</h3>
              <button onClick={() => setShowAchievements(false)} className="text-gray-400 hover:text-white text-2xl">&times;</button>
            </div>
            <div className="space-y-3">
              {achievements.map(a => (
                <div key={a.id} className={`flex items-center gap-3 p-3 rounded-lg ${a.unlocked ? 'bg-gold-500/20' : 'bg-gray-800/50 opacity-50'}`}>
                  <span className="text-2xl">{a.icon}</span>
                  <div>
                    <div className={`font-semibold ${a.unlocked ? 'text-gold-400' : 'text-gray-400'}`}>{a.name}</div>
                    <div className="text-sm text-gray-400">{a.description}</div>
                  </div>
                  {a.unlocked && <span className="ml-auto text-green-400">&#10003;</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!isPlaying && !gameOver && !gameWon ? (
        <div className="text-center mb-4">
          <p className="text-gray-300 mb-2">Arrow keys to move | Space to shoot | P to pause</p>
          <p className="text-gold-400 mb-2 text-sm">Collect power-ups | Build combos | Hunt UFOs for bonus points!</p>
          {highScore > 0 && (
            <p className="text-neon-cyan mb-4 text-lg">High Score: {highScore.toLocaleString()}</p>
          )}
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => startGame(false)}
              className="btn-premium px-8 py-3 text-lg"
            >
              Start Game
            </button>
            <button
              onClick={() => startGame(true)}
              className="btn-gold-outline px-6 py-3"
            >
              Endless Mode
            </button>
          </div>
          <button
            onClick={() => setShowAchievements(true)}
            className="mt-4 text-sm text-gray-400 hover:text-gold-400 transition-colors"
          >
            Achievements ({unlockedCount}/{achievements.length})
          </button>
        </div>
      ) : null}

      <canvas
        ref={canvasRef}
        className="bg-cyber-black border-2 border-gold-500/30 rounded-lg shadow-neon-gold touch-none"
      />

      {/* Mobile touch controls */}
      {isPlaying && !gameOver && !gameWon && (
        <>
          <div className="md:hidden flex justify-center gap-4 mt-4 select-none">
            <button
              onTouchStart={() => handleTouchStart('left')}
              onTouchEnd={() => handleTouchEnd('left')}
              onMouseDown={() => handleTouchStart('left')}
              onMouseUp={() => handleTouchEnd('left')}
              onMouseLeave={() => handleTouchEnd('left')}
              className="w-16 h-16 rounded-full bg-cyber-700 border-2 border-neon-cyan/50 flex items-center justify-center text-2xl active:bg-neon-cyan/30 touch-none"
            >
              &#8592;
            </button>
            <button
              onTouchStart={() => handleTouchStart('shoot')}
              onTouchEnd={() => handleTouchEnd('shoot')}
              onMouseDown={() => handleTouchStart('shoot')}
              onMouseUp={() => handleTouchEnd('shoot')}
              onMouseLeave={() => handleTouchEnd('shoot')}
              className="w-20 h-16 rounded-full bg-red-600/80 border-2 border-red-400/50 flex items-center justify-center text-xl font-bold active:bg-red-500 touch-none"
            >
              FIRE
            </button>
            <button
              onTouchStart={() => handleTouchStart('right')}
              onTouchEnd={() => handleTouchEnd('right')}
              onMouseDown={() => handleTouchStart('right')}
              onMouseUp={() => handleTouchEnd('right')}
              onMouseLeave={() => handleTouchEnd('right')}
              className="w-16 h-16 rounded-full bg-cyber-700 border-2 border-neon-cyan/50 flex items-center justify-center text-2xl active:bg-neon-cyan/30 touch-none"
            >
              &#8594;
            </button>
          </div>
          <div className="text-gray-400 mt-4 text-center text-sm hidden md:block">
            <p>&#8592; &#8594; Move | Space: Shoot | P: Pause</p>
            {isEndless && (
              <p className="text-purple-400 font-bold mt-2">Endless Mode - Wave {endlessWave}</p>
            )}
            {displayLevel === 5 && !isEndless && (
              <p className="text-gold-400 font-bold mt-2">Final Level - Defeat the Bosses!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SpaceInvaders;

