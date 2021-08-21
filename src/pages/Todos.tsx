import React, { useState } from 'react'
import styled from 'styled-components'
import { ContentWrapper, LoaderWrapper } from 'components/atoms'
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
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'

const TodosConatiner = styled.div`
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-bottom: 0;
`

const RightArrowIcon = styled(FaAngleRight)`
  font-size: 1rem;
  margin-left: 0.4rem;
  border-radius: 50%;
  transition: 0.2s;
  vertical-align: text-top;
  color: #fff;
  cursor: pointer;

  border: solid 1px
    ${(props: { iconColor?: string }) =>
      props.iconColor ? props.iconColor : '#eee'};
  background-color: ${(props: { iconColor?: string }) =>
    props.iconColor ? props.iconColor : '#eee'};
`

const DownArrowIcon = styled(FaAngleDown)`
  font-size: 1rem;
  margin-left: 0.4rem;
  border-radius: 50%;
  transition: 0.2s;
  vertical-align: middle;
  border: solid 1px
    ${(props: { iconColor?: string }) =>
      props.iconColor ? props.iconColor : '#eee'};
  color: ${(props: { iconColor?: string }) =>
    props.iconColor ? props.iconColor : '#eee'};
  cursor: pointer;
`

const UndisplayedStatusTag = styled(StatusTag)`
  border-radius: 2.5px;
`

interface Props {
  currentUser: firebase.User
}

const Todos = ({ currentUser }: Props) => {
  const todosRef = firestore.collection('todos')
  const statusesRef = firestore.collection('statuses')
  const { uid } = currentUser
  const todoQuery = todosRef.orderBy('createdAt', 'asc')
  // Easier than LinkedList since the data is passed as Array.
  const statusesQuery = statusesRef.orderBy('order', 'desc')

  const [displayCompletedTodos, setDisplayCompletedTodos] = useState<boolean>(
    false,
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
    let tmp = todos?.filter((todo) => todo.status === status.id)
    todosByStatus[status.name] = {
      id: status.id,
      color: status.color,
      order: status.order,
      todos: tmp,
    }
  })

  if (todoLoading || statusLoading)
    return (
      <LoaderWrapper>
        <LoadingState />
      </LoaderWrapper>
    )

  return (
    <ContentWrapper>
      {Object.keys(todosByStatus).map((key: string, idx: number) => {
        const todos = todosByStatus[key].todos
        const tagColor = todosByStatus[key].color
        const currOrder = todosByStatus[key].order
        const statusID = todosByStatus[key].id
        const status = { id: statusID, name: key, color: tagColor }

        if (
          !displayCompletedTodos &&
          statusID === process.env.REACT_APP_TODOLAST_STATUS_ID
        )
          return (
            <StatusContainer key={idx} statusID={statusID}>
              <UndisplayedStatusTag
                status={status}
                backgroundColor={tagColor}
                text={`${key}  ${todos.length}Todos`}
              />
              <RightArrowIcon
                iconColor={tagColor}
                onClick={() => {
                  setDisplayCompletedTodos(true)
                }}
              />
            </StatusContainer>
          )

        return (
          <StatusContainer key={idx} statusID={statusID}>
            <StatusTag status={status} backgroundColor={tagColor} text={key} />
            {statusID === process.env.REACT_APP_TODOLAST_STATUS_ID && (
              <DownArrowIcon
                iconColor={tagColor}
                onClick={() => {
                  setDisplayCompletedTodos(false)
                }}
              />
            )}
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

              <NewTodoForm uid={uid} statusID={statusID} />
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
