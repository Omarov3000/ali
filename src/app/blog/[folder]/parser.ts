import { O, n, ns, s, ss } from '../../../types'
import { marked } from 'marked'
import { safeSplit, uuid } from '../../../utils'
import { BlockD, CodeData, MediaData, BlockDs, GridData, CardsData, LinkCard } from './Article/block'
import { getArticleCard, getArticleMeta } from './articleApi'
import { codeToHtml } from './Article/CodeBlock/codeToHtml'
import { parseYml } from '@/fileUtils'
import { splitMetaAndMD } from './metaParser'

// considered: marked mdpjs markdown-it showdown commonmark remarkable pagedown (https://umemotoctrl.github.io/mdpjs/)
// syntax: https://www.markdownguide.org/

export function parse(mdWithMeta: s) {
  const { md, meta } = splitMetaAndMD(mdWithMeta)

  const raw = tokensToBlocks(marked.lexer(md, { sanitize: false }))
  const removedTrash = raw.filter((b) => b.t !== 'trash')
  const withGrids = assembleGrids(removedTrash)

  const cards = withGrids.find((b) => b.t === 'cards')
  const cardsData = cards ? (cards.data as CardsData) : []
  const rest = withGrids.filter((b) => b.t !== 'cards')

  const cleanText = JSON.parse(unescape(JSON.stringify(rest))) as BlockDs // marked escapes some characters (defined in helpers.js) couldn't turn off :(
  cleanText.filter((b) => b.t === 'code').forEach((b) => (b.data = codeToHtml((b.data as CodeData).code)))

  return { blocks: cleanText, meta, cards: cardsData }
}

// from marked/helpers.js
const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi
export function unescape(html: s) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(unescapeTest, (_, n) => {
    n = n.toLowerCase()
    if (n === 'colon') return ':'
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1))
    }
    return ''
  })
}

// export function bfs(data: Blocks) {
//   const r: Blocks = []

//   const queue = [...data]
//   while (queue.length) {
//     const block = queue.shift()!
//     r.push(block)
//     if (block.children) queue.push(...block.children)
//   }

//   return r
// }
const tokensToBlocks = (ts: marked.Token[]) => ts.map(tokenToBlock)
function tokenToBlock(token: marked.Token): BlockD {
  const id = uuid()
  switch (token.type) {
    case 'heading':
      return {
        id,
        t: token.depth === 1 ? 'h1' : token.depth === 2 ? 'h2' : 'h3',
        data: token.text,
      }
    case 'paragraph':
      return { id, t: 'p', children: token.tokens.map(tokenToBlock) }
    case 'text':
      return { id, t: 'text', data: token.text, inline: true }
    case 'code':
      return parseCode(id, token.text, token.lang)
    case 'blockquote':
      return { id, t: 'blockquote', children: token.tokens.map(tokenToBlock) }
    case 'list': // contains list_item (contains checked)
      return {
        id,
        t: token.ordered ? 'ol' : 'ul',
        children: token.items.flatMap((li) => li.tokens.map(tokenToBlock)),
      }
    case 'image':
      return { id, t: 'img', data: { src: token.href, alt: token.text } }
    case 'strong':
      return { id, t: 'b', data: token.text, inline: true }
    case 'em':
      return { id, t: 'i', data: token.text, inline: true }
    case 'link':
      return {
        id,
        t: 'a',
        data: token.href,
        children: token.tokens.map(tokenToBlock),
        inline: true,
      }
    case 'codespan':
      return { id, t: 'c', data: token.text, inline: true }
    case 'html':
      return parseHtml(id, token.text)
    case 'space': // '\n\n' that separates blocks
      return { id, t: 'trash' }
    case 'def':
    case 'table':
    case 'hr':
    case 'br':
    case 'del':
    case 'escape':
      console.log(token)
      throw new Error('not implemented')
    case 'list_item':
      throw new Error('list_item should not be processed directly')
    default:
      throw new Error('unknown token type')
  }
}

function parseCode(id: s, code: s, lang = ''): BlockD {
  if (lang.startsWith('u ')) return parseCards(id, code)
  const data: CodeData = { lang, code }
  return { id, t: 'code', data }
}

function parseHtml(id: s, html: s): BlockD {
  if (html.startsWith('<img')) return { id, t: 'img', data: parseImg(html) }
  if (html.startsWith('<video')) return { id, t: 'video', data: parseVideo(html) }
  return { id, t: parseDiv(html).class }
}

function parseVideo(html: s): MediaData {
  const src = html.match(/src="(.+?)"/)?.[1] || ''
  const alt = html.match(/alt="(.+?)"/)?.[1] || ''
  return { src, alt }
}

function parseImg(html: s): MediaData {
  const src = html.match(/src="(.+?)"/)?.[1] || ''
  const alt = html.match(/alt="(.+?)"/)?.[1] || ''
  const width = html.match(/width="(.+?)"/)?.[1] || ''
  return { src, alt, width }
}

type Class = 'grid' | 'col' | 'end'

function parseDiv(html: s): { class: Class } {
  const cls = html.match(/class="(.+?)"/)?.[1]
  if (!cls) throw new Error('unknown html')
  return { class: cls as Class }
}

function assembleGrids(blocks: BlockDs) {
  const idsToDelete = [] as ss
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    if (block.t === 'grid') {
      const cols = groupColumns(blocks, i + 1)
      block.data = cols.data
      i = cols.i
      idsToDelete.push(...cols.idsToDelete)
    }
  }

  return blocks.filter((b) => !idsToDelete.includes(b.id))
}

// if u grid is 1st block startFrom is 2 (1st block will be replaced, other deleted)
function groupColumns(blocks: BlockDs, startFrom: n) {
  let columns = [[]] as BlockDs[]
  const idsToDelete = [] as ss
  let i = startFrom
  let atEnd = false

  while (i < blocks.length && !atEnd) {
    const block = blocks[i]
    if (block.t === 'end') atEnd = true
    else if (block.t === 'col') columns.push([])
    else columns[columns.length - 1].push(block)

    idsToDelete.push(block.id)
    i++
  }

  columns = columns.filter((c) => c.length)
  const data: GridData = columns.map((c) => ({ column: c }))
  return { data, idsToDelete, i }
}

const parseCards = (id: s, yml: s): BlockD => ({ id, t: 'cards', data: safeSplit(yml, '\n\n').map(parseCard) })
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
