import React from 'react'
import styled from 'styled-components'
import { NewTodoForm, TodoBox } from 'components/organisms'
import { firestore, firebase } from 'firebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { SyncLoader } from 'react-spinners'
import { isKSato } from 'utils'

const TodosContainer = styled.div`
  padding: 0.1rem 2.35rem 3.125rem 2.35rem;
`

const LoaderWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
`

interface Props {
  currentUser: firebase.User
}

const Todos = ({ currentUser }: Props) => {
  const todosRef = firestore.collection('todos')

  let query = todosRef.orderBy('createdAt', 'desc')

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
          {todos?.map((todo) => (
            <TodoBox key={todo.id} todo={todo} currentUser={currentUser} />
          ))}
        </TodosContainer>
      )}
    </>
  )
}

export default Todos
