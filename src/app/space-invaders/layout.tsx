import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Space Invaders Game',
  description:
    'Play Space Invaders in your browser on Binmucker. A retro arcade game with 5 levels, power-ups, combos, boss fights, and endless mode by Conor Chepenik.',
  alternates: {
    canonical: '/space-invaders',
  },
  openGraph: {
    title: 'Space Invaders Game | Binmucker',
    description:
      'Play Space Invaders in your browser. Retro arcade fun with power-ups, combos, and boss fights.',
    url: 'https://binmucker.com/space-invaders',
  },
};

export default function SpaceInvadersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
