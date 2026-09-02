import type { Payload, PayloadRequest } from 'payload'
import type { Media } from '@/payload-types'

import { pickPageLayout } from '@/utilities/pageLayout'
import { about as aboutPageData } from './about-page'
import { contact as contactPageData } from './contact-page'
import { home } from './home'

type SeedPageTemplatesArgs = {
  payload: Payload
  heroImage: Media
  metaImage: Media
  contactFormId?: number | string
  req?: PayloadRequest
}

export const seedPageTemplates = async ({
  payload,
  heroImage,
  metaImage,
  contactFormId,
  req,
}: SeedPageTemplatesArgs): Promise<void> => {
  payload.logger.info('— Seeding page templates...')

  const contactForm = contactFormId
    ? await payload.findByID({
        collection: 'forms',
        id: contactFormId,
        depth: 0,
        overrideAccess: true,
      })
    : null

  const homeData = home({ heroImage, metaImage })
  const contactData = contactForm ? contactPageData({ contactForm }) : null

  const templates = [
    {
      name: 'Home — luxury landing',
      description: 'High-impact hero with insights CTA and editorial content blocks.',
      category: 'landing' as const,
      thumbnail: heroImage.id,
      layout: pickPageLayout(homeData),
    },
    {
      name: 'About — studio profile',
      description: 'Low-impact hero and story-led content for an About page.',
      category: 'about' as const,
      thumbnail: metaImage.id,
      layout: pickPageLayout(aboutPageData),
    },
    ...(contactData
      ? [
          {
            name: 'Contact — inquiry form',
            description: 'Minimal hero with a contact form block.',
            category: 'contact' as const,
            thumbnail: metaImage.id,
            layout: pickPageLayout(contactData),
          },
        ]
      : []),
  ]

  for (const template of templates) {
    await payload.create({
      collection: 'page-templates',
      depth: 0,
      data: {
        name: template.name,
        description: template.description,
        category: template.category,
        thumbnail: template.thumbnail,
        hero: template.layout.hero,
        layout: template.layout.layout,
      },
      overrideAccess: true,
      req,
    })
  }
}
