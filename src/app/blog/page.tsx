import { Metadata } from 'next'
import { Cards } from './[folder]/Article/Cards'
import { listArticles } from './[folder]/articleApi'
import { Blog } from './Blog'

export default function BlogPage() {
  return <Blog />
}

export function generateMetadata(): Metadata {
  return {
    title: "Ali's Blog",
    icons: { icon: '/blogI.svg' },
  }
}
