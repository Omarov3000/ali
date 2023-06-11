import { parseYml } from '@/fileUtils'
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
}

export function splitMetaAndMD(md: s) {
  let meta = ''
  if (md.startsWith('---')) {
    const [m, ...rest] = safeSplit(md, '---')
    meta = m
    md = rest.join('---')
  }
  return { meta: parseYml(meta) as Meta, md }
}
