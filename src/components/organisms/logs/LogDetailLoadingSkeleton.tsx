import React from 'react'
import { ContentWrapper } from 'components/atoms'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

const LogDetailSkeletonContainer = styled.div`
  margin-top: 1rem;
`
const HeatMapSkeletonWrapper = styled.div`
  margin-top: 1rem;
`

const renderLogsSkeleton = () => {
  return (
    <LogDetailSkeletonContainer>
      <Skeleton height={35} />
      <Skeleton count={15} height={70} />
    </LogDetailSkeletonContainer>
  )
}
export const LogDetailLoadingSkeleton = () => {
  return (
    <ContentWrapper>
      <Skeleton height={25} width={300} />
      <HeatMapSkeletonWrapper>
        <Skeleton height={120} />
      </HeatMapSkeletonWrapper>
      {/* DRY PLZ */}
      {renderLogsSkeleton()}
    </ContentWrapper>
  )
}
