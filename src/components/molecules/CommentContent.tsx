import React from 'react'
import styled from 'styled-components'
import { ReactTinyLink } from 'react-tiny-link'
import { httpLinkMatcher } from 'utils'
import { MarkdownContent } from 'components/atoms'

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

    > h1,
    h2,
    h3,
    h4 {
      margin: 0;
      padding: 0;
    }

    > ul {
      margin: 0;
    }

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
    margin-top: 0.625rem;
    .react_tinylink_card_media {
      background-color: #fff;
    }
  }
`

const CommentContent = ({ text }: Props) => {
  const extractedUrls = text.match(httpLinkMatcher)

  return (
    <Content>
      <MarkdownContent mdText={text} />

      {extractedUrls?.map((link: string, idx: number) => (
        <ReactTinyLink
          key={idx}
          cardSize="small"
          showGraphic={true}
          maxLine={2}
          minLine={1}
          proxyUrl=""
          defaultMedia="me.png"
          url={`https://api.allorigins.win/raw?url=${encodeURIComponent(link)}`}
        />
      ))}
    </Content>
  )
}

export default CommentContent
