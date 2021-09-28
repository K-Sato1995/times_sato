import React from 'react'
import { ContentWrapper } from 'components/atoms'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

const LogDetailSkeletonContainer = styled.div`
  margin-top: 1rem;
`
const HeatMapSkeletonWrapper = styled.div`
  margin-top: 2rem;
`

const TitleContainer = styled.div`
  margin-top: 2rem;
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
      <TitleContainer>
        <Skeleton height={40} width={300} />
      </TitleContainer>
      <HeatMapSkeletonWrapper>
        <Skeleton height={200} />
      </HeatMapSkeletonWrapper>
      {/* DRY PLZ */}
      {renderLogsSkeleton()}
    </ContentWrapper>
  )
}
