import { parseYml } from '@/parsingUtils'
import { s } from '@/types'
import { safeSplit } from '@/utils'

export interface Meta {
  folder: s
  title: s
  readingTime: s
  description: s
  i: s
  gradient: s
  color: s
  bg: s
  colorCard: s
  bgCard: s
  colorEm?: s
  bgEm?: s
  codeHue?: s
  titleScaleDown?: s
}

export function splitMetaAndMD(md: s) {
  let metaS = ''
  if (md.startsWith('---')) {
    const [m, ...rest] = safeSplit(md, '---')
    metaS = m
    md = rest.join('---')
  }
  const meta = parseYml(metaS) as Meta
  meta.codeHue = meta.color.split(' ').at(-1)?.replace(')', '')
  return { meta, md }
}
