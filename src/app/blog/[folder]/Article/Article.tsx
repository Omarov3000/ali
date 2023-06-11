import { BlockD, BlockDs, BlockProps, BlocksProps, CardsData, GridData, isLayout } from './block'
import css from './Article.module.css'
import { s } from '../../../../types'
import { MediaBlock } from './MediaBlock'
import { LayoutBlock } from './LayoutBlock'
import { Cards } from './Cards'
import { Title } from './Title'
import { CSSProperties, SVGProps } from 'react'
import { Meta } from '../metaParser'
import { CodeBlock } from './CodeBlock/CodeBlock'

interface Article {
  blocks: BlockDs
  meta: Meta
  cards: CardsData
  folder: s
}

export function Article({ blocks, meta, cards, folder }: Article) {
  return (
    <div
      className={css.wrapper}
      style={
        {
          '--gradient': meta.gradient,
          '--color': meta.color,
          '--bg': meta.bg,
          '--color-em': meta.colorEm,
          '--bg-em': meta.bgEm,
        } as CSSProperties
      }
    >
      {/* <RenderTitle /> */}
      <Back />
      <Title folder={meta.folder} />
      <div className={'center ' + css.reading}>Reading time: ~{meta.readingTime} min</div>
      <article className={`${css.article} center`}>
        <Blocks blocks={blocks} folder={folder} />
      </article>
      <Cards cards={cards} folder={folder} />
      <div className="center">
        <Back s={{ paddingBottom: '1rem', paddingTop: 0 }} />
      </div>
    </div>
  )
}

function Back(p: { s?: CSSProperties }) {
  return (
    <a className={css.back} href="/blog" style={p.s}>
      <ArrowLeftI className={css.left} /> Back to overview
    </a>
  )
}

function ArrowLeftI(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M14.71 15.88L10.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0c.38-.39.39-1.03 0-1.42z"
      ></path>
    </svg>
  )
}

function Blocks({ blocks, folder }: BlocksProps) {
  return (
    <div className={css.blocks}>
      {blocks.map((block) => (
        <Block key={block.id} block={block} folder={folder} />
      ))}
    </div>
  )
}

function Block(p: BlockProps) {
  const { block, folder } = p
  if (block.inline) return <InlineBlock block={block} />
  if (isLayout(block.t)) return <LayoutBlock {...p} RenderOne={Block} RenderMany={Blocks} listC={css.p} />
  if (['h1', 'h2', 'h3'].includes(block.t)) return <HeaderBlock block={block} />
  if (block.t === 'img' || block.t === 'video') return <MediaBlock block={block} folder={p.folder} />
  if (block.t === 'code') return <CodeBlock {...p} />
  return (
    <p className={css.p}>
      {block.children?.map((block, i) => (
        <Block key={block.id} block={block} folder={folder} />
      ))}
    </p>
  )
}

function InlineBlock({ block }: { block: BlockD }) {
  if (block.t === 'text') return <span>{block.data as s}</span>
  if (block.t === 'c') return <em>{block.data as s}</em>
  return <span>BAD: {block.t}</span>
}

function HeaderBlock({ block }: { block: BlockD }) {
  if (block.t === 'h1') return <h2>{block.data as s}</h2>
  if (block.t === 'h2') return <h3>{block.data as s}</h3>
  return <h4>{block.data as s}</h4>
}
