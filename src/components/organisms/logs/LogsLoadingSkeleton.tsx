import React from 'react'
import { ContentWrapper } from 'components/atoms'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

const LogsSkeletonContainer = styled.div`
  margin-top: 1rem;
`

const renderLogsSkeleton = () => {
  return (
    <LogsSkeletonContainer>
      <Skeleton height={25} width={150} />
      <Skeleton count={7} height={30} />
    </LogsSkeletonContainer>
  )
}
export const LogsLoadingSkeleton = () => {
  return (
    <ContentWrapper>
      <Skeleton height={400} />
      {/* DRY PLZ */}
      {renderLogsSkeleton()}
      {renderLogsSkeleton()}
      {renderLogsSkeleton()}
    </ContentWrapper>
  )
}
