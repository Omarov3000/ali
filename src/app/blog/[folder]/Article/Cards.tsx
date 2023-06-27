/* eslint-disable @next/next/no-img-element */
import { s } from '@/types'
import css from './Cards.module.css'
import { CardsData, LinkCard } from './block'
import { ArticleCard } from './ArticleCard'
import { getArticleMedia } from '../articleApi'

export function Cards(p: { cards: CardsData; folder?: s }) {
  const study = p.folder?.endsWith('_case_study')
  return (
    <>
      <div className="center">
        <h3 style={{ paddingBottom: '2rem' }}>{study ? 'SEE MORE OF MY WORK' : 'LEARN MORE'}</h3>
      </div>
      <div className={css.wrapper}>
        <div className={css.cards}>
          {p.cards.map((ps) => (
            <ArticleCard key={ps.to} {...ps} img={ps.inner || !p.folder ? ps.img : getArticleMedia(p.folder, ps.img)} />
          ))}
        </div>
      </div>
    </>
  )
}
