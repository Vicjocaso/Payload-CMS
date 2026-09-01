import type { RequiredDataFromCollectionSlug } from 'payload'

export const about: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'about',
  _status: 'published',
  hero: {
    type: 'lowImpact',
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Get to know the practice.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Atelier Wellness is a demo consulting studio for hotel spa operations, openings, and leadership. Edit this page in the Payload admin.',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  layout: [
    {
      blockName: 'About',
      blockType: 'content',
      columns: [
        {
          size: 'full',
          richText: {
            root: {
              type: 'root',
              children: [
                {
                  type: 'heading',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Built from inside the operation.',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  tag: 'h2',
                  version: 1,
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      type: 'text',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Most advisory work is written from the outside. This demo brand is modeled on consultants who already know the P&L, the locker-room culture, and the pre-opening punch list. Use Payload to swap in your own story, portraits, and offers.',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  textFormat: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          },
        },
      ],
    },
  ],
  meta: {
    description:
      'About Atelier Wellness, a demo luxury hospitality and spa consulting studio powered by Payload CMS.',
    title: 'About',
  },
  title: 'About',
}
