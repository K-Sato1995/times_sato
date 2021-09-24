import React, { useState } from 'react'
import { LoaderWrapper } from 'components/atoms'
import { LoadingState } from 'components/molecules'
import { db } from 'firebaseConfig'
import { collection, query, orderBy } from 'firebase/firestore'
import { useCollectionDataWithRecoil } from 'hooks'
import { User } from 'firebase/auth'
import { IssuesTemplate } from 'components/templates'
import {
  issueStatusState,
  issuesState,
  issuesByStatusState,
} from 'recoil/issues'
import { useRecoilValue } from 'recoil'

interface Props {
  currentUser: User
}

const Issues = ({ currentUser }: Props) => {
  const [displayCompletedIssues, setDisplayCompletedIssues] = useState<boolean>(
    false,
  )
  const { loading: issueLoading } = useCollectionDataWithRecoil<Issue>(
    query(collection(db, 'todos'), orderBy('createdAt', 'asc')),
    issuesState,
  )

  const {
    result: statuses,
    loading: statusLoading,
  } = useCollectionDataWithRecoil<IssueStatus>(
    query(collection(db, 'statuses'), orderBy('order', 'desc')),
    issueStatusState,
  )

  let issuesByStatus = useRecoilValue(issuesByStatusState)

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
