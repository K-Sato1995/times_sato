import React from 'react'
import styled from 'styled-components'
import { Heading } from 'components/atoms'

const NoItemWrapper = styled.div`
  padding: 2.5rem 0.315rem;
  display: flex;
  justify-content: center;
  margin: 1.625rem;
`
const NoItem = () => {
  return (
    <NoItemWrapper>
      <Heading size="h2">Nothing was posted yet....</Heading>
    </NoItemWrapper>
  )
}

export default NoItem
