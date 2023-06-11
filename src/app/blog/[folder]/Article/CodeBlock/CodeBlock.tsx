import { s } from '@/types'
import { BlockProps } from '../block'
import css from './CodeBlock.module.css'

export function CodeBlock(p: BlockProps) {
  return <pre className={css.code + ' hljs'} dangerouslySetInnerHTML={{ __html: p.block.data as s }} />
}
