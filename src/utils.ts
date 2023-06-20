import { customAlphabet } from 'nanoid'
import { b, n, s } from './types'

export const uuid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz', 6) // 36k ids ~ 1% of collision (1 id per sec for 10 hours)

export const safeSplit = (str: s, sep: s | RegExp) => {
  const parts = str.split(sep)
  return parts.map((s) => s.trim()).filter(Boolean)
}

export const capitalize = (str: s) => str.charAt(0).toUpperCase() + str.slice(1)

export const sort = <T>(arr: T[], toNum: (element: T) => n = (e) => e as unknown as n): T[] => {
  arr.sort((a, b) => toNum(a) - toNum(b)) // ascending
  return arr
}

export function cls(...classes: Array<s | undefined | { [key: s]: b | undefined }>) {
  const result = []
  for (const cls of classes) {
    if (typeof cls === 'string' && cls) result.push(cls)
    else if (typeof cls === 'object' && cls) {
      const entries = Object.entries(cls)
      for (let i = 0; i < entries.length; i++) if (entries[i][1]) result.push(entries[i][0])
    }
  }
  return result.join(' ')
}
