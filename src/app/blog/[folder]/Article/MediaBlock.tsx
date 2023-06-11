/* eslint-disable @next/next/no-img-element */
import { CSSProperties } from 'react'
import css from './MediaBlock.module.css'
import { BlockD, BlockProps, MediaData } from './block'
import { s } from '@/types'
import { getArticleMedia } from '../articleApi'

export function MediaBlock(p: BlockProps) {
  const d = p.block.data as MediaData
  const style = (d.width ? { '--width': d.width } : {}) as CSSProperties
  return (
    <div className="center" style={{ width: '100%' }}>
      {p.block.t === 'img' && <Img src={getArticleMedia(p.folder, d.src)} alt={d.alt} s={style} />}
      {p.block.t === 'video' && <Video src={getArticleMedia(p.folder, d.src)} alt={d.alt} s={style} />}
      {d.alt && <div className={css.caption}>{d.alt}</div>}
    </div>
  )
}

interface Media {
  src: s
  s: CSSProperties
  alt?: s
}

function Video(p: Media) {
  return (
    <video
      className={css.rounded}
      preload="auto"
      muted
      autoPlay={process.env.NODE_ENV === 'production'}
      loop
      playsInline
      controls
      style={p.s}
    >
      <source src={p.src} type="video/mp4" />
    </video>
  )
}

function Img(p: Media) {
  return <img className={css.rounded + ' ' + css.img} src={p.src} alt={p.alt} style={p.s} />
}
