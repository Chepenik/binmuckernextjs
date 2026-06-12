# The Value Loop

A guardrailed, self-improving loop whose single job is to make binmucker.com
**better at creating value for the people who visit it** — and, because value is
what gets paid for, better at earning a living honestly.

It is three things working together:

```
  SCORECARD  ──►  IMPROVE  ──►  GUARDRAIL  ──►  (score up?) ──► repeat
 (objective)     (one fix)     (can't skip)
```

## 1. Scorecard — the objective function

`scripts/scorecard.mjs` measures the live site (or a local build) and prints a
0–100 score plus a ranked list of gaps. It is weighted toward **conversion**,
because a site that doesn't turn help into a working money path doesn't feed anyone:

| Category | Weight | What it asks |
|---|---|---|
| **Conversion** | 50% | Does the money path work and persuade? Booking page live, email captured, services CTAs resolve, no tip-jar at the money moment, `/contact` funnels to `/book`, audit→book bridge, no dead links. |
| **Performance** | 20% | Is it fast? Payload budget, `next/font`, image optimization. (Proxies for now — graduate to Lighthouse later.) |
| **SEO / AI visibility** | 20% | Can people and AI engines find and quote it? Titles, descriptions, canonicals, Open Graph, JSON-LD, FAQ schema, sitemap, `llms.txt`. |
| **Accessibility** | 10% | Can everyone use it? Lang attribute, image alt text, labelled form inputs. |

Run it:

```bash
npm run scorecard                                   # local build (auto-starts the server)
node scripts/scorecard.mjs --url=https://binmucker.com   # measure production
node scripts/scorecard.mjs --json                   # machine-readable, for the loop
```

**Critical** checks (marked ⛔) are the guardrail — the money path. Tune weights or
add checks by editing the `WEIGHTS` and `checks` array in the script.

## 2. Improve — one iteration

The `/improve` command (`.claude/commands/improve.md`) runs a single iteration:
measure → pick the highest-value gap → fix it → verify → open a PR. One gap per
iteration, smallest change that closes it, matched to the existing design system.

Run a single pass, or loop it:

```
/improve
/loop /improve        # keep iterating until the score plateaus
```

## 3. Guardrail — the gate it can't bypass

```bash
npm run verify   # next build + scorecard --gate  (exits non-zero if any critical check fails)
npm run lint
```

The loop may **never** merge a change that fails the build, lint, or a critical check.
Failure → revert and stop. This is what makes it safe to run unattended.

## Weekly cloud routine

A scheduled Claude Code routine runs `/improve` every week, opens a "weekly value"
PR, and leaves it for review. It proposes; a human merges. Nothing reaches `main`
without the guardrail passing and a human clicking merge.

## How to extend it

- **New value axis?** Add checks to the scorecard (e.g. an "education / enablement"
  category that rewards clear explainers and free tools).
- **Tighter perf?** Swap the perf proxies for a real Lighthouse run.
- **More autonomy?** Only after the test suite (`npm test`) has real coverage — the
  loop is only ever as safe as its guardrail.
