import React, { useState } from 'react'
import styled from 'styled-components'
import { firebase, firestore } from 'firebaseConfig'
import { isKSato } from 'utils'
import { FaTimes } from 'react-icons/fa'

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

  :hover {
    &::after {
        content: '';
        border-radius: 2.5px;
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        border: ${(props: { color?: string }) =>
          props.color
            ? props.color
            : (props) => props.theme.primaryColor} 1px solid;
      }
    }
  }
`

const StatusOptionsContainer = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 0.3rem;
  margin: 10px 0;
  box-shadow: 0 1px 10px 0 rgb(0 0 0 / 25%);
  background: #fff;
  border-radius: 2.5px;
  z-index: 1000;
  min-width: 150px;
  overflow-y: auto;
`

const StatusOptionTop = styled.div`
  background-color: #fafbfc;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  height: 1.5rem;
`

const CloseIcon = styled(FaTimes)`
  position: absolute;
  right: 5%;
  top: 4%;
  font-size: 1rem;
  color: ${(props) => props.theme.secondaryColor};
`

const StatusOption = styled.div`
  padding: 0.25rem;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.secondaryColor};

  :hover {
    background-color: ${(props: { color?: string }) =>
      props.color ? props.color : (props) => props.theme.primaryColor};
    color: #fff;
  }
`

interface Props {
  todo: firebase.firestore.DocumentData
  currentUser: firebase.User
  statusColor?: string
  statuses?: firebase.firestore.DocumentData[]
}

const TodoBox = ({ todo, currentUser, statusColor, statuses }: Props) => {
  const { text, id } = todo
  const [displayStatusOptions, setDisplayStatusOptions] = useState<boolean>(
    false,
  )

  const { uid } = currentUser
  const todoRef = firestore.collection('todos').doc(id)

  const updateStatus = async (status: string) => {
    if (!isKSato(uid)) {
      alert('YOU ARE NOT ALLOWED TO DO THIS')
      return
    }
    await todoRef
      .update({
        status: status,
      })
      .then(() => {
        console.log('Document successfully updated!')
      })
      .catch((error) => {
        console.error('Error deleting document: ', error)
      })
  }

  return (
    <TodoContainer>
      {displayStatusOptions ? (
        <StatusOptionsContainer>
          <StatusOptionTop>
            <CloseIcon
              onClick={() => {
                setDisplayStatusOptions(false)
              }}
            />
          </StatusOptionTop>
          {statuses
            ?.filter((status) => status.name !== todo.status)
            ?.map((status, idx) => (
              <StatusOption
                color={status.color}
                key={idx}
                onClick={() => {
                  updateStatus(status.name)
                }}
              >
                {status.name}
              </StatusOption>
            ))}
        </StatusOptionsContainer>
      ) : (
        <></>
      )}

      <TodoLeft>
        <StatusIcon
          color={statusColor}
          onClick={() => {
            setDisplayStatusOptions(!displayStatusOptions)
          }}
        />
      </TodoLeft>

      <TodoRight>{text}</TodoRight>
    </TodoContainer>
  )
}

export default TodoBox
