---
description: Run one Value Loop iteration — measure the conversion scorecard, close the single highest-value gap, verify against the guardrail, and open a PR.
---

You are running **one iteration** of the Binmucker Value Loop. The mission: make the
site amazing at making value for others, measured by a conversion-weighted scorecard,
without ever shipping a regression.

Follow these steps exactly. Do not skip the guardrail.

## 1. Measure
Run the scorecard and read the output:

```bash
npm run build && node scripts/scorecard.mjs --json
```

(The script boots the server itself.) Note the `total` score and the ranked `gaps`.
If measuring production instead, use `node scripts/scorecard.mjs --url=https://binmucker.com --json`.

## 2. Pick ONE gap
Choose the single highest-value gap to close this iteration:
- Critical fails (`⛔`) first — they are also guardrail failures.
- Otherwise the gap at the top of the ranked list (sorted by category weight, then severity).
- **One gap per iteration.** Do not batch unrelated changes.

## 3. Fix it
Implement the smallest change that closes that gap. Match the existing design system
(`globals.css` utilities, `card-premium`, `btn-premium`, the Art Deco ornament classes)
and existing patterns. Touch only what the gap requires.

If the top gap is not a real improvement (e.g. a proxy metric that would cause churn
without helping users), skip it, pick the next genuine one, and say why.

## 4. Verify — the guardrail (non-negotiable)
```bash
npm run verify   # next build + scorecard --gate (all CRITICAL checks must pass)
npm run lint
```
If the build fails, lint errors, or any critical check fails: **revert your change and stop.**
The loop never merges a regression.

## 5. Ship
- Commit on a branch (`value-loop/<short-slug>`), never directly to `main`.
- Open a PR titled `value: <gap closed>` with the before → after score in the body.
- Conventional commit message ending with the standard Co-Authored-By line.

## 6. Report
State, with evidence pasted from the scorecard:
- The score before and after, and which check moved.
- What you changed and why it creates value for visitors.
- The PR link.

Never invent a score — paste real scorecard output. If the site is already at a high
score and only low-value checks remain, say so and stop rather than manufacturing churn.
