/* eslint-disable @next/next/no-img-element */
import { s } from '@/types'
import css from './Cards.module.css'
import { CardsData, LinkCard } from './block'
import { getArticleMedia } from '../articleApi'

export function Cards(p: { cards: CardsData; folder?: s }) {
  return (
    <>
      <div className="center">
        <h3 style={{ paddingBottom: '2rem' }}>LEARN MORE</h3>
      </div>
      <div className={css.wrapper}>
        <div className={css.cards}>
          {p.cards.map((ps) => (
            <Card key={ps.to} {...ps} folder={p.folder} />
          ))}
        </div>
      </div>
    </>
  )
}

interface Card extends LinkCard {
  folder?: s
}

function Card(p: Card) {
  const img = p.inner || !p.folder ? p.img : getArticleMedia(p.folder, p.img)
  return (
    <a
      className={css.card}
      href={p.to}
      style={{ color: p.color, background: p.bg }}
      target={p.inner ? '_self' : '_blank'}
    >
      <img src={img} alt="" />
      <div className={css.header}>{p.title}</div>
      <div className={css.description}>{p.description}</div>
    </a>
  )
}
