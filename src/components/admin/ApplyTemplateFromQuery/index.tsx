'use client'

import React, { useEffect, useRef } from 'react'
import { toast, useFormFields } from '@payloadcms/ui'

export const ApplyTemplateFromQuery: React.FC = () => {
  const appliedRef = useRef(false)
  const [, dispatchFields] = useFormFields(([_, dispatch]) => [dispatch])

  useEffect(() => {
    if (appliedRef.current) return
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const templateId = params.get('template')
    if (!templateId || templateId === 'null' || templateId === 'undefined') return

    appliedRef.current = true

    const apply = async () => {
      try {
        const res = await fetch(`/api/page-templates/${templateId}?depth=0`, {
          credentials: 'include',
          headers: { Accept: 'application/json' },
        })
        if (!res.ok) throw new Error('Could not load template')
        const template = await res.json()
        dispatchFields({
          type: 'UPDATE',
          path: 'sourceTemplate',
          value: templateId,
        })
        dispatchFields({
          type: 'UPDATE',
          path: 'hero',
          value: template.hero,
        })
        dispatchFields({
          type: 'UPDATE',
          path: 'layout',
          value: template.layout,
        })
        toast.success('Template layout applied. Set title and slug, then save.')
      } catch {
        toast.error('Could not apply template from URL.')
      }
    }

    apply()
  }, [dispatchFields])

  return null
}

export default ApplyTemplateFromQuery
