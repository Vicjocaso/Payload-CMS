import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

import type { Media } from '@/payload-types'

import { DEFAULT_SITE_NAME } from '@/constants/site'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  logo?: Media | null
  priority?: 'auto' | 'high' | 'low'
  siteName?: string
}

export const Logo = (props: Props) => {
  const { className, loading = 'lazy', logo, priority = 'low', siteName = DEFAULT_SITE_NAME } = props

  if (logo?.url) {
    return (
      <Image
        alt={logo.alt || siteName}
        className={clsx('h-8 w-auto max-w-[12rem] object-contain object-left', className)}
        height={logo.height || 32}
        loading={loading}
        priority={priority === 'high'}
        src={logo.url}
        width={logo.width || 160}
      />
    )
  }

  return (
    <span
      className={clsx(
        'font-serif text-[1.35rem] leading-none tracking-[0.04em] text-current',
        className,
      )}
    >
      {siteName}
    </span>
  )
}
