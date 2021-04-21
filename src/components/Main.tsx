import React from 'react'
import styled from 'styled-components'
import Form from 'components/Form'
import Comment from 'components/Comment'
import { firestore, firebase } from 'firebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const MainContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
  margin-top: 20px;
`
const CommentsContainer = styled.div`
  padding: 10px;
`

interface Props {
  currentUser: firebase.User
}

const Main = ({ currentUser }: Props) => {
  const commentsRef = firestore.collection('comments')
  const query = commentsRef.orderBy('createdAt', 'desc')
  const [comments] = useCollectionData(query, { idField: 'id' })

  return (
    <MainContainer>
      <Form currentUser={currentUser} />
      <CommentsContainer>
        {comments &&
          comments.map((comment) => (
            <Comment
              key={comment.id}
              text={comment.text}
              createdAt={comment.createdAt}
            />
          ))}
      </CommentsContainer>
    </MainContainer>
  )
}

export default Main
