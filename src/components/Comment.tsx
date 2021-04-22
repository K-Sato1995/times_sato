import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { firebase } from 'firebaseConfig'
import Linkify from 'react-linkify'
import { FaEllipsisH } from 'react-icons/fa'

const CommentWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 40px 5px;
  margin: 25px;
  border-bottom: solid #e0e0e0 1px;
  /* white-space: pre; */
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
  left: 5px;
  top: 0;
`

const OptionsIcon = styled(FaEllipsisH)`
  position: absolute;
  color: #697980;
  right: 0;
  top: 0;
  cursor: pointer;
  margin-top: -10px;
  padding: 10px;
  border-radius: 50px;
  transition: 0.2s;

  :hover {
    color: #2c7b7d;
    background-color: #a4eef0;
    opacity: 0.7;
  }
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
      <OptionsIcon />
      <Linkify>{text}</Linkify>
    </CommentWrapper>
  )
}

export default Comment
