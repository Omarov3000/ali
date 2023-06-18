import { nestedDirs } from '@/fileUtils'
import { parseYml } from '@/parsingUtils'
import { n, s, ss } from '@/types'
import { capitalize, safeSplit, sort } from '@/utils'
import fs from 'fs'
import path from 'path'
import { parse } from './parser'
import { Meta, splitMetaAndMD } from './metaParser'
import { BlockDs, CardsData, LinkCard } from './Article/block'

const publicDir = path.join(process.cwd(), 'public')
const articlesDir = path.join(publicDir, 'articles')

export const _getArticle = (folder: s) => getArticlePart(folder, 'text.md') // for debug
export const getArticle = (folder: s) => parseCards(parse(getArticlePart(folder, 'text.md')), folder)
export const getArticleTitle = (folder: s) => capitalize(unslugify(folder))
export const getArticleTitleSvg = (folder: s) => getArticlePart(folder, 'title.svg')
export const getArticleIcon = (folder: s) => `/articles/${folder}/icon.svg`
export const getArticleCard = (folder: s) => `/articles/${folder}/card.webp`
export const getArticleMeta = (folder: s) => splitMetaAndMD(getArticlePart(folder, 'text.md')).meta
export const listArticles = () => sort(nestedDirs(articlesDir).map(getArticleMeta).map(metaToArticle), (e) => e.i)

export const listArticleFolders = () => nestedDirs(articlesDir)
export const getArticleMedia = (folder: s, src: s) => `/articles/${folder}/${src}`

const unslugify = (slug: s) => slug.replaceAll('_', ' ') + '.md'
// const slugify = (name: s) => name.replaceAll('.md', '').replaceAll(' ', '_')

const getArticlePart = (folder: s, name: s) => fs.readFileSync(path.join(articlesDir, folder, name), 'utf-8')

interface Article {
  link: s
  title: s
  description: s
  img: s
  color: s
  bg: s
  i: n
}

function metaToArticle(m: Meta): Article {
  return {
    link: `/blog/${m.folder}`,
    title: m.title,
    description: m.description,
    img: getArticleCard(m.folder),
    bg: m.bgCard,
    color: m.colorCard,
    i: +m.i,
  }
}

// parseCards interacts with api, placed it here to make parser debuggable on client
// trying to avoid circular dependencies

export function parseCards(parsed: { blocks: BlockDs; meta: Meta }, folder: s) {
  const cards = parsed.blocks.find((b) => b.t === 'cards')
  if (!cards) return { ...parsed, cards: [], card: getArticleCard(folder) }

  const rest = parsed.blocks.filter((b) => b.t !== 'cards')
  cards.data = safeSplit(cards.data as s, '\n\n').map(parseCard)
  const cardsData = cards ? (cards.data as CardsData) : []

  return { blocks: rest, meta: parsed.meta, cards: cardsData, card: getArticleCard(folder) }
}

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
