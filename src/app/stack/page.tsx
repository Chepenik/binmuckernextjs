import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Bot, CreditCard, Server, ShieldCheck, type LucideIcon } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { OG_IMAGE, OG_IMAGE_URL } from '@/lib/og';

export const metadata: Metadata = {
  title: 'My Stack',
  description:
    'Services and products Conor Chepenik actually uses, with clear referral disclosures for Venice AI, Gemini Credit Card, CrowdHealth, and Hostinger.',
  keywords: ['Conor Chepenik stack', 'Bitcoin tools', 'Venice AI referral', 'Gemini credit card', 'CrowdHealth', 'Hostinger'],
  alternates: { canonical: '/stack' },
  openGraph: {
    title: 'My Stack | Binmucker',
    description: 'Services and products I actually use, with clear referral disclosures and no mystery recommendations.',
    url: 'https://www.binmucker.com/stack',
    siteName: 'Binmucker',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Stack | Binmucker',
    description: 'Services and products I actually use, with clear referral disclosures.',
    images: [OG_IMAGE_URL],
  },
};

interface StackItem {
  name: string;
  description: string;
  disclosure: string;
  href: string;
  cta: string;
  icon: LucideIcon;
  tone: string;
}

const tools: StackItem[] = [
  {
    name: 'Venice AI',
    description: 'Private AI models and a tool I use when I want a different approach to working with AI.',
    disclosure: 'Join Pro through this link and you receive a $10 welcome bonus; I receive $10 in compute credits.',
    href: 'https://venice.ai/chat?ref=pnaIip',
    cta: 'Give $10, get $10',
    icon: Bot,
    tone: 'stack-card-venice',
  },
  {
    name: 'Gemini Credit Card',
    description: 'The card I use for everyday purchases to earn Bitcoin rewards automatically.',
    disclosure: 'This is my referral application link. Provider terms, eligibility, and rewards can change.',
    href: 'https://creditcard.exchange.gemini.com/credit-card/apply?referral_code=jljkt4e94',
    cta: 'View the card',
    icon: CreditCard,
    tone: 'stack-card-gemini',
  },
  {
    name: 'CrowdHealth',
    description: 'The community-powered health funding option my household actually uses.',
    disclosure: 'This is a referral link. Review CrowdHealth’s current terms and model before deciding whether it fits you.',
    href: 'https://www.joincrowdhealth.com/?referral_code=GQRENX',
    cta: 'Explore CrowdHealth',
    icon: ShieldCheck,
    tone: 'stack-card-crowd',
  },
  {
    name: 'Hostinger',
    description: 'Hosting I use for side projects when I want a straightforward place to get something online.',
    disclosure: 'This is an affiliate link. Plans, discounts, and included features are set by Hostinger and can change.',
    href: 'https://hostinger.com?REFERRALCODE=1CONOR59',
    cta: 'See the current offer',
    icon: Server,
    tone: 'stack-card-hostinger',
  },
];

export default function StackPage() {
  return (
    <div className="home-page min-h-screen">
      <Header />
      <main>
        <div className="home-shell stack-shell">
          <section className="stack-hero" aria-labelledby="stack-title">
            <p className="home-eyebrow">Used by me · disclosed to you</p>
            <h1 id="stack-title">My stack, without the mystery endorsements.</h1>
            <p>
              These are services and products I actually use. Every card explains what it is,
              why it is here, and what I may receive if you use the link.
            </p>
          </section>

          <aside className="stack-disclosure" aria-label="Affiliate disclosure">
            <strong>How referrals work</strong>
            <p>
              These links may earn me credit or compensation at no extra cost to you. A listing is
              not a promise that a product is right for everyone. Check the provider’s current terms
              before signing up. Read the <Link href="/terms">full disclosure</Link>.
            </p>
          </aside>

          <section className="stack-grid" aria-label="Services and products Conor uses">
            {tools.map(({ name, description, disclosure, href, cta, icon: Icon, tone }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className={`stack-card ${tone}`}
              >
                <span className="stack-card-top">
                  <span className="stack-card-icon"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /></span>
                  <span className="home-chip">Referral</span>
                </span>
                <span className="stack-card-copy">
                  <strong>{name}</strong>
                  <span>{description}</span>
                </span>
                <small>{disclosure}</small>
                <span className="stack-card-link">{cta} <ArrowUpRight size={17} aria-hidden="true" /></span>
              </a>
            ))}
          </section>

          <section className="stack-close" aria-labelledby="stack-close-title">
            <div>
              <p className="home-eyebrow">The complete drawer</p>
              <h2 id="stack-close-title">Looking for the tools I built instead?</h2>
            </div>
            <Link href="/#directory">Browse every link <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
