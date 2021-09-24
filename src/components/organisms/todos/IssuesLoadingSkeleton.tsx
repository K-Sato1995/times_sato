import React from 'react'
import { ContentWrapper } from 'components/atoms'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

const IssueSkeletonContainer = styled.div`
  margin-top: 3rem;

  :first-child {
    margin-top: 0;
  }
`

const renderIssueSkeleton = () => {
  return (
    <IssueSkeletonContainer>
      <Skeleton height={25} width={150} />
      <Skeleton count={7} height={30} />
    </IssueSkeletonContainer>
  )
}

export const IssuesLoadingSkeleton = () => {
  return (
    <ContentWrapper>
      {/* DRY PLZ */}
      {renderIssueSkeleton()}
      {renderIssueSkeleton()}
      {renderIssueSkeleton()}
      {renderIssueSkeleton()}
    </ContentWrapper>
  )
}
