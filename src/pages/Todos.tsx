import React, { useState } from 'react'
import { LoaderWrapper } from 'components/atoms'
import { LoadingState } from 'components/molecules'
import { db } from 'firebaseConfig'
import { collection, query, orderBy } from 'firebase/firestore'
import useCollectionData from 'hooks/useCollectionData'
import { User } from 'firebase/auth'
import { TodosTemplate } from 'components/templates'

interface Props {
  currentUser: User
}

const Todos = ({ currentUser }: Props) => {
  const todosQuery = query(collection(db, 'todos'), orderBy('createdAt', 'asc'))

  const statusesQuery = query(
    collection(db, 'statuses'),
    orderBy('order', 'desc'),
  )

  const [displayCompletedTodos, setDisplayCompletedTodos] = useState<boolean>(
    false,
  )
  const [todos, todoLoading, todoError] = useCollectionData(todosQuery)

  const [statuses, statusLoading, statusError] = useCollectionData(
    statusesQuery,
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
    <TodosTemplate
      currentUser={currentUser}
      todosByStatus={todosByStatus}
      statuses={statuses}
      displayCompletedTodos={displayCompletedTodos}
      setDisplayCompletedTodos={setDisplayCompletedTodos}
    />
  )
}

export default Todos
