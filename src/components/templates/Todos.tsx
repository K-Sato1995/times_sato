import React from 'react'
import styled from 'styled-components'
import { ContentWrapper } from 'components/atoms'
import {
  NewTodoForm,
  TodoBox,
  NewStatusForm,
  StatusTag,
  StatusContainer,
} from 'components/organisms'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import { User } from 'firebase/auth'
import { DocumentData } from 'firebase/firestore'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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
  currentUser: User
  todosByStatus: TodosByStatus
  statuses: DocumentData[]
  displayCompletedTodos: boolean
  setDisplayCompletedTodos: React.Dispatch<React.SetStateAction<boolean>>
}

export const TodosTemplate = ({
  currentUser,
  todosByStatus,
  statuses,
  displayCompletedTodos,
  setDisplayCompletedTodos,
}: Props) => {
  const { uid } = currentUser
  return (
    <DndProvider backend={HTML5Backend}>
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
              <StatusTag
                status={status}
                backgroundColor={tagColor}
                text={key}
              />
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
    </DndProvider>
  )
}
