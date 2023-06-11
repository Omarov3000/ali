import { FC } from 'react'
import css from './LayoutBlock.module.css'
import { BlockD, BlockDs, BlockProps, BlocksProps, GridData } from './block'
import { s } from '@/types'

interface LayoutBlock extends BlockProps {
  RenderOne: FC<BlockProps>
  RenderMany: FC<BlocksProps>
  listC?: s
}

export function LayoutBlock(p: LayoutBlock) {
  if (p.block.t === 'grid') return <GridBlock {...p} />
  return <ListBlock {...p} />
}

function ListBlock({ folder, block, RenderOne, listC }: LayoutBlock) {
  const Root = block.t === 'ol' ? 'ol' : 'ul'
  return (
    <Root className={listC + ' ' + css.list}>
      {block.children?.map((block, i) => (
        <li key={block.id}>
          <RenderOne block={block} folder={folder} />
        </li>
      ))}
    </Root>
  )
}

function GridBlock({ block, RenderMany, folder }: LayoutBlock) {
  const data = block.data as GridData
  return (
    <div className={css.cols}>
      {data.map((col, i) => (
        <RenderMany key={i} blocks={col.column} folder={folder} />
      ))}
    </div>
  )
}
