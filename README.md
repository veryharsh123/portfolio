# portfolio

Harsh Ahuja's portfolio, served at portfolio.colocweb.com. Next.js 15, one static page.

- Content lives in `app/page.tsx` (the `SHIPPED`, `EXPERIENCE`, `OTHER`, `PUBLICATIONS` and `EDUCATION` lists at the top).
- The contribution graph pulls github.com/veryharsh123's public calendar at most once a day
  (`lib/contributions.ts`), falling back to `data/contributions-fallback.json` if GitHub is unreachable.
- `npm run dev` to work on it, `npm run build` to check it.

## Deploy

1. Push to a new GitHub repo and import it in Vercel (framework: Next.js).
2. In the Vercel project, add the domain `portfolio.colocweb.com`.
3. At the DNS provider for colocweb.com, add `CNAME portfolio -> cname.vercel-dns.com`.
