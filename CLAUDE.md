# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 portfolio/showcase application using the App Router pattern with React 19.

### Directory Structure

- `src/app/` - App Router pages and components
  - `components/` - Reusable React components (Header, Footer, ZapModal, HomeHero, SpaceInvaders, etc.)
  - Page routes: contact, space-invaders, thank-you

### Key Patterns

- **Client Components**: Most pages use `'use client'` for interactivity
- **Server Component**: Root layout (`layout.tsx`) is a server component
- **Framer Motion**: Used for animations in Header and other components
- **Tailwind CSS**: Primary styling with custom colors (`currencyGreen`, `treasuryGold`)

### External Integrations

- **FormSubmit.co**: Contact form handling (posts to external service)
- **Bitcoin/Lightning**: ZapModal provides Bitcoin address and Strike.me link for payments
- **Ko-fi**: External donation link

### Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json)

### External Images

Images from `i.nostr.build` are allowed (configured in next.config.ts)
