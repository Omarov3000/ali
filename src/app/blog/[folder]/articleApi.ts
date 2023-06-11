import { nestedDirs, parseYml } from '@/fileUtils'
import { n, s, ss } from '@/types'
import { capitalize, sort } from '@/utils'
import fs from 'fs'
import path from 'path'
import { parse } from './parser'
import { Meta, splitMetaAndMD } from './metaParser'

const publicDir = path.join(process.cwd(), 'public')
const articlesDir = path.join(publicDir, 'articles')

export const getArticle = (folder: s) => parse(getArticlePart(folder, 'text.md'))
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
