import React from 'react'
import styled from 'styled-components'
import { ContentWrapper } from 'components/atoms'
import {
  NewIssueForm,
  IssueBox,
  NewStatusForm,
  StatusTag,
  StatusContainer,
} from 'components/organisms'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import { User } from 'firebase/auth'
import { DocumentData } from 'firebase/firestore'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const IssuesConatiner = styled.div`
  box-shadow: ${(props) => props.theme.boxShadow};
  background-color: #fff;
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
  issuesByStatus: IssuesByStatus
  statuses: DocumentData[]
  displayCompletedIssues: boolean
  setDisplayCompletedIssues: React.Dispatch<React.SetStateAction<boolean>>
}

export const IssuesTemplate = ({
  currentUser,
  issuesByStatus,
  statuses,
  displayCompletedIssues,
  setDisplayCompletedIssues,
}: Props) => {
  const { uid } = currentUser
  return (
    <DndProvider backend={HTML5Backend}>
      <ContentWrapper>
        {Object.keys(issuesByStatus).map((key: string, idx: number) => {
          const issues = issuesByStatus[key].issues
          const tagColor = issuesByStatus[key].color
          const currOrder = issuesByStatus[key].order
          const statusID = issuesByStatus[key].id
          const status = { id: statusID, name: key, color: tagColor }

          if (
            !displayCompletedIssues &&
            statusID === process.env.REACT_APP_TODOLAST_STATUS_ID
          )
            return (
              <StatusContainer key={idx} statusID={statusID}>
                <UndisplayedStatusTag
                  status={status}
                  backgroundColor={tagColor}
                  text={`${key}  ${issues.length}Issues`}
                />
                <RightArrowIcon
                  iconColor={tagColor}
                  onClick={() => {
                    setDisplayCompletedIssues(true)
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
                    setDisplayCompletedIssues(false)
                  }}
                />
              )}
              <IssuesConatiner key={idx}>
                {issues?.map((issue: any) => (
                  <IssueBox
                    key={issue.id}
                    issue={issue}
                    statusColor={tagColor}
                    statuses={statuses}
                    currentUser={currentUser}
                  />
                ))}

                <NewIssueForm uid={uid} statusID={statusID} />
              </IssuesConatiner>

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
