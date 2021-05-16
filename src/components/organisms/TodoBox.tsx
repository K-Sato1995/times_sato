import React from 'react'
import styled from 'styled-components'
import { firebase } from 'firebaseConfig'
// import { isKSato } from 'utils'

const TodoContainer = styled.div`
  position: relative;
  display: flex;
  padding: 0.6rem 0;
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
  cursor: pointer;

  :hover {
    background-color: #f8f8f8;
  }
`

const TodoLeft = styled.div`
  position: relative;
  width: 5%;
`
const TodoRight = styled.div`
  width: 95%;
  font-size: 1rem;
  word-wrap: break-word;
`

const StatusIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;
  border-radius: 2.5px;
  cursor: pointer;
  height: 10px;
  width: 10px;
  margin-top: -5px;
  margin-left: -5px;
  background-color: ${(props: { color?: string }) =>
    props.color ? props.color : (props) => props.theme.primaryColor};
`

interface Props {
  todo: firebase.firestore.DocumentData
  currentUser: firebase.User
  statusColor?: string
}

const TodoBox = ({ todo, currentUser, statusColor }: Props) => {
  const { text } = todo
  // const { uid } = currentUser
  // const todoRef = firestore.collection('todos').doc(id)

  // const toggleTodo = async () => {
  //   if (!isKSato(uid)) {
  //     alert('YOU ARE NOT ALLOWED TO DO THIS')
  //     return
  //   }
  //   await todoRef
  //     .update({
  //       completed: !completed,
  //     })
  //     .then(() => {
  //       console.log('Document successfully updated!')
  //     })
  //     .catch((error) => {
  //       console.error('Error deleting document: ', error)
  //     })
  // }

  return (
    <TodoContainer
    // onClick={() => {
    //   toggleTodo()
    // }}
    >
      <TodoLeft>
        <StatusIcon color={statusColor} />
      </TodoLeft>

      <TodoRight>{text}</TodoRight>
    </TodoContainer>
  )
}

export default TodoBox
