import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { firebase, firestore } from 'firebaseConfig'
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa'
import { isKSato, isValidWebUrl } from 'utils'
import { ReactTinyLink } from 'react-tiny-link'

const CommentWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 40px 5px;
  margin: 25px;
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;

  @media screen and (max-width: 29.9999em) {
    margin: 25px 0;
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
  display: ${(props: StyledCompsProps) => props.isVisible};
`

const BaseIcon = styled.span`
  font-size: 1rem;
  color: #697980;
  cursor: pointer;
  margin-top: -10px;
  padding: 10px;
  border-radius: 20%;
  transition: 0.2s;

  :hover {
    color: ${(props: StyledCompsProps) => props.textColor};
    background-color: ${(props: StyledCompsProps) => props.backgroundColor};
    opacity: 0.7;
  }
`

const DeleteIcon = BaseIcon.withComponent(FaTrashAlt)
const EditIcon = BaseIcon.withComponent(FaRegEdit)

const Content = styled.div`
  font-size: 1rem;
  width: auto;
  max-width: 100%;
  word-wrap: break-word;
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

interface Props {
  comment: firebase.firestore.DocumentData
  currentUser: firebase.User
}

const Comment = ({ comment, currentUser }: Props) => {
  const { id, text, createdAt } = comment
  const { uid } = currentUser

  const content = isValidWebUrl(text) ? (
    <ReactTinyLink
      cardSize="small"
      showGraphic={true}
      maxLine={2}
      minLine={1}
      proxyUrl=""
      defaultMedia="logo512.png"
      url={`https://api.allorigins.win/get?url=${encodeURIComponent(text)}`}
    />
  ) : (
    text
  )
  const handleClick = () => {
    if (window.confirm('Are you sure you wish to delete this comment?')) {
      firestore
        .collection('comments')
        .doc(id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!')
        })
        .catch((error) => {
          console.error('Error removing document: ', error)
        })
    }
  }

  return (
    <CommentWrapper>
      <PostedDate>
        {createdAt
          ? `Posted on ${format(new Date(createdAt.toDate()), 'yyyy-MM-dd')}`
          : 'Loading'}
      </PostedDate>

      <OptionsContainer isVisible={`${isKSato(uid) ? '' : 'none'}`}>
        <DeleteIcon
          textColor="#ec2121"
          backgroundColor="#f0a4a4"
          onClick={handleClick}
        />
        <EditIcon textColor="#2c7b7d" backgroundColor="#a4eef0" />
      </OptionsContainer>

      <Content>{content}</Content>
    </CommentWrapper>
  )
}

export default Comment
