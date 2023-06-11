import fs from 'fs'
import path from 'path'
import { O, b, s, ss } from './types'

export function nestedDirs(root: s, o?: { recursive?: b; fullPath?: b }) {
  let dirs = [] as ss

  if (!fs.existsSync(root) || !fs.lstatSync(root).isDirectory()) throw new Error('Invalid directory path')

  fs.readdirSync(root).forEach((name) => {
    let fullPath = path.join(root, name)
    if (fs.lstatSync(fullPath).isDirectory()) {
      dirs.push(o?.fullPath ? fullPath : name)
      if (o?.recursive) dirs = dirs.concat(nestedDirs(fullPath))
    }
  })

  return dirs
}

export function parseYml(yml: s) {
  const lines = yml.trim().split('\n')
  const data = {} as O
  for (const line of lines) {
    const [key, value] = line.split(': ')
    data[key] = value
  }
  return data
}
