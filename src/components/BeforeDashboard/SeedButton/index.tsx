'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

import './index.scss'

const SEED_CONFIRM_MESSAGE =
  'This replaces demo pages, posts, media, forms, templates, and redirects with fresh sample content. Your admin login is kept. Continue?'

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (loading) {
        toast.info('Seeding already in progress.')
        return
      }

      if (error) {
        toast.error('An error occurred on the last attempt. Refresh the page and try again.')
        return
      }

      if (!window.confirm(SEED_CONFIRM_MESSAGE)) {
        return
      }

      setLoading(true)

      try {
        const res = await fetch('/next/seed', { method: 'POST', credentials: 'include' })

        if (!res.ok) {
          throw new Error('Seed request failed')
        }

        toast.success('Database seeded. Reloading admin…')

        // Full navigation clears stale document URLs (e.g. ?notFound=null after re-seed).
        window.location.assign('/admin/collections/pages')
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        setError(message)
        setLoading(false)
        toast.error('An error occurred while seeding.')
      }
    },
    [loading, error],
  )

  let message = ''
  if (loading) message = ' (seeding...)'
  if (error) message = ` (error: ${error})`

  return (
    <Fragment>
      <button className="seedButton" disabled={loading} onClick={handleClick} type="button">
        Seed your database
      </button>
      {message}
    </Fragment>
  )
}
