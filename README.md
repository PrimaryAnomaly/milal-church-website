# Milal Church Website

Next.js App Router site for Milal Church with a file-backed posts store and admin area.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Optional Vercel Blob for image uploads
- Posts in data/posts.json via src/lib/posts.ts (Postgres-ready abstraction)
- Admin cookie auth using the secret from the environment example file

## Getting started

1. Install dependencies with your Node package manager
2. Copy the env example file to a local env file
3. Set the admin secret (and optional blob token)
4. Run the development server script from package.json

Then open http://localhost:3000

## Scripts

- dev: development server
- build: production build
- start: production server
- lint: ESLint

## Env vars

- Admin secret: required to sign in at /admin/login
- Blob read/write token: optional; when unset, uploads are skipped and you can paste image URLs

## Pages

- / home
- /about
- /posts and /posts/[slug]
- /admin/login, /admin, /admin/edit/[id]

## Posts storage

src/lib/posts.ts reads/writes data/posts.json (committed as empty array).
Replace that module later for Postgres without changing callers.

## Language (planned)

Public UI will be bilingual English + Korean. Default English; initial locale follows the browser; Header EN/KO toggle persists preference (see SPEC REQ-MILAL-I18N-* / PLAN Batch Bi18n). Same URL paths for both locales.
