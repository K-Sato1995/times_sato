import React from 'react'
import styled from 'styled-components'
import Form from 'components/Form'
import Comment from 'components/Comment'
import { firestore } from 'firebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const MainContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
  margin-top: 20px;
`
const CommentsContainer = styled.div`
  padding: 10px;
`
const Main = () => {
  const commentsRef = firestore.collection('comments')
  const query = commentsRef.orderBy('createdAt', 'desc')
  const [comments] = useCollectionData(query, { idField: 'id' })

  return (
    <MainContainer>
      <Form />
      <CommentsContainer>
        {comments &&
          comments.map((msg) => <Comment key={msg.id} text={msg.text} />)}
      </CommentsContainer>
    </MainContainer>
  )
}

export default Main
