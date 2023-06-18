'use client'

import { O } from '@/types'
import { parse } from '../parser'

export function Debug(p: O) {
  parse(p.md, true)
  return null
}
