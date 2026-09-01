import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

export const getDatabaseAdapter = () => {
  if (process.env.POSTGRES_URL) {
    return vercelPostgresAdapter()
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
