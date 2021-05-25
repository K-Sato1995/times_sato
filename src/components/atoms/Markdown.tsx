import React from 'react'
import ReactMarkdown from 'react-markdown'
import { httpLinkMatcher } from 'utils'
import gfm from 'remark-gfm'
import SyntaxHighlighter from 'react-syntax-highlighter'

interface Props {
  mdText: string
}

const Markdown = ({ mdText }: Props) => {
  const syntaxHighlighting = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter language={match[1]} PreTag="div" {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props} />
      )
    },
  }
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      components={syntaxHighlighting}
      className={'memo-content'}
    >
      {mdText.replace(httpLinkMatcher, '')}
    </ReactMarkdown>
  )
}

export default Markdown
