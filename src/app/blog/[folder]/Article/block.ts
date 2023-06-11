import { s, n, b } from '../../../../types'

type Media = 'img' | 'video'
type Text = 'h1' | 'h2' | 'h3' | 'p' | 'code' | 'blockquote' | 'hr'
type InlineText = 'text' | 'b' | 'i' | 'a' | 'c'
type Layout = 'grid' | 'ol' | 'ul'
type Meta = 'col' | 'end' | 'trash' | 'cards' | 'title'

export type CodeData = { lang: s; code: s; extended?: LinkCard }
export type GridData = { width?: n; column: BlockDs }[]
export type MediaData = { src: s; alt: s; width?: s }
export type LinkCard = { to: s; img: s; title: s; description: s; color: s; bg: s; inner?: b }
export type CardsData = LinkCard[]

export interface BlockD {
  id: s
  t: Text | InlineText | Media | Layout | Meta
  data?: s | GridData | CodeData | MediaData | CardsData
  children?: BlockD[]
  inline?: b
}
export type BlockDs = BlockD[]

export const isLayout = (t: BlockD['t']): t is Layout => ['grid', 'ol', 'ul'].includes(t)

export interface BlocksProps {
  blocks: BlockDs
  folder: s
}

export interface BlockProps {
  block: BlockD
  folder: s
}
