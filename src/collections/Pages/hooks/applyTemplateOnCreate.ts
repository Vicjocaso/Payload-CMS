import type { CollectionBeforeChangeHook } from 'payload'

import { layoutFromTemplate } from '@/utilities/pageLayout'

export const applyTemplateOnCreate: CollectionBeforeChangeHook = async ({
  data,
  operation,
  req,
}) => {
  if (operation !== 'create') return data

  const templateRef = data?.sourceTemplate
  const templateId =
    typeof templateRef === 'object' && templateRef !== null && 'id' in templateRef
      ? templateRef.id
      : templateRef

  if (!templateId) return data

  const template = await req.payload.findByID({
    collection: 'page-templates',
    id: templateId,
    depth: 0,
    overrideAccess: true,
  })

  if (!template) return data

  const layout = layoutFromTemplate(template)
  data.hero = layout.hero
  data.layout = layout.layout
  delete data.sourceTemplate

  return data
}
