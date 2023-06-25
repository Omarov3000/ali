import { Metadata } from 'next'
import { Cards } from './[folder]/Article/Cards'
import { listArticles } from './[folder]/articleApi'
import { Blog } from './Blog'

export default function BlogPage() {
  const cards = listArticles()
  return <Blog cards={cards} />
}

export function generateMetadata(): Metadata {
  return {
    title: "Ali's Blog",
    icons: { icon: '/blogI.svg' },
  }
}
