import { s } from '@/types'
import { BlockProps } from '../block'
import './CodeBlock.css'

export function CodeBlock(p: BlockProps) {
  return <pre className="hljs" dangerouslySetInnerHTML={{ __html: p.block.data as s }} />
}
