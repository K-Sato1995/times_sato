import React from 'react'
import styled, { css } from 'styled-components'
import { useDrop } from 'react-dnd'
import { db } from 'firebaseConfig'
import { DragableItemTypes } from 'consts'
import { updateDoc, doc } from 'firebase/firestore'

const StatusContiner = styled.div`
  ${(props: { isOver: boolean }) =>
    props.isOver &&
    css`
      opacity: 0.5;
    `}

  :not(: first-child) {
    margin-top: 1rem;
  }
`

interface Props {
  statusID: string
  children: React.ReactNode
}

const StatusContainer = ({ statusID, children }: Props) => {
  const updateStatus = async (todoID: string) => {
    const todoRef = doc(db, 'todos', todoID)

    await updateDoc(todoRef, {
      status: statusID,
    })
      .then(() => {
        console.log('Document successfully updated!')
      })
      .catch((error) => {
        console.error('Error deleting document: ', error)
      })
  }

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DragableItemTypes.TODOITEM,
      drop: (monitor: any) => {
        updateStatus(monitor.itemID)
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [],
  )
  return (
    <StatusContiner ref={drop} isOver={isOver}>
      {children}
    </StatusContiner>
  )
}

export default StatusContainer
