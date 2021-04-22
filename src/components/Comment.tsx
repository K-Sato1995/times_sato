import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { firebase } from 'firebaseConfig'
import Linkify from 'react-linkify'
import { FaEllipsisH } from 'react-icons/fa'
import Options from 'components/Options'

const CommentWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 40px 5px;
  margin: 25px;
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
  /* white-space: pre; */
  /* border: solid 1px; */
  > a {
    color: ${(props) => props.theme.primaryColor};
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
    color: ${(props) => props.theme.primaryColor};
    background-color: #a4eef0;
    opacity: 0.7;
  }
`

const OptionsContainer = styled.div`
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  border: 0 solid black;
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;

  .Dropdown-root {
    border: solid 1px;
  }
`

interface Props {
  text: string
  createdAt: firebase.firestore.Timestamp
}

const Comment = ({ text, createdAt }: Props) => {
  const [visible, setVisible] = useState<boolean>(false)

  const handleClick = () => {
    setVisible(!visible)
  }
  return (
    <CommentWrapper>
      <PostedDate>
        {createdAt
          ? `Posted on ${format(new Date(createdAt.toDate()), 'yyyy-MM-dd')}`
          : 'Loading'}
      </PostedDate>

      <OptionsIcon onClick={handleClick} />

      <OptionsContainer>
        <Options visible={visible} />
      </OptionsContainer>

      <Linkify>{text}</Linkify>
    </CommentWrapper>
  )
}

export default Comment
