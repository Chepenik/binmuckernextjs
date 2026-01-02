// Types
export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export interface Invader {
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

export interface Bullet {
  x: number;
  y: number;
  angle?: number;
  piercing?: boolean;
}

export interface PowerUp {
  x: number;
  y: number;
  type: 'rapidFire' | 'spreadShot' | 'shield' | 'bomb' | 'extraLife' | 'slowMo' | 'piercing' | 'doublePoints' | 'magnet';
  speed: number;
}

export interface GameState {
  score: number;
  lives: number;
  level: number;
  combo: number;
  hasShield: boolean;
  activePowerUp: string | null;
  powerUpTimer: number;
  isEndless: boolean;
  endlessWave: number;
  totalKills: number;
  powerUpsCollected: number;
  damageTakenThisLevel: boolean;
}

// Utility functions
export function createParticle(
  x: number,
  y: number,
  index: number,
  count: number,
  speed: number = 4,
  size: number = 3,
  color: string = '#FF00FF'
): Particle {
  const angle = (Math.PI * 2 / count) * index + Math.random() * 0.5;
  return {
    x,
    y,
    vx: Math.cos(angle) * speed * (0.5 + Math.random()),
    vy: Math.sin(angle) * speed * (0.5 + Math.random()),
    life: 1,
    maxLife: 1,
    color,
    size: size + Math.random() * size
  };
}

export function updateParticle(particle: Particle, speedMod: number = 1): Particle {
  return {
    ...particle,
    x: particle.x + particle.vx * speedMod,
    y: particle.y + particle.vy * speedMod,
    vy: particle.vy + 0.15,
    life: particle.life - 0.025,
  };
}

export function isParticleAlive(particle: Particle): boolean {
  return particle.life > 0;
}

export function calculateParticleRadius(particle: Particle): number {
  // Ensure radius is never negative
  return Math.max(0, particle.size * particle.life);
}

export function checkBulletInvaderCollision(
  bullet: Bullet,
  invader: Invader,
  invaderSize: number
): boolean {
  if (!invader.alive) return false;

  const size = invader.isBoss ? invaderSize * 2 : invaderSize;
  return (
    bullet.x >= invader.x &&
    bullet.x <= invader.x + size &&
    bullet.y >= invader.y &&
    bullet.y <= invader.y + size
  );
}

export function checkPlayerEnemyBulletCollision(
  bulletX: number,
  bulletY: number,
  playerX: number,
  playerWidth: number,
  playerHeight: number,
  canvasHeight: number
): boolean {
  return (
    bulletX >= playerX &&
    bulletX <= playerX + playerWidth &&
    bulletY >= canvasHeight - playerHeight - 10 &&
    bulletY <= canvasHeight - 10
  );
}

export function createInvader(
  row: number,
  col: number,
  invaderSize: number,
  effectiveLevel: number,
  isBoss: boolean = false
): Invader {
  const baseHp = isBoss ? (effectiveLevel >= 5 ? 15 : 8) : Math.ceil(effectiveLevel / 3);
  const x = 50 + col * (invaderSize + 20);
  const y = 50 + row * (invaderSize + 20);

  return {
    x,
    y,
    alive: true,
    type: row % 3,
    hp: baseHp,
    maxHp: baseHp,
    isBoss,
    flashTimer: 0,
    isDiving: false,
    diveTargetX: 0,
    diveSpeed: 0,
    originalY: y
  };
}

export function calculateScore(
  basePoints: number,
  combo: number,
  doublePointsActive: boolean
): number {
  const comboMultiplier = Math.min(combo, 15);
  let points = basePoints * comboMultiplier;
  if (doublePointsActive) points *= 2;
  return points;
}

export function getBasePoints(invader: Invader): number {
  if (invader.isBoss) return 150;
  return (3 - invader.type) * 10 + 10;
}

export function shouldSpawnPowerUp(): boolean {
  return Math.random() <= 0.2; // 20% chance
}

export function selectPowerUpType(): PowerUp['type'] {
  const types: PowerUp['type'][] = ['rapidFire', 'spreadShot', 'shield', 'bomb', 'extraLife', 'slowMo', 'piercing', 'doublePoints', 'magnet'];
  const weights = [20, 18, 15, 10, 8, 10, 8, 7, 4];
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < types.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return types[i];
    }
  }
  return 'rapidFire';
}

export function updateInvaderPosition(
  invader: Invader,
  invaderDirection: number,
  invaderSpeed: number,
  speedMod: number,
  playerX: number,
  playerWidth: number
): Invader {
  if (!invader.alive) return invader;

  const updated = { ...invader };

  if (updated.flashTimer > 0) {
    updated.flashTimer--;
  }

  if (updated.isDiving) {
    const dx = updated.diveTargetX - updated.x;
    updated.x += Math.sign(dx) * Math.min(Math.abs(dx), 2) * speedMod;
    updated.y += updated.diveSpeed * speedMod;
  } else {
    updated.x += invaderSpeed * invaderDirection * speedMod;
  }

  return updated;
}

export function shouldMoveDown(
  invaders: Invader[],
  canvasWidth: number,
  invaderSize: number
): boolean {
  return invaders.some(invader => {
    if (!invader.alive || invader.isDiving) return false;
    const size = invader.isBoss ? invaderSize * 2 : invaderSize;
    return invader.x <= 10 || invader.x >= canvasWidth - size - 10;
  });
}

export function moveInvadersDown(invaders: Invader[], amount: number = 20): Invader[] {
  return invaders.map(invader => {
    if (!invader.alive || invader.isDiving) return invader;
    return { ...invader, y: invader.y + amount };
  });
}

export function hasInvadersReachedBottom(
  invaders: Invader[],
  canvasHeight: number,
  playerHeight: number,
  invaderSize: number
): boolean {
  return invaders.some(invader => {
    if (!invader.alive || invader.isDiving) return false;
    const size = invader.isBoss ? invaderSize * 2 : invaderSize;
    return invader.y + size >= canvasHeight - playerHeight - 10;
  });
}

export function countAliveInvaders(invaders: Invader[]): number {
  return invaders.filter(inv => inv.alive).length;
}

export function initializeGameState(endless: boolean = false): GameState {
  return {
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
}

export function handlePlayerHit(state: GameState, hasShield: boolean): {
  newState: GameState;
  shieldBroken: boolean;
  gameOver: boolean;
} {
  if (hasShield) {
    return {
      newState: { ...state, hasShield: false },
      shieldBroken: true,
      gameOver: false,
    };
  }

  const newLives = state.lives - 1;
  return {
    newState: {
      ...state,
      lives: newLives,
      combo: 0,
      damageTakenThisLevel: true,
    },
    shieldBroken: false,
    gameOver: newLives <= 0,
  };
}
