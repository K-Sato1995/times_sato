import React from 'react'
import { ReactTinyLink } from 'react-tiny-link'
import styled from 'styled-components'

const CommentWrapper = styled.div`
  /* border: solid #e5e5e5 1px; */
  position: relative;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 20px;
  margin: 25px;
`

const PostedDate = styled.span`
  position: absolute;
  color: #697980;
  right: 0;
  top: 0;
`

const Comment = () => {
  return (
    <CommentWrapper>
      <PostedDate>Posted on 2021/04/20</PostedDate>
      <ReactTinyLink
        cardSize="small"
        showGraphic={true}
        // maxLine={2}
        minLine={1}
        url="https://qiita.com/ke-bo/items/1de55991d1b7b1166fb9"
      />
    </CommentWrapper>
  )
}

export default Comment
