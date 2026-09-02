import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { pageLayoutTabFields } from '@/fields/pageLayoutFields'

export const PageTemplates: CollectionConfig<'page-templates'> = {
  slug: 'page-templates',
  labels: {
    singular: 'Page Template',
    plural: 'Page Templates',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    group: 'Templates',
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'updatedAt'],
    description: 'Reusable page layouts (hero and content blocks). Save from a page or start a new page from a template.',
    components: {
      edit: {
        beforeDocumentControls: ['@/components/admin/UseTemplateButton'],
      },
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'custom',
      options: [
        { label: 'Landing', value: 'landing' },
        { label: 'About', value: 'about' },
        { label: 'Contact', value: 'contact' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    ...pageLayoutTabFields,
  ],
}
