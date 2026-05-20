# Roadmap

## Week 1 — Foundation ✅
- [x] Repo scaffold (Next.js 15, TS strict, Tailwind v4)
- [x] Security headers (CSP, HSTS, Permissions-Policy)
- [x] Legal pages (Privacy, Terms, Legal, Third-Party Notices)
- [x] SEO scaffolding (sitemap, robots, metadata API)
- [x] 8 tool route shells + placeholder ToolIsland
- [x] CI (lint, typecheck, test, build)
- [x] Dependabot

## Week 2 — Math core
- [ ] `lib/workers/math.worker.ts` (transferable typed arrays)
- [ ] Pratt parser for math expressions
- [ ] Evaluator with decimal.js precision
- [ ] Linear equation step engine (`2x + 3 = 11` → steps)
- [ ] KaTeX rendering pipeline
- [ ] Vitest unit tests for parser + eval
- [ ] Scientific calculator UI v1

## Week 3 — Tools breadth
- [ ] Fraction, Percentage, GPA, Unit Converter — full UI + logic
- [ ] Equation Solver (quadratic + systems)
- [ ] Matrix (add, mul, inv, det) using ml-matrix

## Week 4 — Graphing + Programmatic SEO
- [ ] Graphing tool (function-plot or uPlot)
- [ ] `/solve/[expr]`, `/convert/[from]/[to]/[value]`, `/fraction/[op]/[a]/[b]` ISR routes
- [ ] JSON-LD per page (Calculator, FAQ schema)
- [ ] 30 launch programmatic pages

## Weeks 5–8 — Content + Polish
- [ ] 10 launch articles (MDX)
- [ ] Dark mode toggle, a11y audit (WCAG 2.2 AA)
- [ ] PWA shell + offline math engine
- [ ] OG image generator
- [ ] Playwright E2E smoke tests

## Weeks 9–12 — Launch prep
- [ ] Sentry, Plausible, GSC, Bing, IndexNow live
- [ ] Lighthouse CI gates (LCP < 1.2s, INP < 100ms)
- [ ] AdSense application
- [ ] Press kit
- [ ] Public launch (Product Hunt, HN, r/learnmath)
