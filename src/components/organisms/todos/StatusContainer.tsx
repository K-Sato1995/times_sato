import React from 'react'
import styled from 'styled-components'
import { useDrop } from 'react-dnd'
import {} from 'react-dnd-html5-backend'
import { DragableItemTypes } from 'consts'

const StatusContiner = styled.div`
  :not(: first-child) {
    margin-top: 1rem;
  }
`
const StatusContainer = ({ children }: { children: React.ReactNode }) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: DragableItemTypes.TODOITEM,
      drop: () => {
        console.log('Drop')
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [],
  )
  return <StatusContiner ref={drop}>{children}</StatusContiner>
}

export default StatusContainer
