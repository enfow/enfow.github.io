import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { notFound } from 'next/navigation'
import ListLayout from '@/layouts/ListLayoutWithTags'

const POSTS_PER_PAGE = 5
const VALID_CATEGORIES = ['tech', 'daily', 'finance']

export const metadata = genPageMetadata({ title: 'Blog' })

// export const generateStaticParams = async () => {
//   return VALID_CATEGORIES.flatMap((category) =>
//     allBlogs
//       .filter((blog) => blog.path.startsWith(category))
//       .map((blog) => {
//         const parts = blog.path.split('/')
//         return {
//           category,
//           subCategory: parts[1] || '',
//         }
//       })
//   )
// }

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ subCategory: string; category: string; page: string }>
}) {
  const { subCategory, category, page } = await params

  if (!VALID_CATEGORIES.includes(category)) {
    notFound()
  }

  const path = `${category}/${subCategory}`

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
