import React from 'react'
import styled from 'styled-components'

const OptionList = styled.div`
  list-style: none;
  padding: 0;
`
const OptionItem = styled.div`
  width: 250px;
  padding: 10px;
  border: solid 1px;
`

interface Props {
  visible: boolean
}

const Options = ({ visible }: Props) => {
  if (!visible) return <></>

  return (
    <OptionList>
      <OptionItem>Delete</OptionItem>
      <OptionItem>Delete</OptionItem>
      <OptionItem>Delete</OptionItem>
    </OptionList>
  )
}

export default Options
