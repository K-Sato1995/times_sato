import React from 'react'
import styled from 'styled-components'
import { ReactTinyLink } from 'react-tiny-link'
import ReactMarkdown from 'react-markdown'
import { httpLinkMatcher } from 'utils'
import gfm from 'remark-gfm'
import SyntaxHighlighter from 'react-syntax-highlighter'

interface Props {
  text: string
}

const Content = styled.div`
  font-size: 1rem;
  width: auto;
  max-width: 100%;
  word-wrap: break-word;

  > .comment-content {
    white-space: pre-wrap;

    > p > a {
      text-decoration: none;
      color: ${(props) => props.theme.primaryColor};

      :hover {
        color: #014042;
      }
    }
  }

  > .react_tinylink_card {
    box-shadow: none;
    width: 100%;
    max-width: 100%;
    border-radius: 5px;

    .react_tinylink_card_media {
      background-color: #fff;
    }
  }
`

const CommentContent = ({ text }: Props) => {
  const extractedUrls = text.match(httpLinkMatcher)
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
    <Content>
      <ReactMarkdown
        remarkPlugins={[gfm]}
        components={syntaxHighlighting}
        className={'comment-content'}
      >
        {text.replace(httpLinkMatcher, '').replace(/\n/gi, '\n &nbsp;')}
      </ReactMarkdown>

      {extractedUrls?.map((link: string, idx: number) => (
        <ReactTinyLink
          key={idx}
          cardSize="small"
          showGraphic={true}
          maxLine={2}
          minLine={1}
          proxyUrl=""
          defaultMedia="logo512.png"
          url={`https://api.allorigins.win/raw?url=${encodeURIComponent(link)}`}
        />
      ))}
    </Content>
  )
}

export default CommentContent
