import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -4rem;
  margin-left: -1.5rem;
`
const LoaderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <StyledContainer>{children}</StyledContainer>
}

export default LoaderWrapper
