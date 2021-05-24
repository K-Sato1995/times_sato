import React from 'react'
import styled from 'styled-components'
import { LoadingState } from 'components/molecules'
import { NewTodoForm, TodoBox, NewStatusForm } from 'components/organisms'
import { firestore, firebase } from 'firebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const MainWrapper = styled.div`
  padding: 0 2.35rem 3.125rem 2.35rem;

  @media screen and (max-width: 29.9999em) {
    padding: 0.1rem 0.625rem 3.125rem 0.625rem;
  }
`

const TodosConatiner = styled.div`
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-bottom: 0;
`

const StatusContiner = styled.div`
  :not(: first-child) {
    margin-top: 1rem;
  }
`

const StatusTag = styled.span`
  display: inline-block;
  color: #fff;
  border-top-left-radius: 2.5px;
  border-top-right-radius: 2.5px;
  padding: 0.2rem 0.5rem;
  background-color: ${(props: { color?: string }) =>
    props.color ? props.color : (props) => props.theme.primaryColor};
`

interface Props {
  currentUser: firebase.User
}

const Todos = ({ currentUser }: Props) => {
  const todosRef = firestore.collection('todos')
  const statusesRef = firestore.collection('statuses')

  const todoQuery = todosRef.orderBy('createdAt', 'asc')
  const statusesQuery = statusesRef.orderBy('order', 'desc')

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
      color: status.color,
      order: status.order,
      todos: tmp,
    }
  })

  if (todoLoading || statusLoading) return <LoadingState />

  return (
    <MainWrapper>
      {Object.keys(todosByStatus).map((key: string, idx: number) => {
        const todos = todosByStatus[key].todos
        const tagColor = todosByStatus[key].color
        const currOrder = todosByStatus[key].order

        return (
          <StatusContiner key={idx}>
            <StatusTag color={tagColor}>{key}</StatusTag>
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
          </StatusContiner>
        )
      })}
    </MainWrapper>
  )
}

export default Todos
