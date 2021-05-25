import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  padding: 0 2.35rem 4.125rem 2.35rem;

  @media screen and (max-width: 29.9999em) {
    padding: 0.1rem 0.625rem 3.125rem 0.625rem;
  }
`

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return <StyledContainer>{children}</StyledContainer>
}

export default ContentWrapper
