import React from 'react'
import styled from 'styled-components'
import Form from 'components/Form'
import { firestore, firebase } from 'firebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { isKSato } from 'utils'
import { SyncLoader } from 'react-spinners'
import { CommentBox } from 'components/organisms'

const MainContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
  margin-top: 20px;
`
const CommentsContainer = styled.div`
  padding: 0.1rem 0.625rem;
`

const LoaderWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
`

interface Props {
  currentUser: firebase.User
}

const Main = ({ currentUser }: Props) => {
  const commentsRef = firestore.collection('comments')
  const query = commentsRef.orderBy('createdAt', 'desc')
  const [comments, loading] = useCollectionData(query, { idField: 'id' })

  return (
    <MainContainer>
      {isKSato(currentUser.uid) && <Form currentUser={currentUser} />}
      {loading ? (
        <LoaderWrapper>
          <SyncLoader color={'#e0e0e0'} />
        </LoaderWrapper>
      ) : (
        <CommentsContainer>
          {comments &&
            comments.map((comment) => (
              <CommentBox
                key={comment.id}
                comment={comment}
                currentUser={currentUser}
              />
            ))}
        </CommentsContainer>
      )}
    </MainContainer>
  )
}

export default Main
