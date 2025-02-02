import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { notFound } from 'next/navigation'
import ListLayout from '@/layouts/ListLayoutWithTags'

const POSTS_PER_PAGE = 5
const VALID_CONTENT_TYPES = ['tech', 'daily', 'finance']

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage(props: { searchParams: Promise<{ page: string }> }) {

  let {contentType} = await props.params
  
  if (!VALID_CONTENT_TYPES.includes(contentType)) {
    notFound()
  }

  const path = `blog/${contentType}`

  // const filteredBlogs = allBlogs.filter(blog => blog.path.startsWith(path));
  const filteredBlogs = allBlogs.filter(blog => blog.contentType === contentType);
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
