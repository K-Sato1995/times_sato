import React, { useState } from 'react'
import styled, { ThemeProps, css } from 'styled-components'
import { OptionItem } from 'components/atoms'
import { OptionList } from 'components/molecules'
import { firebase, firestore } from 'firebaseConfig'
import { isKSato } from 'utils'
import { useDrag } from 'react-dnd'
import { DragableItemTypes } from 'consts'

const TodoContainer = styled.div`
  position: relative;
  display: flex;
  padding: 0.6rem 0;
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
  cursor: move;

  :hover {
    background-color: #f8f8f8;
  }

  ${(props: { isDragging: boolean }) =>
    props.isDragging &&
    css`
      display: none;
    `}
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

const OptionListWrapper = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 0.3rem;
  z-index: 100;
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

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragableItemTypes.TODOITEM,
    item: { type: DragableItemTypes.TODOITEM, itemID: todo.id },
    drop: () => {
      console.log('Droped')
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
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
    <TodoContainer ref={drag} isDragging={isDragging}>
      {displayStatusOptions && (
        <OptionListWrapper>
          <OptionList setDisplayOptionList={setDisplayStatusOptions}>
            {statuses
              ?.filter((status) => status.name !== todo.status)
              ?.map((status, idx) => (
                <OptionItem
                  hoverBackgroundColor={
                    status.color
                      ? status.color
                      : (props: ThemeProps<any>) => props.theme.primaryColor
                  }
                  key={idx}
                  onClick={() => {
                    updateStatus(status.name)
                  }}
                >
                  {status.name}
                </OptionItem>
              ))}
          </OptionList>
        </OptionListWrapper>
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
