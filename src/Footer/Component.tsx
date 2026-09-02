import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCachedSiteSettings } from '@/utilities/getSiteSettings'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const [footerData, site] = await Promise.all([getCachedGlobal('footer', 1)(), getCachedSiteSettings()()])

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-card text-foreground">
      <div className="container py-10 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo logo={site.logo} siteName={site.siteName} />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-foreground" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
