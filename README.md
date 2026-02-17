# Binmucker

Personal portfolio and tools site built with Next.js 16, React 19, and Tailwind CSS.

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment template and add your keys
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other commands

```bash
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
npm run test     # Run tests (Jest)
```

## Key Routes

| Route | Description |
|---|---|
| `/` | Homepage with Digital Creations link grid |
| `/audit` | Free AI-powered local business SEO audit |
| `/space-invaders` | Retro arcade game with 5 levels and boss fights |
| `/breathe` | Breathing exercise app with 5 science-backed patterns |
| `/about` | About page |
| `/blog` | Blog |
| `/contact` | Contact form |

## Project Structure

```
src/
├── app/
│   ├── api/audit/        # Audit API route (NVIDIA LLM + web scraping)
│   ├── audit/            # Audit page
│   ├── components/
│   │   ├── audit/        # AuditHero, AuditForm, AuditResults, LoadingState
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HomeHero.tsx
│   │   ├── SpaceInvaders.tsx
│   │   └── ...
│   └── ...
├── lib/
│   ├── scraper.ts            # Website scraping orchestrator
│   ├── scraper-html.ts       # HTML content extraction
│   ├── scraper-pagespeed.ts  # PageSpeed Insights integration
│   ├── ai-readiness.ts       # AI readiness scoring
│   ├── audit-constants.ts    # Scoring constants
│   └── ...
└── types/                    # TypeScript type definitions
```

## Environment Variables

See `.env.example` for required variables. Never commit `.env.local` or real API keys.

| Variable | Purpose |
|---|---|
| `NVIDIA_API_KEY` | NVIDIA API key for the audit LLM |

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Make your changes
4. Run `npm run build` and `npm run lint` to verify
5. Commit with a clear message
6. Open a pull request against `main`

## Security

- Do not commit secrets or API keys. Use environment variables via `.env.local`.
- `.env.local` is gitignored. `.env.example` contains only placeholder values.
- If you discover a security issue, please open a GitHub issue or contact the maintainer directly.

## License

The source code in this repository is licensed under the [MIT License](./LICENSE).

## Trademark and Brand

The Binmucker name, logos, copy, visual design assets, and other brand/business materials in this repository are not licensed under the MIT License. All rights to the Binmucker brand are reserved by Binmucker LLC. You may not use the Binmucker name, logos, or brand assets in ways that suggest endorsement or affiliation without prior written permission.

## Links

- [YouTube](https://www.youtube.com/@ConorChepenik)
- [Medium](https://medium.com/@chepenikconor)
