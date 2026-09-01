import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import type { CardPostData } from '@/components/Card'

export const revalidate = 600

type PostsPageResult = {
  docs: CardPostData[]
  page?: number
  totalDocs: number
  totalPages: number
}

export default async function Page() {
  let posts: PostsPageResult = {
    docs: [],
    page: 1,
    totalDocs: 0,
    totalPages: 0,
  }

  try {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 12,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
      },
    })
    posts = {
      docs: result.docs as CardPostData[],
      page: result.page,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
    }
  } catch (error) {
    console.warn('[atelier] Could not load posts archive.', error)
  }

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Insights</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Atelier Wellness Insights`,
  }
}
