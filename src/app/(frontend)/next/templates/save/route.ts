import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'

import type { Page } from '@/payload-types'

export const maxDuration = 60

type SaveBody = {
  pageId?: number | string
  name?: string
  description?: string
  category?: string
  hero?: unknown
  layout?: unknown
}

export async function POST(request: Request): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  let body: SaveBody
  try {
    body = (await request.json()) as SaveBody
  } catch {
    return new Response('Invalid JSON body.', { status: 400 })
  }

  const name = body.name?.trim()
  if (!name) {
    return new Response('Template name is required.', { status: 400 })
  }

  let hero = body.hero
  let layout = body.layout

  if (body.pageId && (!hero || !layout)) {
    const page = await payload.findByID({
      collection: 'pages',
      id: body.pageId,
      depth: 0,
      overrideAccess: false,
      user,
    })
    hero = page.hero
    layout = page.layout
  }

  if (!layout) {
    return new Response('Layout is required.', { status: 400 })
  }

  const payloadReq = await createLocalReq({ user }, payload)

  const template = await payload.create({
    collection: 'page-templates',
    data: {
      name,
      description: body.description?.trim() || undefined,
      category: (body.category as 'landing' | 'about' | 'contact' | 'custom') || 'custom',
      hero: hero as Page['hero'],
      layout: layout as Page['layout'],
    },
    req: payloadReq,
    overrideAccess: false,
    user,
  })

  return Response.json({ success: true, id: template.id })
}
