import React, { useState } from 'react'
import styled from 'styled-components'
import { firestore, firebase } from 'firebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { isKSato } from 'utils'
import { CommentSortOptions, LoadingState, NoItem } from 'components/molecules'
import { CommentBox, NewCommentForm } from 'components/organisms'

const CommentsContainer = styled.div`
  padding: 0.1rem 2.35rem 3.125rem 2.35rem;

  @media screen and (max-width: 29.9999em) {
    padding: 0.1rem 0.625rem 3.125rem 0.625rem;
  }
`

interface Props {
  currentUser: firebase.User
}

const Times = ({ currentUser }: Props) => {
  const [dislpayDeletedComments, setDislpayDeletedComments] = useState<boolean>(
    false,
  )
  const [dislpayNewItemForm, setDislpayNewItemForm] = useState<boolean>(false)

  const commentsRef = firestore.collection('comments')

  let query = commentsRef.orderBy('createdAt', 'desc')

  if (dislpayDeletedComments) {
    query = commentsRef.orderBy('createdAt', 'desc')
  } else {
    query = commentsRef
      .where('deleted', '==', false)
      .orderBy('createdAt', 'desc')
  }

  const [comments, loading, error] = useCollectionData(query, { idField: 'id' })

  const pinnedComments = comments?.filter((comment) => comment.pinned)
  const otherComments = comments?.filter((comment) => !comment.pinned)

  if (error) {
    console.log(error?.message)
  }

  if (loading) {
    return <LoadingState />
  }

  if (!comments?.length) {
    return (
      <CommentsContainer>
        <CommentSortOptions
          dislpayDeletedComments={dislpayDeletedComments}
          setDislpayDeletedComments={setDislpayDeletedComments}
          dislpayNewItemForm={dislpayNewItemForm}
          setDislpayNewItemForm={setDislpayNewItemForm}
        />

        {isKSato(currentUser.uid) && dislpayNewItemForm && (
          <NewCommentForm currentUser={currentUser} />
        )}

        <NoItem />
      </CommentsContainer>
    )
  }

  return (
    <CommentsContainer>
      <CommentSortOptions
        dislpayDeletedComments={dislpayDeletedComments}
        setDislpayDeletedComments={setDislpayDeletedComments}
        dislpayNewItemForm={dislpayNewItemForm}
        setDislpayNewItemForm={setDislpayNewItemForm}
      />
      {isKSato(currentUser.uid) && dislpayNewItemForm && (
        <NewCommentForm currentUser={currentUser} />
      )}

      {pinnedComments &&
        pinnedComments.map((comment) => (
          <CommentBox
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
          />
        ))}

      {otherComments &&
        otherComments.map((comment) => (
          <CommentBox
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
          />
        ))}
    </CommentsContainer>
  )
}

export default Times
