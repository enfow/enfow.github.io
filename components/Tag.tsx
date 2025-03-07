import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
  category: string // Ensure category is part of Props
}

const Tag = ({ category, text }: Props) => {
  return (
    <Link
      href={`/${category}/tags/${slug(text)}`}
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
