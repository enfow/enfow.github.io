import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 10

export const generateStaticParams = async (): Promise<
  { category: string; tag: string; page: string }[]
> => {
  const tagCounts = tagData as Record<string, number>
  const staticParams: { category: string; tag: string; page: string }[] = []

  for (const tag in tagCounts) {
    const postCount = tagCounts[tag]
    const totalPages = Math.ceil(postCount / POSTS_PER_PAGE)

    // Ensure each tag is included in all valid categories
    for (const post of allBlogs) {
      const parts = post.path.split('/')
      const category = parts[0] || ''

      if (post.tags?.map((t) => slug(t)).includes(tag)) {
        for (let page = 1; page <= totalPages; page++) {
          staticParams.push({
            category,
            tag: encodeURI(tag),
            page: page.toString(),
          })
        }
      }
    }
  }

  return staticParams
}

export default async function TagPage(props: { params: Promise<{ tag: string; page: string }> }) {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const pageNumber = parseInt(params.page)
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }
  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
    />
  )
}
