import React from 'react'
import styled from 'styled-components'
import { SyncLoader } from 'react-spinners'

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -4rem;
  margin-left: -1.5rem;
`

const LoadingState = () => {
  return (
    <LoaderWrapper>
      <SyncLoader color={'#e0e0e0'} />
    </LoaderWrapper>
  )
}

export default LoadingState
