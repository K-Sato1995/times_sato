import React from 'react'
import styled from 'styled-components'
import { NewTodoForm, TodoBox } from 'components/organisms'
import { firestore, firebase } from 'firebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { SyncLoader } from 'react-spinners'
import { Heading } from 'components/atoms'
import { isKSato } from 'utils'

const TodosContainer = styled.div`
  padding: 0 2.35rem 3.125rem 2.35rem;

  @media screen and (max-width: 29.9999em) {
    padding: 0.1rem 0.625rem 3.125rem 0.625rem;
  }
`

const LoaderWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
`

const NoPostWrapper = styled.div`
  padding: 2.5rem 0.315rem;
  display: flex;
  justify-content: center;
  margin: 1.625rem;
`

interface Props {
  currentUser: firebase.User
}

const Todos = ({ currentUser }: Props) => {
  const todosRef = firestore.collection('todos')

  let query = todosRef
    // .where('completed', '==', false)
    .orderBy('createdAt', 'desc')

  const [todos, loading, error] = useCollectionData(query, { idField: 'id' })

  if (error) {
    console.log(error.message)
  }

  return (
    <>
      {isKSato(currentUser.uid) && <NewTodoForm currentUser={currentUser} />}

      {loading ? (
        <LoaderWrapper>
          <SyncLoader color={'#e0e0e0'} />
        </LoaderWrapper>
      ) : (
        <TodosContainer>
          {todos?.length ? (
            <>
              {todos?.map((todo) => (
                <TodoBox key={todo.id} todo={todo} currentUser={currentUser} />
              ))}
            </>
          ) : (
            <NoPostWrapper>
              <Heading size="h2">Nothing was posted yet....</Heading>
            </NoPostWrapper>
          )}
        </TodosContainer>
      )}
    </>
  )
}

export default Todos
