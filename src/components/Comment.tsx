import React from 'react'
import { ReactTinyLink } from 'react-tiny-link'
import styled from 'styled-components'

const CommentWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 20px;
  margin: 25px;

  > .react_tinylink_card {
    box-shadow: none;
  }
`

const PostedDate = styled.span`
  position: absolute;
  color: #697980;
  right: 0;
  top: 0;
`

const Text = styled.p``

interface Props {
  text: string
}

function isValidWebUrl(url: string) {
  let regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)$/gm
  return regEx.test(url)
}

const Comment = ({ text }: Props) => {
  const content = isValidWebUrl(text) ? (
    <ReactTinyLink
      cardSize="small"
      showGraphic={true}
      // maxLine={2}
      minLine={1}
      url={text}
    />
  ) : (
    <Text>{text}</Text>
  )
  return (
    <CommentWrapper>
      <PostedDate>Posted on 2021/04/20</PostedDate>
      {content}
    </CommentWrapper>
  )
}

export default Comment
