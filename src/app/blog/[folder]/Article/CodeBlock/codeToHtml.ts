import { s } from '@/types'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import plaintext from 'highlight.js/lib/languages/plaintext'

hljs.registerLanguage('xml', xml)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('txt', typescript)

// considered highlight.js prismjs shiki (astro's default highlighter)
// prism v2 is in development, but it's stuck
// highlight.js is chosen because it has auto-detect language feature // https://highlightjs.readthedocs.io/en/latest/api.html

// highlight leads to auto import from the lib
export function codeToHtml(code: s, language = 'typescript') {
  return hljs.highlight(code, { language, ignoreIllegals: true }).value
}
