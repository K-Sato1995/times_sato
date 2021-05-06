import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { firebase, firestore } from 'firebaseConfig'
import { FaTrashAlt } from 'react-icons/fa'
import { isKSato } from 'utils'
import { Icon } from 'components/atoms'
import { CommentContent } from 'components/molecules'

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

const RestoreIcon = Icon.withComponent(FaTrashAlt)

interface Props {
  comment: firebase.firestore.DocumentData
  currentUser: firebase.User
}

const DeletedComment = ({ comment, currentUser }: Props) => {
  const { id, text, createdAt } = comment
  const { uid } = currentUser

  const commentRef = firestore.collection('comments').doc(id)

  const restoreDeltedComment = async () => {
    if (window.confirm('Are you sure you wish to delete this comment?')) {
      await commentRef
        .update({
          deleted: true,
        })
        .then(() => {
          alert('Document successfully deleted!')
        })
        .catch((error) => {
          console.error('Error deleting document: ', error)
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
        <RestoreIcon
          textColor="#ec2121"
          backgroundColor="#f0a4a4"
          onClick={restoreDeltedComment}
        />
      </OptionsContainer>
      <CommentContent text={text} />
    </CommentWrapper>
  )
}

export default DeletedComment
