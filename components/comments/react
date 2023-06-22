import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import Giscus from '@giscus/react'

import siteMetadata from '@/data/siteMetadata'

export default function GiscusReact() {
  const {
    repo,
    repositoryId,
    category,
    categoryId,
    pathname,
    mapping,
    reactions,
    metadata,
    inputPosition,
    lang,
    loading,
  } = siteMetadata?.comment?.giscusConfig

  const { theme, resolvedTheme } = useTheme()
  const commentsTheme =
    siteMetadata.comment.giscusConfig.themeURL === ''
      ? theme === 'dark' || resolvedTheme === 'dark'
        ? siteMetadata.comment.giscusConfig.darkTheme
        : siteMetadata.comment.giscusConfig.theme
      : siteMetadata.comment.giscusConfig.themeURL

  useEffect(() => {
    const iframe = document.querySelector('iframe.giscus-frame')
    if (!iframe) return
  }, [commentsTheme])

  return (
    <Giscus
      id="comments"
      repo={repo}
      repoId={repositoryId}
      category={category}
      categoryId={categoryId}
      term={pathname}
      mapping={mapping}
      reactionsEnabled={reactions}
      emitMetadata={metadata}
      inputPosition={inputPosition}
      theme={theme}
      lang={lang}
      loading={loading}
    />
  )
}
