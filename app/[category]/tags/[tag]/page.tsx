import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { notFound } from 'next/navigation'
import ListLayout from '@/layouts/ListLayoutWithTags'

const POSTS_PER_PAGE = 10
const VALID_CATEGORIES = ['tech', 'daily', 'finance']

export const metadata = genPageMetadata({ title: 'Blog' })

export const generateStaticParams = async () => {
  const tagSet = new Set();

  // Collect all valid category-tag pairs
  const staticParams = allBlogs.flatMap((blog) => {
    const { path, tags = [] } = blog;
    const parts = path.split('/');
    const category = parts[0] || '';

    if (!VALID_CATEGORIES.includes(category)) {
      return [];
    }

    return tags.map((tag) => {
      const tagLower = tag.toLowerCase();
      if (!tagSet.has(`${category}-${tagLower}`)) {
        tagSet.add(`${category}-${tagLower}`);
        return { category, tag: tagLower };
      }
      return null;
    }).filter(Boolean);
  });

  return staticParams;
};

export default async function TagPage({
  params,
}: {
  params: Promise<{ category: string; tag: string }>
}) {
  const { category, tag } = await params

  if (!VALID_CATEGORIES.includes(category)) {
    notFound()
  }

  const path = `${category}`

  const filteredBlogs = allBlogs.filter(
    (blog) =>
      blog.path.startsWith(path) &&
      blog.tags.some((blogTag) => blogTag.toLowerCase() === tag.toLowerCase())
  )

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
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
