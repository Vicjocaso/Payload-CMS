import { hasPostgresDatabase } from '@/database'

/**
 * Vercel `next build` calls generateStaticParams. An empty or missing
 * database must not fail the deploy — pages render on demand instead.
 */
export async function safeStaticParams<T>(generate: () => Promise<T[] | undefined>): Promise<T[]> {
  if (process.env.VERCEL && !hasPostgresDatabase()) {
    return []
  }

  try {
    return (await generate()) ?? []
  } catch (error) {
    console.warn('[atelier] Skipping static params; database is not ready yet.', error)
    return []
  }
}
