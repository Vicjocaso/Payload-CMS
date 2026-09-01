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
| `DATABASE_URL` | Local SQLite file, e.g. `file:./payload-demo.db` |
| `POSTGRES_URL` | Vercel Postgres connection string (production) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token for media uploads |
| `PAYLOAD_SECRET` | JWT encryption secret |
| `NEXT_PUBLIC_SERVER_URL` | Public origin, no trailing slash |
| `CRON_SECRET` | Optional, for scheduled jobs |
| `PREVIEW_SECRET` | Draft preview |

Local development uses SQLite. On Vercel, set `POSTGRES_URL` and `BLOB_READ_WRITE_TOKEN` from **Storage**.

## Deploy on Vercel

1. Import this repo into the Qualgen US team (or connect the Cursor Origin git remote).
2. In the project: **Storage → Create Database → Postgres**, then **Storage → Create → Blob**.
3. Settings → Environment Variables: set `PAYLOAD_SECRET` to a long random string, and `NEXT_PUBLIC_SERVER_URL` to `https://<your-project>.vercel.app` (no trailing slash). Vercel fills `POSTGRES_URL` and `BLOB_READ_WRITE_TOKEN` when you connect those stores.
4. Redeploy. Open `/admin`, create the first user, then seed demo content.

Hobby/Pro both work. Without Postgres, CMS data will not persist on Vercel.

## Stack

Payload 3, Next.js 16, Tailwind CSS. SQLite locally; Vercel Postgres + Blob in production. Scaffolded from the [official website template](https://github.com/payloadcms/payload/tree/main/templates/website).
