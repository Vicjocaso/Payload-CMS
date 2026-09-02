import type { Page } from '@/payload-types'

export type PageLayoutPayload = Pick<Page, 'hero' | 'layout'>

export const pickPageLayout = (doc: {
  hero?: PageLayoutPayload['hero']
  layout?: PageLayoutPayload['layout']
}): PageLayoutPayload => ({
  hero: doc.hero ?? { type: 'none' },
  layout: doc.layout ?? [],
})

export const layoutFromTemplate = (template: {
  hero?: PageLayoutPayload['hero']
  layout?: PageLayoutPayload['layout']
}): PageLayoutPayload => pickPageLayout(template)
