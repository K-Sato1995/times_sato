import React from 'react'
import styled from 'styled-components'
import { ContentWrapper, CalendarWrapper } from 'components/atoms'
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
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import { format } from 'date-fns'

const TodosConatiner = styled.div`
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-bottom: 0;
`

interface Props {
  currentUser: firebase.User
}

const Todos = ({ currentUser }: Props) => {
  const todosRef = firestore.collection('todos')
  const statusesRef = firestore.collection('statuses')

  const todoQuery = todosRef.orderBy('createdAt', 'asc')
  // Easier than LinkedList since the data is passed as Array.
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
    let tmp = todos?.filter((todo) => todo.status === status.id)
    todosByStatus[status.name] = {
      id: status.id,
      color: status.color,
      order: status.order,
      todos: tmp,
    }
  })

  const formatedTodos = todos
    ?.filter((todo) => todo.due)
    .map((todo) => {
      return {
        id: todo.id,
        title: todo.text,
        date: format(new Date(todo.due?.toDate()), "yyyy-MM-dd'T'HH:mm:ss"),
      }
    })
  if (todoLoading || statusLoading) return <LoadingState />

  return (
    <ContentWrapper>
      <CalendarWrapper>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next',
          }}
          footerToolbar={{ right: 'dayGridMonth,timeGridWeek,listWeek' }}
          events={formatedTodos}
        />
      </CalendarWrapper>
      {Object.keys(todosByStatus).map((key: string, idx: number) => {
        const todos = todosByStatus[key].todos
        const tagColor = todosByStatus[key].color
        const currOrder = todosByStatus[key].order
        const statusID = todosByStatus[key].id
        const status = { id: statusID, name: key, color: tagColor }
        return (
          <StatusContainer key={idx} statusID={statusID}>
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

              <NewTodoForm statusID={statusID} />
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
