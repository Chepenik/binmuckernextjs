#!/usr/bin/env node
// =============================================================================
// Binmucker Value Loop — Scorecard
// -----------------------------------------------------------------------------
// The objective function for the self-improvement loop. Measures how good the
// site is at MAKING VALUE FOR OTHERS, weighted toward conversion (does the
// money path actually work and persuade?). Prints a 0-100 score, a per-category
// breakdown, and a ranked list of gaps for the /improve step to act on.
//
//   node scripts/scorecard.mjs                 # measure local build (auto-starts server)
//   node scripts/scorecard.mjs --url=https://binmucker.com   # measure production
//   node scripts/scorecard.mjs --gate          # exit 1 if any CRITICAL check fails
//   node scripts/scorecard.mjs --json          # machine-readable output
//
// Critical checks are the guardrail: the loop may never merge a change that
// breaks one. Everything else is the gradient the loop climbs.
// =============================================================================

import { spawn } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const args = process.argv.slice(2);
const getArg = (name, def) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split('=').slice(1).join('=') : def;
};
const has = (name) => args.includes(`--${name}`);

const BASE = (getArg('url', 'http://localhost:3000')).replace(/\/$/, '');
const GATE = has('gate');
const JSON_OUT = has('json');
const NO_SPAWN = has('no-spawn');
const isLocal = /localhost|127\.0\.0\.1/.test(BASE);

// Category weights — set per the chosen objective (conversion-first).
const WEIGHTS = { conversion: 0.5, performance: 0.2, seo: 0.2, accessibility: 0.1 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function ping(url) {
  try {
    const r = await fetch(url, { redirect: 'manual' });
    return r.status > 0;
  } catch {
    return false;
  }
}

// ---- page + file caches ----------------------------------------------------
const pageCache = new Map();
async function page(path, { redirect = 'follow' } = {}) {
  const key = `${path}::${redirect}`;
  if (pageCache.has(key)) return pageCache.get(key);
  let result;
  try {
    const res = await fetch(BASE + path, { redirect });
    const body = await res.text().catch(() => '');
    result = { status: res.status, body, location: res.headers.get('location') || '', bytes: Buffer.byteLength(body) };
  } catch (err) {
    result = { status: 0, body: '', location: '', bytes: 0, error: String(err) };
  }
  pageCache.set(key, result);
  return result;
}

function file(rel) {
  const p = join(ROOT, rel);
  return existsSync(p) ? readFileSync(p, 'utf8') : '';
}

// fraction of pages passing a predicate on their body
async function fractionOfPages(paths, predicate) {
  let ok = 0;
  const misses = [];
  for (const p of paths) {
    const pg = await page(p);
    if (pg.status === 200 && predicate(pg.body)) ok += 1;
    else misses.push(p);
  }
  return { score: paths.length ? ok / paths.length : 1, misses };
}

const SEO_PAGES = ['/', '/services', '/audit', '/book', '/stack', '/about'];

// ---- the checks ------------------------------------------------------------
// Each: { id, label, category, critical?, run: async () => ({ score: 0..1, note }) }
const checks = [
  // ===================== CONVERSION (the money path) =====================
  {
    id: 'book-reachable', label: 'Booking page returns 200', category: 'conversion', critical: true,
    run: async () => { const p = await page('/book'); return { score: p.status === 200 ? 1 : 0, note: `status ${p.status}` }; },
  },
  {
    id: 'book-email', label: 'Booking form captures a contact email', category: 'conversion', critical: true,
    run: async () => { const b = (await page('/book')).body; const ok = /name="email"/.test(b) && /required/.test(b); return { score: ok ? 1 : 0, note: ok ? 'email field present' : 'no required email field' }; },
  },
  {
    id: 'book-submits', label: 'Booking form actually submits somewhere', category: 'conversion', critical: true,
    run: async () => { const ok = /formsubmit\.co|action=/.test((await page('/book')).body); return { score: ok ? 1 : 0, note: ok ? 'form action present' : 'no form action' }; },
  },
  {
    id: 'services-cta-call', label: 'Services links to the call booking', category: 'conversion', critical: true,
    run: async () => { const ok = (await page('/services')).body.includes('/book?offer=call'); return { score: ok ? 1 : 0, note: ok ? 'ok' : 'missing /book?offer=call' }; },
  },
  {
    id: 'services-cta-retainer', label: 'Services links to the retainer booking', category: 'conversion',
    run: async () => { const ok = (await page('/services')).body.includes('/book?offer=retainer'); return { score: ok ? 1 : 0, note: ok ? 'ok' : 'missing /book?offer=retainer' }; },
  },
  {
    id: 'services-no-tipjar', label: 'No Bitcoin tip-jar at the money moment', category: 'conversion', critical: true,
    run: async () => { const ok = !/Support The Binmucker/i.test((await page('/services')).body); return { score: ok ? 1 : 0, note: ok ? 'clean' : 'tip jar found on /services' }; },
  },
  {
    id: 'services-guarantee', label: 'Services states a risk-reversal / guarantee', category: 'conversion',
    run: async () => { const ok = /guarantee/i.test((await page('/services')).body); return { score: ok ? 1 : 0, note: ok ? 'ok' : 'no guarantee copy' }; },
  },
  {
    id: 'home-audit-cta', label: 'Home has the free-audit primary CTA', category: 'conversion',
    run: async () => { const ok = /Get your free AI SEO audit/i.test((await page('/')).body); return { score: ok ? 1 : 0, note: ok ? 'ok' : 'no audit CTA' }; },
  },
  {
    id: 'home-services-lane', label: 'Home surfaces the services lane', category: 'conversion',
    run: async () => { const ok = /Run a local business/i.test((await page('/')).body); return { score: ok ? 1 : 0, note: ok ? 'ok' : 'no services lane' }; },
  },
  {
    id: 'contact-redirect', label: 'Old /contact funnels to /book', category: 'conversion', critical: true,
    run: async () => { const p = await page('/contact', { redirect: 'manual' }); const ok = [301, 302, 307, 308].includes(p.status) && /\/book/.test(p.location); return { score: ok ? 1 : 0, note: ok ? `→ ${p.location}` : `status ${p.status}` }; },
  },
  {
    id: 'audit-bridge', label: 'Audit results bridge to booking', category: 'conversion',
    run: async () => { const ok = file('src/app/components/audit/AuditResults.tsx').includes('/book'); return { score: ok ? 1 : 0, note: ok ? 'ok (source)' : 'AuditResults has no /book CTA' }; },
  },
  {
    id: 'no-dead-links', label: 'No dead href="#" links on key pages', category: 'conversion',
    run: async () => {
      const paths = ['/', '/services', '/book', '/stack']; const bad = [];
      for (const p of paths) if (/href="#"/.test((await page(p)).body)) bad.push(p);
      return { score: 1 - bad.length / paths.length, note: bad.length ? `dead links on ${bad.join(', ')}` : 'clean' };
    },
  },

  // ===================== PERFORMANCE (proxies) =====================
  {
    id: 'home-weight', label: 'Home HTML payload under budget (300KB)', category: 'performance',
    run: async () => { const kb = (await page('/')).bytes / 1024; return { score: kb <= 300 ? 1 : Math.max(0, 1 - (kb - 300) / 300), note: `${kb.toFixed(0)} KB` }; },
  },
  {
    id: 'font-strategy', label: 'Self-hosted fonts via next/font', category: 'performance',
    run: async () => { const ok = file('src/app/layout.tsx').includes('next/font'); return { score: ok ? 1 : 0, note: ok ? 'ok' : 'not using next/font' }; },
  },
  {
    id: 'img-optimization', label: 'Image domains configured for optimization', category: 'performance',
    run: async () => { const ok = /remotePatterns/.test(file('next.config.ts')); return { score: ok ? 1 : 0, note: ok ? 'ok' : 'no image config' }; },
  },

  // ===================== SEO / AI VISIBILITY =====================
  {
    id: 'seo-title', label: 'Pages have <title>', category: 'seo',
    run: async () => { const { score, misses } = await fractionOfPages(SEO_PAGES, (b) => /<title>/.test(b)); return { score, note: misses.length ? `missing on ${misses.join(', ')}` : 'all pages' }; },
  },
  {
    id: 'seo-description', label: 'Pages have meta description', category: 'seo',
    run: async () => { const { score, misses } = await fractionOfPages(SEO_PAGES, (b) => /name="description"/.test(b)); return { score, note: misses.length ? `missing on ${misses.join(', ')}` : 'all pages' }; },
  },
  {
    id: 'seo-canonical', label: 'Pages declare a canonical URL', category: 'seo',
    run: async () => { const { score, misses } = await fractionOfPages(SEO_PAGES, (b) => /rel="canonical"/.test(b)); return { score, note: misses.length ? `missing on ${misses.join(', ')}` : 'all pages' }; },
  },
  {
    id: 'seo-og', label: 'Pages have Open Graph tags', category: 'seo',
    run: async () => { const { score, misses } = await fractionOfPages(SEO_PAGES, (b) => /property="og:/.test(b)); return { score, note: misses.length ? `missing on ${misses.join(', ')}` : 'all pages' }; },
  },
  {
    id: 'seo-jsonld', label: 'Structured data (JSON-LD) present', category: 'seo',
    run: async () => { const ok = /application\/ld\+json/.test((await page('/')).body); return { score: ok ? 1 : 0, note: ok ? 'ok' : 'no JSON-LD' }; },
  },
  {
    id: 'seo-faq', label: 'Services has FAQ structured data', category: 'seo',
    run: async () => { const ok = /FAQPage/.test((await page('/services')).body); return { score: ok ? 1 : 0, note: ok ? 'ok' : 'no FAQPage schema' }; },
  },
  {
    id: 'seo-sitemap', label: 'Sitemap exists and lists key pages', category: 'seo',
    run: async () => { const p = await page('/sitemap.xml'); const ok = p.status === 200 && p.body.includes('/book') && p.body.includes('/services'); return { score: ok ? 1 : 0, note: ok ? 'ok' : `status ${p.status}` }; },
  },
  {
    id: 'seo-llms', label: 'llms.txt published for AI engines', category: 'seo',
    run: async () => { const p = await page('/llms.txt'); return { score: p.status === 200 ? 1 : 0, note: `status ${p.status}` }; },
  },

  // ===================== ACCESSIBILITY =====================
  {
    id: 'a11y-lang', label: 'Document declares a language', category: 'accessibility',
    run: async () => { const ok = /<html[^>]*\slang=/.test((await page('/')).body); return { score: ok ? 1 : 0, note: ok ? 'ok' : 'no lang attr' }; },
  },
  {
    id: 'a11y-img-alt', label: 'Images have alt attributes', category: 'accessibility',
    run: async () => {
      const paths = ['/', '/stack']; let total = 0, bad = 0;
      for (const p of paths) { const b = (await page(p)).body; const imgs = b.match(/<img\b[^>]*>/g) || []; total += imgs.length; bad += imgs.filter((t) => !/\balt=/.test(t)).length; }
      return { score: total ? 1 - bad / total : 1, note: total ? `${bad}/${total} missing alt` : 'no imgs' };
    },
  },
  {
    id: 'a11y-form-labels', label: 'Booking inputs are labelled', category: 'accessibility',
    run: async () => {
      const b = (await page('/book')).body;
      const inputs = (b.match(/<(input|textarea|select)\b[^>]*>/g) || []).filter((t) => !/type="hidden"/.test(t) && !/_honey/.test(t));
      const labels = (b.match(/<label\b/g) || []).length;
      return { score: inputs.length && labels >= inputs.length ? 1 : inputs.length ? Math.min(1, labels / inputs.length) : 1, note: `${labels} labels / ${inputs.length} inputs` };
    },
  },

  // ===================== HEADROOM (the gradient the loop climbs) =====================
  // Genuine, truthfully-closeable quality the site does not fully reach yet.
  {
    id: 'home-js-budget', label: 'Home JavaScript payload under budget (550KB)', category: 'performance',
    run: async () => {
      const b = (await page('/')).body;
      const srcs = [...new Set([...b.matchAll(/src="(\/_next\/[^"]+\.js)"/g)].map((m) => m[1]))];
      let bytes = 0;
      for (const s of srcs) { try { const r = await fetch(BASE + s); bytes += (await r.arrayBuffer()).byteLength; } catch { /* ignore */ } }
      const kb = bytes / 1024;
      return { score: kb <= 550 ? 1 : Math.max(0, 1 - (kb - 550) / 550), note: `${kb.toFixed(0)} KB across ${srcs.length} chunks` };
    },
  },
  {
    id: 'seo-og-image', label: 'Pages ship an OG image for rich sharing', category: 'seo',
    run: async () => { const { score, misses } = await fractionOfPages(SEO_PAGES, (b) => /property="og:image"/.test(b)); return { score, note: misses.length ? `no og:image on ${misses.join(', ')}` : 'all pages' }; },
  },
  {
    id: 'seo-twitter', label: 'Pages declare a Twitter card', category: 'seo',
    run: async () => { const { score, misses } = await fractionOfPages(SEO_PAGES, (b) => /name="twitter:card"/.test(b)); return { score, note: misses.length ? `no twitter card on ${misses.join(', ')}` : 'all pages' }; },
  },
  {
    id: 'seo-blog-schema', label: 'Blog posts expose Article structured data', category: 'seo',
    run: async () => { const p = await page('/blog/hello-world'); const ok = p.status === 200 && /"@type":\s*"(BlogPosting|Article)"/.test(p.body); return { score: ok ? 1 : 0, note: ok ? 'ok' : 'no Article/BlogPosting JSON-LD on posts' }; },
  },
  {
    id: 'a11y-single-h1', label: 'Each page has exactly one <h1>', category: 'accessibility',
    run: async () => { const paths = ['/', '/services', '/audit', '/book', '/about']; let good = 0; const bad = []; for (const p of paths) { const n = ((await page(p)).body.match(/<h1\b/g) || []).length; if (n === 1) good += 1; else bad.push(`${p}(${n})`); } return { score: good / paths.length, note: bad.length ? `not exactly one h1: ${bad.join(', ')}` : 'all pages' }; },
  },
  {
    id: 'a11y-skip-link', label: 'Skip-to-content link for keyboard users', category: 'accessibility',
    run: async () => { const b = (await page('/')).body; const ok = /skip to (main )?content/i.test(b) || /href="#main(-content)?"/.test(b); return { score: ok ? 1 : 0, note: ok ? 'ok' : 'no skip link' }; },
  },
];

// ---- run --------------------------------------------------------------------
async function main() {
  let server = null;
  if (isLocal && !(await ping(BASE)) && !NO_SPAWN) {
    if (!existsSync(join(ROOT, '.next'))) {
      console.error('No .next build found. Run `npm run build` first, or pass --url to measure a running server.');
      process.exit(2);
    }
    server = spawn('npx', ['next', 'start', '-p', new URL(BASE).port || '3000'], { cwd: ROOT, stdio: 'ignore' });
    let up = false;
    for (let i = 0; i < 60; i++) { if (await ping(BASE)) { up = true; break; } await sleep(1000); }
    if (!up) { server.kill('SIGKILL'); console.error('Server did not start in time.'); process.exit(2); }
  }

  try {
    const results = [];
    for (const c of checks) {
      let r;
      try { r = await c.run(); } catch (err) { r = { score: 0, note: `error: ${err.message}` }; }
      results.push({ ...c, score: Math.max(0, Math.min(1, r.score)), note: r.note });
    }

    const cats = {};
    for (const cat of Object.keys(WEIGHTS)) {
      const list = results.filter((r) => r.category === cat);
      const avg = list.length ? list.reduce((s, r) => s + r.score, 0) / list.length : 1;
      cats[cat] = { score: avg, weight: WEIGHTS[cat], checks: list.length };
    }
    const total = Object.values(cats).reduce((s, c) => s + c.score * c.weight, 0) * 100;
    const criticalFails = results.filter((r) => r.critical && r.score < 1);
    const gaps = results.filter((r) => r.score < 1)
      .sort((a, b) => (WEIGHTS[b.category] - WEIGHTS[a.category]) || (a.score - b.score));

    if (JSON_OUT) {
      console.log(JSON.stringify({ url: BASE, total: +total.toFixed(1), categories: cats, criticalFails: criticalFails.map((c) => c.id), gaps: gaps.map((g) => ({ id: g.id, label: g.label, category: g.category, score: +g.score.toFixed(2), critical: !!g.critical, note: g.note })) }, null, 2));
    } else {
      const bar = (s) => { const n = Math.round(s * 20); return '█'.repeat(n) + '░'.repeat(20 - n); };
      console.log(`\n  ┌─ VALUE SCORECARD ─ ${BASE}`);
      console.log(`  │`);
      console.log(`  │   TOTAL  ${total.toFixed(1)} / 100   ${bar(total / 100)}`);
      console.log(`  │`);
      for (const [name, c] of Object.entries(cats)) {
        console.log(`  │   ${name.padEnd(14)} ${(c.score * 100).toFixed(0).padStart(3)}%  ${bar(c.score)}  (×${c.weight})`);
      }
      console.log(`  │`);
      if (gaps.length) {
        console.log(`  ├─ TOP GAPS (ranked by value)`);
        for (const g of gaps.slice(0, 12)) {
          console.log(`  │   ${g.critical ? '⛔' : '·'} [${g.category}] ${g.label} — ${g.note}`);
        }
      } else {
        console.log(`  ├─ No gaps. Site is at full score on every tracked check.`);
      }
      console.log(`  └─${criticalFails.length ? ` ${criticalFails.length} CRITICAL check(s) failing` : ' all critical checks pass'}\n`);
    }

    if (GATE && criticalFails.length) {
      if (!JSON_OUT) console.error(`GATE FAILED — ${criticalFails.map((c) => c.id).join(', ')}`);
      process.exitCode = 1;
    }
  } finally {
    if (server) server.kill('SIGKILL');
  }
}

main();
