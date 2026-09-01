# Atelier Wellness

A basic [Payload CMS](https://payloadcms.com/) demo: a Next.js public site plus an admin panel for an editorial luxury-hospitality consulting brand.

This is original demo content. It is styled in the spirit of a cream, serif consulting site — not a copy of any live brand.

## What you get

- Public pages: Home, About, Insights (`/posts`), Contact
- CMS at `/admin` for Pages, Posts, Media, Users, Header, and Footer
- SQLite, so you do not need Postgres or Docker to try it locally
- Seeded demo copy and images (run seed from the admin dashboard)

## Run locally

Requires Node 20.9+ and [pnpm](https://pnpm.io/).

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Then open:

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

Create the first user in `/admin`. On the dashboard, click **Seed your database** to load Home, About, Insights, Contact, and demo media.

To match this environment’s preview port:

```bash
pnpm dev -- --port 43127 --hostname 0.0.0.0
```

Set `NEXT_PUBLIC_SERVER_URL` in `.env` to the same origin.

## Environment

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Local SQLite file, e.g. `file:./payload-demo.db`. On Vercel, a `postgres://` value here is also accepted. |
| `POSTGRES_URL` | Neon / Vercel Postgres connection string (required on Vercel) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token for media uploads |
| `PAYLOAD_SECRET` | JWT encryption secret |
| `NEXT_PUBLIC_SERVER_URL` | Public origin, no trailing slash |
| `CRON_SECRET` | Optional, for scheduled jobs |
| `PREVIEW_SECRET` | Draft preview |

Local development uses SQLite. On Vercel, set `POSTGRES_URL` and `BLOB_READ_WRITE_TOKEN`. Mark them available at **Build** as well as Runtime.

## Deploy on Vercel

1. Import `Vicjocaso/Payload-CMS` into your Vercel account.
2. Create Neon (serverless Postgres) and Vercel Blob, then add the env vars below to **Production** and **Preview**.
3. Redeploy. Open `/admin`, create the first user, then click **Seed your database**.

### Env vars to paste in Vercel

Add these under **Settings → Environment Variables**. Enable each for Production, Preview, and Build.

| Name | Value |
| --- | --- |
| `POSTGRES_URL` | Neon connection string (`postgres://…` or `postgresql://…`). If Neon only gave you `DATABASE_URL`, copy that same URL into `POSTGRES_URL`. |
| `BLOB_READ_WRITE_TOKEN` | Token from the Vercel Blob store |
| `PAYLOAD_SECRET` | A long random string (not `local-dev-secret`) |
| `NEXT_PUBLIC_SERVER_URL` | `https://<your-project>.vercel.app` with no trailing slash |

Optional: `CRON_SECRET`, `PREVIEW_SECRET`.

The adapter also accepts `DATABASE_URL`, `POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING`, or `DATABASE_URL_UNPOOLED` when they start with `postgres`. Prefer setting `POSTGRES_URL` so the value is unambiguous.

If `/admin` shows a server error after deploy, open `/next/health` on the same host. It reports which env vars are present and the database error message, without printing secrets.

Hobby/Pro both work. Without Postgres, CMS data will not persist on Vercel.

## Stack

Payload 3, Next.js 16, Tailwind CSS. SQLite locally; Vercel Postgres + Blob in production. Scaffolded from the [official website template](https://github.com/payloadcms/payload/tree/main/templates/website).
