import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

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

export const getDatabaseAdapter = () => {
  const connectionString = getPostgresConnectionString()

  if (connectionString) {
    // @vercel/postgres looks up POSTGRES_URL internally.
    if (!process.env.POSTGRES_URL) {
      process.env.POSTGRES_URL = connectionString
    }

    return vercelPostgresAdapter({
      pool: { connectionString },
      // No committed migrations yet — create tables on first connect so
      // Vercel builds and /admin work against an empty Neon database.
      push: true,
    })
  }

  if (process.env.VERCEL) {
    // Never fall back to SQLite on Vercel: the serverless FS has no tables.
    return vercelPostgresAdapter({
      push: true,
    })
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
