'use client'

import React from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

export const UseTemplateButton: React.FC = () => {
  const { id, collectionSlug } = useDocumentInfo()

  if (collectionSlug !== 'page-templates' || !id) return null

  const href = `/admin/collections/pages/create?template=${id}`

  return (
    <a className="btn btn--icon-style-without-border btn--size-medium btn--style-secondary" href={href}>
      Create page from template
    </a>
  )
}

export default UseTemplateButton
