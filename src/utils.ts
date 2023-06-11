import { customAlphabet } from 'nanoid'
import { n, s } from './types'

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
