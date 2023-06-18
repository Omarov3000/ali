import { O, s } from './types'

export function parseYml(yml: s) {
  const lines = yml.trim().split('\n')
  const data = {} as O
  for (const line of lines) {
    const [key, value] = line.split(': ')
    data[key] = value
  }
  return data
}
