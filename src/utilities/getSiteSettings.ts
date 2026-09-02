import type { Media, Site } from '@/payload-types'

import { DEFAULT_SITE_NAME } from '@/constants/site'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

export type SiteSettings = {
  siteName: string
  logo: Media | null
}

const fallback: SiteSettings = {
  siteName: DEFAULT_SITE_NAME,
  logo: null,
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const payload = await getPayload({ config: configPromise })

    const site = (await payload.findGlobal({
      slug: 'site',
      depth: 1,
    })) as Site

    const logo = site?.logo && typeof site.logo === 'object' ? site.logo : null

    return {
      siteName: site?.siteName?.trim() || DEFAULT_SITE_NAME,
      logo,
    }
  } catch (error) {
    console.warn('[atelier] Could not load site settings.', error)
    return fallback
  }
}

export const getCachedSiteSettings = () =>
  unstable_cache(async () => getSiteSettings(), ['site-settings'], {
    tags: ['global_site'],
  })
