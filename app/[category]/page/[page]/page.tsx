import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { notFound } from 'next/navigation'
import ListLayout from '@/layouts/ListLayoutWithTags'

const POSTS_PER_PAGE = 5
const VALID_CATEGORIES = ['tech', 'daily', 'finance']

export const metadata = genPageMetadata({ title: 'Blog' })

export const generateStaticParams = async () => {
  const postCounter = VALID_CATEGORIES.map((category) => {
    const numPosts = allBlogs.filter((blog) => blog.path.startsWith(category)).length
    return { category, numPosts }
  })

  return postCounter.flatMap(({ category, numPosts }) => {
    const totalPages = Math.ceil(numPosts / POSTS_PER_PAGE)
    return Array.from({ length: totalPages }, (_, i) => ({
      category,
      page: (i + 1).toString(),
    }))
  })
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ category: string; page: string }>
}) {
  const { category, page } = await params

  if (!VALID_CATEGORIES.includes(category)) {
    notFound()
  }

  const path = `${category}`

  const filteredBlogs = allBlogs.filter((blog) => blog.path.startsWith(path))
  const posts = allCoreContent(sortPosts(filteredBlogs))

  const pageNumber = parseInt(page)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
