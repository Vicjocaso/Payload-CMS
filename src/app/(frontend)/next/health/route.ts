import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getBlobReadWriteToken } from '@/database'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const envFlag = (name: string) => {
  const raw = process.env[name]
  const value = raw?.trim().replace(/^['"]|['"]$/g, '')
  if (!value) return { present: false as const, kind: 'missing' as const }
  if (value.startsWith('postgres://') || value.startsWith('postgresql://')) {
    return { present: true as const, kind: 'postgres' as const }
  }
  if (value.startsWith('file:')) {
    return { present: true as const, kind: 'sqlite-file' as const }
  }
  return { present: true as const, kind: 'other' as const }
}

export async function GET() {
  const rawBlob = process.env.BLOB_READ_WRITE_TOKEN
  const blobToken = getBlobReadWriteToken()

  const env = {
    POSTGRES_URL: envFlag('POSTGRES_URL'),
    DATABASE_URL: envFlag('DATABASE_URL'),
    POSTGRES_PRISMA_URL: envFlag('POSTGRES_PRISMA_URL'),
    POSTGRES_URL_NON_POOLING: envFlag('POSTGRES_URL_NON_POOLING'),
    DATABASE_URL_UNPOOLED: envFlag('DATABASE_URL_UNPOOLED'),
    BLOB_READ_WRITE_TOKEN: {
      present: Boolean(rawBlob),
      valid: Boolean(blobToken),
      quoted: Boolean(rawBlob && (rawBlob.trim().startsWith('"') || rawBlob.trim().startsWith("'"))),
      length: rawBlob?.trim().length ?? 0,
      hasPrefix: Boolean(rawBlob?.includes('vercel_blob_rw_')),
    },
    PAYLOAD_SECRET: { present: Boolean(process.env.PAYLOAD_SECRET) },
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || null,
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const users = await payload.find({
      collection: 'users',
      limit: 1,
      overrideAccess: true,
    })

    return Response.json({
      ok: true,
      env,
      users: users.totalDocs,
    })
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error))
    return Response.json(
      {
        ok: false,
        env,
        error: {
          name: err.name,
          message: err.message,
        },
      },
      { status: 500 },
    )
  }
}
