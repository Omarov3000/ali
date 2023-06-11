import { Article } from './Article/Article'
import { s } from '../../../types'
import { Metadata, ResolvingMetadata } from 'next'
import { getArticle, getArticleIcon, getArticleTitle, listArticleFolders } from './articleApi'

type Params = { folder: s }
type Props = { params: { folder: s } }

export default function ArticlePage({ params }: Props) {
  return (
    <div>
      <Article {...getArticle(params.folder)} folder={params.folder} />
    </div>
  )
}

export const generateStaticParams = () => listArticleFolders().map((folder): Params => ({ folder }))

// 'blog/lean_language_learning'

export async function generateMetadata({ params }: Props) {
  return {
    title: getArticleTitle(params.folder),
    icons: { icon: getArticleIcon(params.folder) },
  }
}
