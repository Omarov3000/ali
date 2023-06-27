import { nestedDirs } from '@/fileUtils'
import { parseYml } from '@/parsingUtils'
import { n, s, ss } from '@/types'
import { capitalize, safeSplit, sort } from '@/utils'
import fs from 'fs'
import path from 'path'
import { parse } from './parser'
import { Meta, splitMetaAndMD } from './metaParser'
import { BlockDs, CardsData, LinkCard } from './Article/block'

const PUBLIC = path.join(process.cwd(), 'public')
const ARTICLES = path.join(PUBLIC, 'articles')

export const _getArticle = (folder: s) => read(ARTICLES, folder, 'text.md') // for debug
export const getArticle = (folder: s) => parseCards(parse(read(ARTICLES, folder, 'text.md')), folder)
export const getArticleTitle = (folder: s) => capitalize(unslugify(folder))
export const getArticleTitleSvg = (folder: s) => read(ARTICLES, folder, 'title.svg')
export const getArticleIcon = (folder: s) => `/articles/${folder}/icon.svg`
export const getArticleCard = (folder: s) => `/articles/${folder}/card.webp`
export const getArticleMeta = (folder: s) => splitMetaAndMD(read(ARTICLES, folder, 'text.md')).meta
export const listArticles = () => {
  const r: { [k in Meta['category']]: ArticleBlogInfo[] } = { big: [], libs: [], small: [] }
  const articles = nestedDirs(ARTICLES)
    .map(getArticleMeta)
    .filter((m) => !m.folder.endsWith('_case_study'))
  let main = [...articles.map(metaToArticle), ...getAdditionalBlogCards()]

  main.forEach((a) => r[a.category].push(a))
  Object.keys(r).forEach((k) => (r[k as Meta['category']] = sort(r[k as Meta['category']], (e) => e.i)))
  return r
}

export interface ListArticlesD {
  big: ArticleBlogInfo[]
  small: ArticleBlogInfo[]
  libs: ArticleBlogInfo[]
}

export const listArticleFolders = () => nestedDirs(ARTICLES)
export const getArticleMedia = (folder: s, src: s) => `/articles/${folder}/${src}`

const getAdditionalBlogCards = (): ArticleBlogInfo[] => {
  const raw = safeSplit(read(ARTICLES, 'links.yml'), '\n\n')
  const cards = raw.map((s) => parseYml(s) as LinkCard & { i: s; category: Meta['category'] })
  return cards.map((c) => ({
    link: c.to,
    title: c.title,
    description: c.description,
    img: c.img,
    bg: c.bg,
    color: c.color,
    i: +c.i,
    category: c.category,
  }))
}

const unslugify = (slug: s) => slug.replaceAll('_', ' ')
// const slugify = (name: s) => name.replaceAll('.md', '').replaceAll(' ', '_')

const read = (...parts: ss) => fs.readFileSync(path.join(...parts), 'utf-8')

export interface ArticleBlogInfo {
  link: s
  title: s
  description: s
  img: s
  color: s
  bg: s
  i: n
  category: Meta['category']
}

function metaToArticle(m: Meta): ArticleBlogInfo {
  return {
    link: `/blog/${m.folder}`,
    title: m.title,
    description: m.description,
    img: getArticleCard(m.folder),
    bg: m.bgCard,
    color: m.colorCard,
    i: +m.i,
    category: m.category,
  }
}

// parseCards interacts with api, placed it here to make parser debuggable on client
// trying to avoid circular dependencies

export function parseCards(parsed: { blocks: BlockDs; meta: Meta }, folder: s) {
  const cards = parsed.blocks.find((b) => b.t === 'cards')
  if (!cards) return { ...parsed, cards: [], card: getArticleCard(folder) }

  const rest = parsed.blocks.filter((b) => b.t !== 'cards')
  cards.data = parseCards_(cards.data as s)
  const cardsData = cards ? (cards.data as CardsData) : []

  return { blocks: rest, meta: parsed.meta, cards: cardsData, card: getArticleCard(folder) }
}

const parseCards_ = (raw: s) => safeSplit(raw, '\n\n').map(parseCard)

function parseCard(yml: s) {
  const r = parseYml(yml) as LinkCard
  const inner = !r.to.startsWith('http')
  if (inner) {
    r.inner = true

    const meta = getArticleMeta(r.to)
    r.color = meta.colorCard
    r.bg = meta.bgCard

    r.img = getArticleCard(r.to)

    r.to = '/blog/' + r.to // should be the last line to access `to` safely
  }
  return r
}
