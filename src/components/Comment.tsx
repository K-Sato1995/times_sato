import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { firebase } from 'firebaseConfig'
import Linkify from 'react-linkify'

const CommentWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  margin: 25px;
  /* border: solid 1px; */

  > a {
    color: #2c7b7d;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`

const PostedDate = styled.span`
  position: absolute;
  color: #697980;
  right: 0;
  top: 0;
`

interface Props {
  text: string
  createdAt: firebase.firestore.Timestamp
}

const Comment = ({ text, createdAt }: Props) => {
  return (
    <CommentWrapper>
      <PostedDate>
        {createdAt
          ? `Posted on ${format(new Date(createdAt.toDate()), 'yyyy-MM-dd')}`
          : 'Loading'}
      </PostedDate>
      <Linkify>{text}</Linkify>
    </CommentWrapper>
  )
}

export default Comment
