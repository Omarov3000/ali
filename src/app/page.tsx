import styles from './page.module.css'
import { s } from '../types'

export default function Home() {
  return <div>ROOT</div>
}

const code = (lang: s, code?: s) => {
  if (code) return '```' + lang + '\n' + code + '```'
  return '```' + lang + '\n' + '```'
}

const md = ``
