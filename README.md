# MathLab

> Student Math Toolkit Platform — original calculators, step-by-step CAS, programmatic SEO.

Built with **Next.js 15 (App Router, RSC)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**.

## Quick start

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Stack

| Area | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Math (symbolic) | algebrite, nerdamer |
| Math (numeric) | mathjs, decimal.js, ml-matrix |
| Rendering | KaTeX |
| State | Zustand + URL state |
| Forms | react-hook-form + zod |
| DB | Prisma + Postgres (Supabase) |
| Auth | Auth.js v5 |
| Analytics | Plausible (cookieless) |
| Errors | Sentry |
| Testing | Vitest + Playwright |
| Deploy | Vercel |

## Architecture

See `docs/blueprint.md` for the full senior architecture document.

## Scripts

```bash
pnpm dev          # Next dev server
pnpm build        # Production build
pnpm start        # Run prod server
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
pnpm test         # Vitest
pnpm test:e2e     # Playwright
```

## Deploy

Auto-deploys to Vercel on push to `main`. Preview deploys per PR.

## Legal

- See `LEGAL.md`, `PRIVACY.md`, `TERMS.md`, `THIRD_PARTY_NOTICES.md`.
- **No TI / Casio / HP / Desmos ROMs, emulators, fonts, or logos.** Original UI only.

## License

MIT — see `LICENSE`.
