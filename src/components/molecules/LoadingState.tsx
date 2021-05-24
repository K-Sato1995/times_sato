import React from 'react'
import styled from 'styled-components'
import { SyncLoader } from 'react-spinners'

const LoaderWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
`

const LoadingState = () => {
  return (
    <LoaderWrapper>
      <SyncLoader color={'#e0e0e0'} />
    </LoaderWrapper>
  )
}

export default LoadingState
