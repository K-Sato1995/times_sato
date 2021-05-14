import React from 'react'
import styled from 'styled-components'
import { NewTodoForm } from 'components/organisms'
import { firebase } from 'firebaseConfig'

const TodosContainer = styled.div`
  padding: 0.1rem 2.35rem;
  border: solid 1px;
`

interface Props {
  currentUser: firebase.User
}

const Todos = ({ currentUser }: Props) => {
  return (
    <>
      <NewTodoForm currentUser={currentUser} />
      <TodosContainer>
        <h1>TODOS</h1>
      </TodosContainer>
    </>
  )
}

export default Todos
