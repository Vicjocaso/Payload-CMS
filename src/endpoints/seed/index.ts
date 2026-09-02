import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { about as aboutPageData } from './about-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { seedPageTemplates } from './page-templates'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'page-templates',
  'posts',
  'forms',
  'form-submissions',
  'search',
  'redirects',
  'payload-jobs',
  'payload-locked-documents',
]

const globals: GlobalSlug[] = ['header', 'footer']
