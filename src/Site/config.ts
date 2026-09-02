import type { GlobalConfig } from 'payload'

import { DEFAULT_SITE_NAME } from '@/constants/site'
import { revalidateSite } from './hooks/revalidateSite'

export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: DEFAULT_SITE_NAME,
      admin: {
        description: 'Shown in the header, footer, browser tab suffix, and social previews.',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optional. Upload a logo image to replace the text name in the header and footer.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateSite],
  },
}
