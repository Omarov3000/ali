'use client'
import css from './ArticleCard.module.css'
import { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { LinkCard } from './block'
import { s } from '@/types'
import { useFloatOnHover } from '../../useFloatOnHover'

export function ArticleCard(p: LinkCard) {
  const { ref, y } = useFloatOnHover()
  return (
    <a
      ref={ref}
      className={css.card}
      href={p.to}
      style={{ '--color': p.color, '--bg': p.bg } as CSSProperties}
      target={p.inner ? '_self' : '_blank'}
    >
      <motion.img src={p.img} alt="" style={{ y }} />
      <div className={css.header}>{p.title}</div>
      <div className={css.description}>{p.description}</div>
    </a>
  )
}
