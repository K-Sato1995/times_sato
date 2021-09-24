import React, { useState } from 'react'
import { LoaderWrapper } from 'components/atoms'
import { LoadingState } from 'components/molecules'
import { db } from 'firebaseConfig'
import { collection, query, orderBy } from 'firebase/firestore'
import useCollectionData from 'hooks/useCollectionData'
import { User } from 'firebase/auth'
import { IssuesTemplate } from 'components/templates'

interface Props {
  currentUser: User
}

const Issues = ({ currentUser }: Props) => {
  const issuesQuery = query(
    collection(db, 'todos'),
    orderBy('createdAt', 'asc'),
  )

  const statusesQuery = query(
    collection(db, 'statuses'),
    orderBy('order', 'desc'),
  )

  const [displayCompletedIssues, setDisplayCompletedIssues] = useState<boolean>(
    false,
  )
  const [issues, issueLoading, issueError] = useCollectionData(issuesQuery)

  const [statuses, statusLoading, statusError] = useCollectionData(
    statusesQuery,
  )

  if (statusError || issueError) {
    statusError && console.log(statusError.message)
    issueError && console.log(issueError.message)
  }

  let issuesByStatus: IssuesByStatus = {}

  statuses?.forEach((status) => {
    let tmp = issues?.filter((issue) => issue.status === status.id)
    issuesByStatus[status.name] = {
      id: status.id,
      color: status.color,
      order: status.order,
      issues: tmp,
    }
  })

  if (issueLoading || statusLoading)
    return (
      <LoaderWrapper>
        <LoadingState />
      </LoaderWrapper>
    )

  return (
    <IssuesTemplate
      currentUser={currentUser}
      issuesByStatus={issuesByStatus}
      statuses={statuses}
      displayCompletedIssues={displayCompletedIssues}
      setDisplayCompletedIssues={setDisplayCompletedIssues}
    />
  )
}

export default Issues
