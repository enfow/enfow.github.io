import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from 'next/image'

const MAX_DISPLAY = 5

const PostRow = ({ category, post }) => {
  const { slug, date, title, tags } = post
  return (
    <li key={slug} className="py-12">
      <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                  <Link
                    href={`/${slug}`}
                    className="text-gray-900 hover:text-primary-500 dark:text-gray-100"
                  >
                    {title}
                  </Link>
                </h2>
                <div className="mt-2 flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} category={category} text={tag} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </li>
  )
}

export default function Home({ posts }) {
  const extractCategoryFromSlug = (slug) => {
    return slug.split('/')[0]
  }
  const categoryToPosts = {}

  // const sortedPosts = posts.sort((a, b) => new Date(a.date) - new Date(b.date))
  const sortedPosts = posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  sortedPosts.forEach((post) => {
    const category = extractCategoryFromSlug(post.slug)
    if (!categoryToPosts[category]) {
      categoryToPosts[category] = []
    }
    categoryToPosts[category].push(post)
  })

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <Image
            layout="responsive"
            src="/enfow-home.png"
            alt="home-image"
            width={1920}
            height={1080}
          />
          <h1 className="text-2xl font-extrabold leading-3 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-5xl md:leading-14">
            Latest
          </h1>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {Object.keys(categoryToPosts).map((category) => (
            <>
              <li>
                <h2 className="text-xl font-bold leading-9 tracking-tight text-gray-900 hover:text-primary-500 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-3xl md:leading-14">
                  <Link
                    href={`/${category}`}
                    className="text-gray-900 hover:text-primary-500 dark:text-gray-100"
                  >
                    {category} ({categoryToPosts[category].length})
                  </Link>
                </h2>
              </li>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {categoryToPosts[category]
                  .slice(-MAX_DISPLAY)
                  .reverse()
                  .map((post) => (
                    <PostRow key={post.slug} category={category} post={post} />
                  ))}
              </ul>
            </>
          ))}
        </ul>
      </div>
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
