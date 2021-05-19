import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { format } from 'date-fns'
import { firebase, firestore } from 'firebaseConfig'
import {
  FaRegTrashAlt,
  FaRegEdit,
  FaRegStar,
  FaStar,
  FaRegArrowAltCircleUp,
  FaEllipsisH,
  FaTimes,
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

const RestoreIcon = Icon.withComponent(FaRegArrowAltCircleUp)
const FavIcon = styled(FaRegStar)`
  vertical-align: text-top;
`
const DeleteIcon = styled(FaRegTrashAlt)`
  vertical-align: text-top;
`
const EditIcon = styled(FaRegEdit)`
  vertical-align: text-top;
`

const OptionsIcon = styled(FaEllipsisH)`
  color: ${(props) => props.theme.secondaryColor};
  font-size: 1rem;
  cursor: pointer;
  margin-top: -10px;
  padding: 10px;
  border-radius: 50%;
  transition: 0.2s;

  :hover {
    opacity: 0.7;
    background-color: #a4eef0;
  }
`

const FavedIcon = styled(FaStar)`
  font-size: 1rem;
  margin-left: 0.4rem;
  color: #ffd700;
  border-radius: 20%;
  transition: 0.2s;
  vertical-align: text-top;
`
const OptionsList = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.3rem;
  margin: 10px 0;
  box-shadow: 0 1px 10px 0 rgb(0 0 0 / 25%);
  background: #fff;
  border-radius: 2.5px;
  z-index: 1000;
  min-width: 150px;
  overflow-y: auto;

  ${(props: { isDisplayed?: boolean }) =>
    !props.isDisplayed &&
    css`
      display: none;
    `}
`

const ListTop = styled.div`
  background-color: #fafbfc;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  height: 1.5rem;
`

const CloseIcon = styled(FaTimes)`
  position: absolute;
  right: 5%;
  top: 4%;
  font-size: 1rem;
  cursor: pointer;
  color: ${(props) => props.theme.secondaryColor};
`

const OptionItem = styled.div`
  padding: 0.25rem;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.secondaryColor};
  cursor: pointer;

  :hover {
    background-color: #f8f8f8;
  }
`

interface Props {
  comment: firebase.firestore.DocumentData
  currentUser: firebase.User
}

const Comment = ({ comment, currentUser }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [displayOptions, setDisplayOptions] = useState<boolean>(false)
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

          {pinned && <FavedIcon />}
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
            <OptionsIcon
              onClick={() => {
                setDisplayOptions(true)
              }}
            />

            <OptionsList isDisplayed={displayOptions}>
              <ListTop>
                <CloseIcon
                  onClick={() => {
                    setDisplayOptions(false)
                  }}
                />
              </ListTop>

              <OptionItem onClick={logicalDelteComment}>
                <DeleteIcon /> Delete
              </OptionItem>

              <OptionItem onClick={editComment}>
                <EditIcon /> Edit
              </OptionItem>

              {pinned ? (
                <OptionItem onClick={unpinComment}>
                  <FavIcon /> UnStar
                </OptionItem>
              ) : (
                <OptionItem onClick={pinComment}>
                  <FavIcon /> Star
                </OptionItem>
              )}
            </OptionsList>
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
