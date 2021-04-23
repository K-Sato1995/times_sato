import React, { useState } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { firebase } from 'firebaseConfig'
import Linkify from 'react-linkify'
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa'

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
const OptionsContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
`
const BaseIcon = styled.span`
  color: #697980;
  cursor: pointer;
  margin-top: -10px;
  padding: 10px;
  border-radius: 20%;
  transition: 0.2s;

  :hover {
    color: ${(props: { backgroundColor: string; textColor: string }) =>
      props.textColor};

    background-color: ${(props: {
      backgroundColor: string
      textColor: string
    }) => props.backgroundColor};
    opacity: 0.7;
  }
`

const DeleteIcon = BaseIcon.withComponent(FaTrashAlt)
const EditIcon = BaseIcon.withComponent(FaRegEdit)

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

      <OptionsContainer>
        <DeleteIcon
          textColor="#2c7b7d"
          backgroundColor="#a4eef0"
          onClick={handleClick}
        />
        <EditIcon textColor="#ec2121" backgroundColor="#f0a4a4" />
      </OptionsContainer>

      <Linkify>{text}</Linkify>
    </CommentWrapper>
  )
}

export default Comment
