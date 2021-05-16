import React from 'react'
import styled from 'styled-components'
import { NewTodoForm, TodoBox } from 'components/organisms'
import { firestore, firebase } from 'firebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { SyncLoader } from 'react-spinners'
import { Heading } from 'components/atoms'
// import { isKSato } from 'utils'

const MainWrapper = styled.div`
  padding: 0 2.35rem 4.125rem 2.35rem;

  .statusContainer:not(: first-child) {
    margin-top: 1rem;
  }

  @media screen and (max-width: 29.9999em) {
    padding: 0.1rem 0.625rem 3.125rem 0.625rem;
  }
`

const TodosConatiner = styled.div`
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-bottom: 0;
`

const StatusContiner = styled.div``

const LoaderWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
`

const NoPostWrapper = styled.div`
  padding: 2.5rem 0.315rem;
  display: flex;
  justify-content: center;
  margin: 1.625rem;
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

  const [todos, todoLoading, todoError] = useCollectionData(todoQuery, {
    idField: 'id',
  })

  const [statuses, statusLoading, statusError] = useCollectionData(
    statusesRef,
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
    todosByStatus[status.name] = { color: status.color }
    todosByStatus[status.name] = { ...todosByStatus[status.name], todos: tmp }
  })

  return (
    <>
      {todoLoading || statusLoading ? (
        <LoaderWrapper>
          <SyncLoader color={'#e0e0e0'} />
        </LoaderWrapper>
      ) : (
        <MainWrapper>
          {todosByStatus ? (
            <>
              {Object.keys(todosByStatus).map((key: string, idx: number) => {
                const todos = todosByStatus[key].todos
                const tagColor = todosByStatus[key].color

                return (
                  <StatusContiner key={idx} className="statusContainer">
                    <StatusTag color={tagColor}>{key}</StatusTag>
                    <TodosConatiner key={idx}>
                      {todos?.map((todo: any) => (
                        <TodoBox
                          key={todo.id}
                          todo={todo}
                          statusColor={tagColor}
                          currentUser={currentUser}
                        />
                      ))}

                      <NewTodoForm
                        currentUser={currentUser}
                        status={key}
                        statusColor={tagColor}
                      />
                    </TodosConatiner>
                  </StatusContiner>
                )
              })}
            </>
          ) : (
            <NoPostWrapper>
              <Heading size="h2">Nothing was posted yet....</Heading>
            </NoPostWrapper>
          )}
        </MainWrapper>
      )}
    </>
  )
}

export default Todos
