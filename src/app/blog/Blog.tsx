/* eslint-disable @next/next/no-img-element */
import { CSSProperties } from 'react'
import css from './Blog.module.css'
import { ArticleBlogInfo, listArticles } from './[folder]/articleApi'
import { s } from '@/types'
import { BlogCard } from './BlogCard'

export function Blog() {
  const cards = listArticles()
  return (
    <div className={css.blog + ' center'}>
      <div className={css.warning}>WARNING: This blog is under construction. Some articles may be in draft form.</div>
      <p className={css.about}>{about}</p>
      <Cards name="Big projects" cards={cards.big} />
      <Cards name="Libraries" cards={cards.libs} />
      <Cards name="Small projects" cards={cards.small} />
    </div>
  )
}

function Cards(p: { name: s; cards: ArticleBlogInfo[] }) {
  return (
    <>
      <h2>{p.name}</h2>
      <div className={css.cards}>
        {p.cards.map((c) => (
          <BlogCard key={c.title} {...c} />
        ))}
      </div>
    </>
  )
}

const about = `
I like building innovative products and tools that provide unique business value. Every time I create something new, I write a simple blog post about the interesting things I've learned and the technical methods I've used.
`
