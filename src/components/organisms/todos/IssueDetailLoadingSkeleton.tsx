import React from 'react'
import { ContentWrapper } from 'components/atoms'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 1rem;
`

export const IssueDetailLoadingSkeleton = () => {
  return (
    <ContentWrapper>
      <Wrapper>
        <Skeleton height={45} />
      </Wrapper>
      <Wrapper>
        <Skeleton height={45} />
      </Wrapper>
      <Wrapper>
        <Skeleton height={180} />
      </Wrapper>
    </ContentWrapper>
  )
}
