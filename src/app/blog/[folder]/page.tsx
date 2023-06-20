import { Article } from './Article/Article'
import { s } from '../../../types'
import { Metadata, ResolvingMetadata } from 'next'
import { _getArticle, getArticle, getArticleIcon, getArticleTitle, listArticleFolders } from './articleApi'
import { Debug } from './Article/Debug'

type Params = { folder: s }
type Props = { params: { folder: s } }

export default function ArticlePage({ params }: Props) {
  // return <Debug md={_getArticle(params.folder)} />
  return <Article {...getArticle(params.folder)} folder={params.folder} />
}

export const generateStaticParams = () => listArticleFolders().map((folder): Params => ({ folder }))

// 'blog/lean_language_learning'

export async function generateMetadata({ params }: Props) {
  return {
    title: getArticleTitle(params.folder),
    icons: { icon: getArticleIcon(params.folder) }, // '/articles/edge_baas/icon2.svg' works but '/articles/edge_baas/icon.svg' doesn't
  }
}
