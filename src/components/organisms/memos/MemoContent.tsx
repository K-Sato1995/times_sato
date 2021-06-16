import React from 'react'
import styled from 'styled-components'
import { ReactTinyLink } from 'react-tiny-link'
import { httpLinkMatcher } from 'utils'
import { Markdown } from 'components/atoms'

interface Props {
  text: string
}

const Content = styled.div`
  font-size: 1rem;
  width: 100%;
  word-wrap: break-word;

  > .memo-content {
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

  .react_tinylink_card {
    box-shadow: none;
    width: 100%;
    max-width: 100%;
    border-radius: 2.5px;
    max-height: 4.25rem;
    margin-top: 0.625rem;

    .react_tinylink_card_media {
      background-color: #fff;
    }

    .react_tinylink_card_content_description {
      display: none;
    }

    .react_tinylink_footer {
      display: none;
    }
  }
`

const MemoContent = ({ text }: Props) => {
  const extractedUrls = text.match(httpLinkMatcher)

  return (
    <Content>
      <Markdown mdText={text} />

      {extractedUrls?.map((link: string, idx: number) => (
        <div key={idx}>
          <ReactTinyLink
            key={idx}
            cardSize="small"
            showGraphic={true}
            maxLine={2}
            minLine={1}
            proxyUrl={`https://api.allorigins.win/raw?url=${encodeURIComponent(
              link,
            )}`}
            defaultMedia="me.png"
            url={link}
          />
        </div>
      ))}
    </Content>
  )
}

export default MemoContent
