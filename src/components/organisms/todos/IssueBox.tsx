import React, { useState } from 'react'
import styled, { ThemeProps, css } from 'styled-components'
import { OptionItem } from 'components/atoms'
import { OptionList } from 'components/molecules'
import { db } from 'firebaseConfig'
import { useDrag } from 'react-dnd'
import { DragableItemTypes } from 'consts'
import { format } from 'date-fns'
import { useHistory } from 'react-router-dom'
import { User } from 'firebase/auth'
import { doc, updateDoc, DocumentData } from 'firebase/firestore'

interface DueDesign {
  isOverDue: boolean
  isDueWithinTwodays: boolean
}

const IssueContainer = styled.div`
  position: relative;
  padding: 0.6rem 0;
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
  cursor: pointer;

  :hover {
    background-color: #f8f8f8;
  }

  ${(props: { isDragging: boolean }) =>
    props.isDragging &&
    css`
      display: none;
    `}
`

const StatusIconContianer = styled.div`
  display: inline-block;
  position: relative;
  width: 5%;
  min-width: 30px;
  vertical-align: middle;
`
const IssueDesc = styled.div`
  display: inline-block;
  width: 80%;
  word-wrap: break-word;
  vertical-align: middle;
`

const Due = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 10%;
  text-align: center;
  color: ${(props) => props.theme.secondaryColor};

  ${(props: DueDesign) =>
    props.isOverDue &&
    css`
      color: #ed4241;
    `}

  ${(props: DueDesign) =>
    props.isDueWithinTwodays &&
    css`
      color: #fb916a;
    `}
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
  issue: DocumentData
  currentUser: User
  statusColor?: string
  statuses?: DocumentData[]
}

const IssueBox = ({ issue, currentUser, statusColor, statuses }: Props) => {
  const { text, id, due, status } = issue
  const [displayStatusOptions, setDisplayStatusOptions] = useState<boolean>(
    false,
  )
  const history = useHistory()
  const now = new Date()
  const issueDue = new Date(due?.toDate())
  const completed = process.env.REACT_APP_TODOLAST_STATUS_ID === status
  const isOverDue = !completed && now.getTime() > issueDue.getTime()

  const isDueWithinTwodays =
    !completed &&
    issueDue.getTime() / 1000 - now.getTime() / 1000 >= 0 &&
    issueDue.getTime() / 1000 - now.getTime() / 1000 <= 172800

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragableItemTypes.TODOITEM,
    item: { type: DragableItemTypes.TODOITEM, itemID: issue.id },
    drop: () => {
      console.log('Droped')
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  const { uid } = currentUser
  const issueRef = doc(db, 'todos', id)

  const updateStatus = async (statusID: string) => {
    if (!uid) {
      alert('YOU ARE NOT ALLOWED TO DO THIS')
      return
    }
    await updateDoc(issueRef, {
      status: statusID,
    })
      .then(() => {
        console.log('Document successfully updated!')
      })
      .catch((error) => {
        console.error('Error deleting document: ', error)
      })
  }

  return (
    <IssueContainer
      ref={drag}
      isDragging={isDragging}
      onClick={() => {
        history.push(`/issues/${id}`)
      }}
    >
      {displayStatusOptions && (
        <OptionListWrapper>
          <OptionList setDisplayOptionList={setDisplayStatusOptions}>
            {statuses
              ?.filter((status) => status.id !== issue.status)
              ?.map((status, idx) => (
                <OptionItem
                  hoverBackgroundColor={
                    status.color
                      ? status.color
                      : (props: ThemeProps<any>) => props.theme.primaryColor
                  }
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    updateStatus(status.id)
                  }}
                >
                  {status.name}
                </OptionItem>
              ))}
          </OptionList>
        </OptionListWrapper>
      )}

      <StatusIconContianer>
        <StatusIcon
          color={statusColor}
          onClick={(e) => {
            e.stopPropagation()
            setDisplayStatusOptions(!displayStatusOptions)
          }}
        />
      </StatusIconContianer>
      <IssueDesc>{text}</IssueDesc>
      <Due isDueWithinTwodays={isDueWithinTwodays} isOverDue={isOverDue}>
        {due ? format(new Date(due.toDate()), 'M/dd') : '-'}
      </Due>
    </IssueContainer>
  )
}

export default IssueBox
