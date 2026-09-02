'use client'

import React, { useCallback, useState } from 'react'
import { Button, toast, useDocumentInfo } from '@payloadcms/ui'

import { pickPageLayout, type PageLayoutPayload } from '@/utilities/pageLayout'

import './index.scss'

export const SavePageAsTemplate: React.FC = () => {
  const { id, collectionSlug, data, hasSavePermission } = useDocumentInfo()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('custom')

  const canSave = collectionSlug === 'pages' && id && hasSavePermission

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!id || !name.trim()) return

      setLoading(true)
      try {
        const layout = pickPageLayout(data as PageLayoutPayload)
        const res = await fetch('/next/templates/save', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            pageId: id,
            name: name.trim(),
            description: description.trim() || undefined,
            category,
            hero: layout.hero,
            layout: layout.layout,
          }),
        })

        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || 'Failed to save template')
        }

        const result = (await res.json()) as { id?: number }
        toast.success('Template saved.')
        setOpen(false)
        setName('')
        setDescription('')
        if (result.id) {
          window.open(`/admin/collections/page-templates/${result.id}`, '_blank')
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to save template'
        toast.error(message)
      } finally {
        setLoading(false)
      }
    },
    [category, data, description, id, name],
  )

  if (!canSave) return null

  return (
    <div className="savePageAsTemplate">
      <Button buttonStyle="secondary" disabled={loading} onClick={() => setOpen(true)}>
        Save as template
      </Button>
      {open && (
        <div className="savePageAsTemplate__modal" role="dialog" aria-modal="true">
          <div className="savePageAsTemplate__backdrop" onClick={() => setOpen(false)} />
          <form className="savePageAsTemplate__panel" onSubmit={handleSubmit}>
            <h3>Save as page template</h3>
            <p>Copies this page&apos;s hero and content blocks into a reusable template.</p>
            <label>
              Name
              <input required value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Description
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            </label>
            <label>
              Category
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="landing">Landing</option>
                <option value="about">About</option>
                <option value="contact">Contact</option>
                <option value="custom">Custom</option>
              </select>
            </label>
            <div className="savePageAsTemplate__actions">
              <Button buttonStyle="secondary" disabled={loading} onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button disabled={loading || !name.trim()} type="submit">
                {loading ? 'Saving…' : 'Save template'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default SavePageAsTemplate
