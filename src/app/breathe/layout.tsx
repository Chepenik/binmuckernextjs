import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Breathe Better',
  description: 'Free breathing exercises to help you find calm, focus, and balance through mindful breathing.',
  openGraph: {
    title: 'Breathe Better | Binmucker',
    description: 'Free breathing exercises to help you find calm, focus, and balance.',
  },
};

export default function BreatheLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
