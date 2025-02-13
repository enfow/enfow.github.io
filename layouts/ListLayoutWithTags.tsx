'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import headerNavLinks from '@/data/headerNavLinks'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}
type CategoryLink = {
  type: string
  title: string
  href: string
  header: boolean
}

function removeLeadingSlash(str) {
  return str.startsWith('/') ? str.slice(1) : str
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+$/, '') // Remove any trailing /page
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

const CategoryLinkList = ({ pathname }) => {
  const categoryLinks = headerNavLinks.filter((link) => link.type === 'category')

  // Init subCategoryLink, key is category, value is an array of links
  const subCategoryLinks = new Map<string, CategoryLink[]>()

  headerNavLinks
    .filter((link) => link.type === 'sub-category')
    .forEach((link) => {
      const category = link.href.split('/')[1]
      if (!subCategoryLinks.has(category)) {
        subCategoryLinks.set(category, [])
      }
      subCategoryLinks.get(category)?.push(link)
    })

  return (
    <>
      {categoryLinks.map((link) => {
        const isActiveCategory = pathname === link.href
        const subCategories = subCategoryLinks.get(link.href.split('/')[1])
        return (
          <li key={link.title} className="my-2">
            <Link
              href={link.href}
              className={`text-sm ${
                isActiveCategory
                  ? 'inline py-2 font-bold text-primary-500 dark:text-primary-400'
                  : 'px-1 py-2 font-medium text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500'
              }`}
            >
              {link.title}
            </Link>
            {subCategories && (
              <ul>
                {subCategories.map((subCategory) => {
                  const isActiveSubCategory = pathname.startsWith(subCategory.href)
                  return (
                    <li key={subCategory.title} className="my-2 px-3">
                      <Link
                        href={subCategory.href}
                        className={`text-sm ${
                          isActiveSubCategory
                            ? 'inline py-2 font-bold text-primary-500 dark:text-primary-400'
                            : 'px-1 py-2 font-medium text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500'
                        }`}
                      >
                        {subCategory.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </li>
        )
      })}
    </>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const blogNavLinks = headerNavLinks
    .map((link) => {
      if (link.type == 'category') {
        return link.href
      }
    })
    .filter((link) => link !== undefined)

  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)

  // category extraction e.g. "tech" <- "http://localhost:3000/tech""
  const regexForBlog = new RegExp(
    `^(${blogNavLinks.map((path) => path.replace('/', '\\/')).join('|')})(\\/([^/]+))?$`
  )
  const matchWithBlog = pathname.match(regexForBlog)
  // tag extraction e.g. "tech" <- "http://localhost:3000/tech/tags/reinforcement-learning""
  const matchWithTag = pathname.match(/^\/([^/]+)\/tags\//)
  let filteredTagKeys: string[] = []
  let category: string = ''

  if (matchWithBlog !== null) {
    category = removeLeadingSlash(matchWithBlog[1])
    filteredTagKeys = tagKeys.filter((tagKey) => tagKey.startsWith(category))
  } else if (matchWithTag !== null) {
    category = matchWithTag[1]
    filteredTagKeys = tagKeys.filter((tagKey) => tagKey.startsWith(category))
  } else {
    filteredTagKeys = tagKeys
  }

  const sortedTags = filteredTagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  const extractTagName = (tag: string) => {
    return tag.split('/')[2]
  }
  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              {/* Categories */}
              <h3 className="font-bold uppercase">Categories</h3>
              <ul>
                <CategoryLinkList pathname={pathname} />
              </ul>
              <h3 className="pt-5 font-bold uppercase">Tag</h3>
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-2">
                      {pathname === `/${category}/tags/${slug(extractTagName(t))}` ? (
                        <h3 className="inline py-2 text-sm font-bold text-primary-500">
                          {`${extractTagName(t)} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/${category}/tags/${slug(extractTagName(t))}`}
                          className="px-1 py-2 text-sm font-medium text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${extractTagName(t)} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <li key={path} className="py-5">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags?.map((tag) => <Tag key={tag} category={category} text={tag} />)}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
