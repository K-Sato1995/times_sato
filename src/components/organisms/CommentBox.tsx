import React, { useState } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import { firebase, firestore } from 'firebaseConfig'
import {
  FaRegTrashAlt,
  FaRegEdit,
  FaRegStar,
  FaStar,
  FaRegArrowAltCircleUp,
} from 'react-icons/fa'
import { isKSato } from 'utils'
import { Icon } from 'components/atoms'
import { CommentContent } from 'components/molecules'
import { EditCommentForm } from 'components/organisms'

const CommentWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 1.5rem 0.315rem;
  margin: 1.625rem 0;

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

const Delted = styled.span`
  position: absolute;
  color: #e66d6d;
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

const DeleteIcon = Icon.withComponent(FaRegTrashAlt)
const EditIcon = Icon.withComponent(FaRegEdit)
const FavIcon = Icon.withComponent(FaRegStar)
const RestoreIcon = Icon.withComponent(FaRegArrowAltCircleUp)

const FavedIcon = styled(FaStar)`
  font-size: 1rem;
  color: #ffd700;
  cursor: pointer;
  margin-top: -10px;
  padding: 10px;
  border-radius: 20%;
  transition: 0.2s;

  :hover {
    opacity: 0.7;
  }
`

interface Props {
  comment: firebase.firestore.DocumentData
  currentUser: firebase.User
}

const Comment = ({ comment, currentUser }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const { id, text, pinned, createdAt, deleted } = comment
  const { uid } = currentUser

  const commentRef = firestore.collection('comments').doc(id)

  const logicalDelteComment = async () => {
    if (window.confirm('Are you sure you wish to delete this comment?')) {
      await commentRef
        .update({
          deleted: true,
        })
        .then(() => {
          console.log('Document successfully deleted!')
        })
        .catch((error) => {
          console.error('Error deleting document: ', error)
        })
    }
  }

  const pinComment = async () => {
    await commentRef
      .update({
        pinned: true,
      })
      .then(() => {
        console.log('Pinned the comment')
      })
      .catch((error) => {
        console.error('Error pinning document: ', error)
      })
  }

  const unpinComment = async () => {
    await commentRef
      .update({
        pinned: false,
      })
      .then(() => {
        console.log('Unpinned the comment')
      })
      .catch((error) => {
        console.error('Error unpinning document: ', error)
      })
  }

  const restoreDeltedComment = async () => {
    if (window.confirm('Are you sure you wish to restore this comment?')) {
      await commentRef
        .update({
          deleted: false,
        })
        .then(() => {
          // alert('Document successfully restored!')
        })
        .catch((error) => {
          console.error('Error deleting document: ', error)
        })
    }
  }

  const editComment = () => {
    setIsEditing(!isEditing)
  }

  return (
    <CommentWrapper>
      {deleted ? (
        <Delted>Delted Comment</Delted>
      ) : (
        <PostedDate>
          {createdAt
            ? `Posted on ${format(new Date(createdAt.toDate()), 'yyyy-MM-dd')}`
            : 'Loading'}
        </PostedDate>
      )}

      <OptionsContainer isVisible={`${isKSato(uid) ? '' : 'none'}`}>
        {deleted ? (
          <RestoreIcon
            textColor="#2c7b7d"
            backgroundColor="#a4eef0"
            onClick={restoreDeltedComment}
          />
        ) : (
          <>
            <DeleteIcon
              textColor="#ec2121"
              backgroundColor="#f0a4a4"
              onClick={logicalDelteComment}
            />

            <EditIcon
              onClick={editComment}
              textColor="#2c7b7d"
              backgroundColor="#a4eef0"
            />

            {pinned ? (
              <FavedIcon onClick={unpinComment} />
            ) : (
              <FavIcon
                onClick={pinComment}
                textColor="#bb9f03"
                backgroundColor="#fbff81"
              />
            )}
          </>
        )}
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

// const physicalDeleteComment = () => {
//   if (window.confirm('Are you sure you wish to delete this comment?')) {
//     firestore
//       .collection('comments')
//       .doc(id)
//       .delete()
//       .then(() => {
//         console.log('Document successfully deleted!')
//       })
//       .catch((error) => {
//         console.error('Error removing document: ', error)
//       })
//   }
// }
