import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCachedSiteSettings } from '@/utilities/getSiteSettings'
import React from 'react'

export async function Header() {
  const [headerData, site] = await Promise.all([getCachedGlobal('header', 1)(), getCachedSiteSettings()()])

  return <HeaderClient data={headerData} site={site} />
}
