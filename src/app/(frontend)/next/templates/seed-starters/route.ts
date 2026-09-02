import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import { seedPageTemplates } from '@/endpoints/seed/page-templates'

export const maxDuration = 60

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  const existing = await payload.find({
    collection: 'page-templates',
    limit: 1,
    overrideAccess: true,
  })

  if (existing.totalDocs > 0) {
    return Response.json({ success: true, skipped: true, count: existing.totalDocs })
  }

  const media = await payload.find({
    collection: 'media',
    limit: 2,
    overrideAccess: true,
  })

  const forms = await payload.find({
    collection: 'forms',
    limit: 1,
    overrideAccess: true,
  })

  if (media.docs.length < 1) {
    return new Response('Upload at least one media item first.', { status: 400 })
  }

  const payloadReq = await createLocalReq({ user }, payload)

  const contactFormId = forms.docs[0]?.id

  await seedPageTemplates({
    payload,
    req: payloadReq,
    heroImage: media.docs[0],
    metaImage: media.docs[1] ?? media.docs[0],
    contactFormId,
  })

  const count = await payload.count({ collection: 'page-templates', overrideAccess: true })

  return Response.json({ success: true, skipped: false, count: count.totalDocs })
}
