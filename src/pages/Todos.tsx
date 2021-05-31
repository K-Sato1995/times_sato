import React from 'react'
import styled from 'styled-components'
import { ContentWrapper } from 'components/atoms'
import { LoadingState } from 'components/molecules'
import {
  NewTodoForm,
  TodoBox,
  NewStatusForm,
  StatusTag,
  StatusContainer,
} from 'components/organisms'
import { firestore, firebase } from 'firebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useDrop } from 'react-dnd'
import {} from 'react-dnd-html5-backend'
import { DragableItemTypes } from 'consts'

const TodosConatiner = styled.div`
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-bottom: 0;
`

const StatusContiner = styled.div`
  :not(: first-child) {
    margin-top: 1rem;
  }
`

interface Props {
  currentUser: firebase.User
}

const Todos = ({ currentUser }: Props) => {
  const todosRef = firestore.collection('todos')
  const statusesRef = firestore.collection('statuses')

  const todoQuery = todosRef.orderBy('createdAt', 'asc')
  const statusesQuery = statusesRef.orderBy('order', 'desc')

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
  const [todos, todoLoading, todoError] = useCollectionData(todoQuery, {
    idField: 'id',
  })

  const [statuses, statusLoading, statusError] = useCollectionData(
    statusesQuery,
    {
      idField: 'id',
    },
  )

  if (statusError || todoError) {
    statusError && console.log(statusError.message)
    todoError && console.log(todoError.message)
  }

  let todosByStatus: TodosByStatus = {}

  statuses?.forEach((status) => {
    let tmp = todos?.filter((todo) => todo.status === status.name)
    todosByStatus[status.name] = {
      id: status.id,
      color: status.color,
      order: status.order,
      todos: tmp,
    }
  })

  if (todoLoading || statusLoading) return <LoadingState />

  return (
    <ContentWrapper>
      {Object.keys(todosByStatus).map((key: string, idx: number) => {
        const todos = todosByStatus[key].todos
        const tagColor = todosByStatus[key].color
        const currOrder = todosByStatus[key].order
        const statusID = todosByStatus[key].id
        const status = { id: statusID, name: key, color: tagColor }
        return (
          <StatusContainer key={idx}>
            <StatusTag status={status} backgroundColor={tagColor} text={key} />
            <TodosConatiner key={idx}>
              {todos?.map((todo: any) => (
                <TodoBox
                  key={todo.id}
                  todo={todo}
                  statusColor={tagColor}
                  statuses={statuses}
                  currentUser={currentUser}
                />
              ))}

              <NewTodoForm
                currentUser={currentUser}
                status={key}
                statusColor={tagColor}
              />
            </TodosConatiner>

            <NewStatusForm
              currentUser={currentUser}
              statuses={statuses}
              currOrder={currOrder}
            />
          </StatusContainer>
        )
      })}
    </ContentWrapper>
  )
}

export default Todos
