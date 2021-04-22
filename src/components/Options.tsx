import React from 'react'
import styled from 'styled-components'

const OptionsContainer = styled.div`
  border: solid 1px;
`
const OptionList = styled.ul``
const OptionItem = styled.li``

const Options = () => {
  return (
    <OptionsContainer>
      <OptionList>
        <OptionItem>Delete</OptionItem>
      </OptionList>
    </OptionsContainer>
  )
}

export default Options
