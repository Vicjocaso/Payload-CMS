import path from 'path'
import { fileURLToPath } from 'url'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isPostgresUrl = (url: string | undefined): url is string => {
  if (!url) return false
  return url.startsWith('postgres://') || url.startsWith('postgresql://')
}

/**
 * Neon and Vercel Postgres use several names. Accept any of them so a
 * Marketplace database still works if only DATABASE_URL is set.
 */
export const getPostgresConnectionString = (): string | undefined => {
  const candidates = [
    process.env.POSTGRES_URL,
    process.env.DATABASE_URL,
    process.env.POSTGRES_PRISMA_URL,
    process.env.POSTGRES_URL_NON_POOLING,
    process.env.DATABASE_URL_UNPOOLED,
  ]

  return candidates.find(isPostgresUrl)
}

export const hasPostgresDatabase = (): boolean => Boolean(getPostgresConnectionString())

const postgresAdapterOptions = (connectionString?: string) => ({
  // Neon cannot CREATE DATABASE from the connection user.
  disableCreateDatabase: true,
  migrationDir: path.resolve(dirname, 'migrations'),
  // Drizzle push is skipped when NODE_ENV=production. These SQL migrations
  // run on first Payload init so /admin works against an empty Neon database.
  prodMigrations: migrations,
  push: false,
  ...(connectionString
    ? {
        pool: {
          connectionString,
        },
      }
    : {}),
})

export const getDatabaseAdapter = () => {
  const connectionString = getPostgresConnectionString()

  if (connectionString) {
    if (!process.env.POSTGRES_URL) {
      process.env.POSTGRES_URL = connectionString
    }

    return vercelPostgresAdapter(postgresAdapterOptions(connectionString))
  }

  // migrate:create uses a dummy POSTGRES_URL so the Postgres adapter is used
  // even though the local app still runs on SQLite.
  if (process.env.PAYLOAD_MIGRATING === 'true' || process.env.VERCEL) {
    return vercelPostgresAdapter(postgresAdapterOptions(process.env.POSTGRES_URL))
  }

  return sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./payload-demo.db',
    },
  })
}

export const getAllowedOrigins = (): string[] => {
  const origins = new Set<string>()

  const add = (value?: string) => {
    if (!value) return
    const trimmed = value.replace(/\/$/, '')
    origins.add(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
  }

  add(process.env.NEXT_PUBLIC_SERVER_URL)
  add(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  add(process.env.VERCEL_URL)
  add('http://localhost:3000')
  add('http://127.0.0.1:3000')
  add('http://localhost:43127')
  add('http://127.0.0.1:43127')

  return [...origins]
}
