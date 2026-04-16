# Portfolio App (Cloudflare Pages + D1 + R2)

This project runs a React frontend with Cloudflare Pages Functions as the backend layer.

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Cloudflare Pages Functions
- Database: Cloudflare D1 (`DB`)
- Storage: Cloudflare R2 (`R2_ASSETS`)

## Local Development

```bash
npm install
npm run dev
```

For Pages Functions + bindings locally:

```bash
npm run preview
```

## Admin Setup

1. Create a D1 database and set `d1_databases[0].database_id` in `wrangler.jsonc`.
2. Create an R2 bucket and set `r2_buckets[0].bucket_name` in `wrangler.jsonc` for binding `R2_ASSETS`.
3. Set admin secret:
```bash
npx wrangler secret put ADMIN_PASSWORD
```
4. Run migrations in order:
```bash
npx wrangler d1 migrations apply prince_portfolio --local
npx wrangler d1 migrations apply prince_portfolio --remote
```

## Verification Checklist

Run these commands before deploy:

```bash
npm run lint
npm run test:unit
npx tsc -p tsconfig.app.json --noEmit
npm run build
```

## Manual QA Checklist

- Website section save updates public page content.
- Portfolio create, edit, publish, and delete flows work.
- Portfolio image upload stores objects in R2 and returns a usable URL.
- Inquiry submission appears in admin list; status and archive updates persist.
- Dashboard summary counters reflect current DB values.
- Settings password update is enforced on next login.
