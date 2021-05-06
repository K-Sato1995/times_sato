import React, { useState } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { firebase, firestore } from 'firebaseConfig'
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa'
import { isKSato } from 'utils'
import { Icon } from 'components/atoms'
import { CommentContent } from 'components/molecules'
import { EditCommentForm } from 'components/organisms'

const CommentWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 2.5rem 0.315rem;
  margin: 1.625rem;
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

const DeleteIcon = Icon.withComponent(FaTrashAlt)
const EditIcon = Icon.withComponent(FaRegEdit)

interface Props {
  comment: firebase.firestore.DocumentData
  currentUser: firebase.User
}

const Comment = ({ comment, currentUser }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { id, text, createdAt } = comment
  const { uid } = currentUser

  const deleteComment = () => {
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

  const editComment = () => {
    setIsEditing(!isEditing)
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
          onClick={deleteComment}
        />
        <EditIcon
          onClick={editComment}
          textColor="#2c7b7d"
          backgroundColor="#a4eef0"
        />
      </OptionsContainer>

      {isEditing ? (
        <EditCommentForm comment={comment} setIsEditing={setIsEditing} />
      ) : (
        <CommentContent text={text} />
      )}
    </CommentWrapper>
  )
}

export default Comment
