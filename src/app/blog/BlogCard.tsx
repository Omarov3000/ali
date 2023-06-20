/* eslint-disable @next/next/no-img-element */
'use client'

import { CSSProperties, useState } from 'react'
import { ArticleBlogInfo } from './[folder]/articleApi'
import css from './BlogCard.module.css'
import { cls } from '@/utils'
import { motion } from 'framer-motion'
import { useFloatOnHover } from './useFloatOnHover'

export function BlogCard(p: ArticleBlogInfo) {
  const { ref, y } = useFloatOnHover()
  const target = p.link.startsWith('http') ? '_blank' : '_self'

  return (
    <a
      ref={ref}
      className={css.card}
      href={p.link}
      style={{ '--bg': p.bg, '--color': p.color } as CSSProperties}
      target={target}
    >
      <motion.img src={p.img} alt="" style={{ y }} />
      <h3>{p.title}</h3>
      <p>{p.description}</p>
    </a>
  )
}
