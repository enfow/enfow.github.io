import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { notFound } from 'next/navigation'
import ListLayout from '@/layouts/ListLayoutWithTags'

const POSTS_PER_PAGE = 10
const VALID_CATEGORIES = ['tech', 'daily', 'finance']

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function TagPage(props: { searchParams: Promise<{ page: string }> }) {

  let {category, tag} = await props.params
  
  if (!VALID_CATEGORIES.includes(category)) {
    notFound()
  }

  const path = `${category}`

  const filteredBlogs = allBlogs.filter((blog) => 
    blog.path.startsWith(path) && blog.tags.some(blogTag => blogTag.toLowerCase() === tag.toLowerCase())
  );

  const posts = allCoreContent(sortPosts(filteredBlogs))

  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      path={path}
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
