# Privacy

See `app/privacy/page.tsx` for the user-facing version.

## Internal notes
- Cookieless analytics (Plausible).
- No PII collected for anonymous users.
- Accounts (Phase 2): email only, hashed sessions via Auth.js.
- Data residency: Supabase EU region for EU users; US for others.
- Retention: anonymous logs 30 days; account data until deletion request.
- Subprocessors: Vercel, Supabase, Upstash, Cloudflare, Sentry, Plausible, Resend.
