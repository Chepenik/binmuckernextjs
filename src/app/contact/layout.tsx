import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Conor Chepenik',
  description:
    'Get in touch with Conor Chepenik at Binmucker. Reach out for project collaborations, technical questions, or business inquiries.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Conor Chepenik | Binmucker',
    description:
      'Get in touch with Conor Chepenik for collaborations, questions, or business inquiries.',
    url: 'https://binmucker.com/contact',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Conor Chepenik | Binmucker',
    description:
      'Get in touch with Conor Chepenik for collaborations, questions, or business inquiries.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
