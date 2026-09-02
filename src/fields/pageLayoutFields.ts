import type { Field } from 'payload'

import { Archive } from '@/blocks/ArchiveBlock/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'
import { FormBlock } from '@/blocks/Form/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { hero } from '@/heros/config'

export const pageLayoutBlocks = [CallToAction, Content, MediaBlock, Archive, FormBlock]

export const pageLayoutBlocksField: Field = {
  name: 'layout',
  type: 'blocks',
  blocks: pageLayoutBlocks,
  required: true,
  admin: {
    initCollapsed: true,
  },
}

/** Hero + content blocks for page-templates (no SEO). */
export const pageLayoutTabFields: Field[] = [
  {
    type: 'tabs',
    tabs: [
      {
        fields: [hero],
        label: 'Hero',
      },
      {
        fields: [pageLayoutBlocksField],
        label: 'Content',
      },
    ],
  },
]
