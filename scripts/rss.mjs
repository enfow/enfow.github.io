import { writeFileSync, mkdirSync, existsSync } from 'fs'
import path from 'path'
import { slug } from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import tagData from '../app/tag-data.json' assert { type: 'json' }
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'

const outputFolder = process.env.EXPORT ? 'out' : 'public'

const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}/blog/${post.slug}</link>
    ${post.summary ? `<description>${escape(post.summary)}</description>` : ''}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post.tags ? post.tags.map((t) => `<category>${t}</category>`).join('') : ''}
  </item>
`

const generateRss = (config, posts, page = 'feed.xml') => {
  if (posts.length === 0) {
    console.warn(`⚠️ No posts found for RSS feed: ${page}`)
    return ''
  }

  const lastBuildDate =
    posts.length > 0 ? new Date(posts[0].date).toUTCString() : new Date().toUTCString()

  return `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}/blog</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      <lastBuildDate>${lastBuildDate}</lastBuildDate>
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join('')}
    </channel>
  </rss>
  `
}

async function generateRSS(config, allBlogs, page = 'feed.xml') {
  if (!allBlogs || allBlogs.length === 0) {
    console.error('🚨 Error: allBlogs is empty or not loaded properly!')
    return
  }

  const publishPosts = allBlogs.filter((post) => post.draft !== true)
  console.log(`✅ Generating RSS feed for ${publishPosts.length} published posts...`)

  // Ensure the output folder exists
  if (!existsSync(outputFolder)) {
    mkdirSync(outputFolder, { recursive: true })
  }

  if (publishPosts.length > 0) {
    const rssContent = generateRss(config, sortPosts(publishPosts))
    if (rssContent) {
      writeFileSync(`./${outputFolder}/${page}`, rssContent)
      console.log(`✅ RSS feed saved: ${outputFolder}/${page}`)
    }
  }

  // Generate RSS feeds for tags
  for (const tag of Object.keys(tagData)) {
    const filteredPosts = allBlogs.filter((post) => post.tags?.map((t) => slug(t)).includes(tag))
    const rssContent = generateRss(config, filteredPosts, `tags/${tag}/${page}`)
    const rssPath = path.join(outputFolder, 'tags', tag)

    if (filteredPosts.length > 0) {
      if (!existsSync(rssPath)) {
        mkdirSync(rssPath, { recursive: true })
      }
      writeFileSync(path.join(rssPath, page), rssContent)
      console.log(`✅ RSS feed saved: ${rssPath}/${page}`)
    } else {
      console.warn(`⚠️ No posts found for tag: ${tag}`)
    }
  }
}

const rss = () => {
  generateRSS(siteMetadata, allBlogs)
  console.log('✅ RSS feed generation completed!')
}

export default rss
