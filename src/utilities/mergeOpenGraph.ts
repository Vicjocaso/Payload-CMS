import type { Metadata } from 'next'

import { DEFAULT_SITE_NAME } from '@/constants/site'
import { getServerSideURL } from './getURL'

const defaultOpenGraph = (siteName = DEFAULT_SITE_NAME): Metadata['openGraph'] => ({
  type: 'website',
  description: 'Advisory for hotel spa operations, openings, and leadership.',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName,
  title: siteName,
})

export const mergeOpenGraph = (
  og?: Metadata['openGraph'],
  siteName = DEFAULT_SITE_NAME,
): Metadata['openGraph'] => {
  const base = defaultOpenGraph(siteName)

  return {
    ...base,
    ...og,
    images: og?.images ? og.images : base?.images,
  }
}
