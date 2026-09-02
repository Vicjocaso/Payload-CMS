import type { CollectionSlug, Payload, PayloadRequest } from 'payload'

/**
 * Remove all documents from a collection. For versioned collections, delete
 * version rows before and after main rows so orphaned drafts cannot survive.
 */
export async function wipeCollection(
  payload: Payload,
  collection: CollectionSlug,
  req: PayloadRequest,
): Promise<void> {
  const hasVersions = Boolean(payload.collections[collection]?.config?.versions)

  if (hasVersions) {
    await payload.db.deleteVersions({ collection, req, where: {} })
  }

  await payload.db.deleteMany({ collection, req, where: {} })

  if (hasVersions) {
    await payload.db.deleteVersions({ collection, req, where: {} })
  }

  const remaining = await payload.find({
    collection,
    draft: true,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    req,
  })

  if (remaining.totalDocs > 0) {
    throw new Error(
      `Could not fully clear collection "${collection}" (${remaining.totalDocs} documents remain).`,
    )
  }
}
