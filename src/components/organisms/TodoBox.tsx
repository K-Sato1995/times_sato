import React from 'react'
import styled from 'styled-components'
import { firebase, firestore } from 'firebaseConfig'
import { FaCheckCircle, FaRegCheckCircle } from 'react-icons/fa'
import { isKSato } from 'utils'

const TodoContainer = styled.div`
  position: relative;
  display: flex;
  padding: 1rem 0.315rem;
  margin: 1.625rem 0;
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-radius: 5px;
  cursor: pointer;

  :hover {
    background-color: #f8f8f8;
  }
  @media screen and (max-width: 29.9999em) {
    margin: 1.5625rem 0;
  }
`

const TodoLeft = styled.div`
  display: flex;
  justify-content: center;
  width: 5%;
`
const TodoRight = styled.div`
  width: 95%;
  font-size: 1rem;
  word-wrap: break-word;
`

const CheckIcon = styled(FaRegCheckCircle)`
  font-size: 1rem;
  color: ${(props) => props.theme.secondaryColor};
`

const CheckedIcon = styled(FaCheckCircle)`
  font-size: 1rem;
  color: ${(props) => props.theme.primaryColor};
`

interface Props {
  todo: firebase.firestore.DocumentData
  currentUser: firebase.User
}

const TodoBox = ({ todo, currentUser }: Props) => {
  const { id, text, completed } = todo
  const { uid } = currentUser

  const todoRef = firestore.collection('todos').doc(id)

  const toggleTodo = async () => {
    if (!isKSato(uid)) {
      alert('YOU ARE NOT ALLOWED TO DO THIS')
      return
    }
    await todoRef
      .update({
        completed: !completed,
      })
      .then(() => {
        console.log('Document successfully updated!')
      })
      .catch((error) => {
        console.error('Error deleting document: ', error)
      })
  }

  return (
    <TodoContainer
      onClick={() => {
        toggleTodo()
      }}
    >
      <TodoLeft>{completed ? <CheckedIcon /> : <CheckIcon />}</TodoLeft>

      <TodoRight>{text}</TodoRight>
    </TodoContainer>
  )
}

export default TodoBox
