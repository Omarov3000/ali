/* eslint-disable @next/next/no-img-element */
import { CSSProperties } from 'react'
import css from './Blog.module.css'
import { listArticles } from './[folder]/articleApi'

export function Blog() {
  const cards = listArticles()
  return (
    <div className={css.blog + ' center'}>
      <div className={css.warning}>WARNING: This blog is under construction. Some articles may be in draft form.</div>
      <p className={css.about}>{about}</p>

      <div className={css.cards}>
        {cards.map((c) => (
          <a
            key={c.link}
            className={css.card}
            href={c.link}
            style={{ '--bg': c.bg, '--color': c.color } as CSSProperties}
          >
            <img src={c.img} alt="" />
            <h3>{c.title}</h3>
            <p>{c.description}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

const about = `
I like building innovative products and tools that provide unique business value. Every time I create something new, I write a simple blog post about the interesting things I've learned and the technical methods I've used.
`
