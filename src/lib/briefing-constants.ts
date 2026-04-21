export const BRIEFING_THEMES = [
  {
    id: 'invisible-bitcoin',
    name: 'Invisible Bitcoin',
    prompt: `Generate 3-5 concrete, actionable Bitcoin integration ideas for businesses that make Bitcoin invisible to the end user. Focus on scenarios where Bitcoin/Lightning rails replace traditional payment infrastructure without the customer needing to know or care about Bitcoin. Each idea should include a specific business type, the integration mechanism, and why it's better than the traditional approach.`,
  },
  {
    id: 'circular-economy',
    name: 'Circular Economy',
    prompt: `Generate 3-5 concrete, actionable ideas for building circular Bitcoin economies in local communities. Focus on how local businesses, freelancers, and service providers can create closed loops where Bitcoin earned is Bitcoin spent locally. Each idea should include specific participant types, incentive structures, and realistic first steps.`,
  },
  {
    id: 'dev-infrastructure',
    name: 'Developer Infrastructure',
    prompt: `Generate 3-5 concrete, actionable ideas for developer tools and infrastructure built on Bitcoin/Lightning. Focus on tools that solve real developer pain points (payments, authentication, content delivery, API monetization, etc.) using Lightning rails. Each idea should include the technical approach, target developer audience, and competitive advantage over non-Bitcoin alternatives.`,
  },
  {
    id: 'agent-commerce',
    name: 'Agent Commerce',
    prompt: `Generate 3-5 concrete, actionable ideas for AI agent-to-agent commerce using Bitcoin/Lightning. Focus on scenarios where autonomous AI agents need to pay each other for services, data, or compute without human intervention. Each idea should include the agent workflow, payment mechanism (L402, Lightning, etc.), and why Bitcoin is uniquely suited for machine-to-machine payments.`,
  },
  {
    id: 'onboarding-funnels',
    name: 'Onboarding Funnels',
    prompt: `Generate 3-5 concrete, actionable ideas for Bitcoin onboarding funnels that convert nocoiners into regular Bitcoin users. Focus on psychological triggers, value propositions that resonate with non-technical people, and progressive disclosure strategies. Each idea should include the target demographic, the hook, the first transaction experience, and the retention mechanism.`,
  },
] as const;

export type BriefingThemeId = (typeof BRIEFING_THEMES)[number]['id'];

export interface BriefingIdea {
  title: string;
  description: string;
  businessType: string;
  implementation: string;
  whyBitcoin: string;
}

export interface Briefing {
  id: string;
  date: string;
  theme: string;
  themeId: string;
  ideas: BriefingIdea[];
  generatedAt: string;
}

export function getTodaysTheme(): (typeof BRIEFING_THEMES)[number] {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return BRIEFING_THEMES[dayOfYear % BRIEFING_THEMES.length];
}

export function generateBriefingId(): string {
  const date = new Date().toISOString().split('T')[0];
  return `briefing-${date}`;
}
