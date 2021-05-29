import React, { useRef } from 'react'
import styled from 'styled-components'
import { useDetectOutsideClick } from 'hooks'

const OptionListContainer = styled.div`
  margin: 10px 0;
  box-shadow: 0 1px 10px 0 rgb(0 0 0 / 25%);
  background: #fff;
  border-radius: 2.5px;
  z-index: 1000;
  min-width: 150px;
  overflow-y: auto;
`

const OptionItems = styled.div``

interface Props {
  setDisplayOptionList: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

const OptionList = ({ children, setDisplayOptionList }: Props) => {
  const wrapperRef = useRef(null)
  useDetectOutsideClick(wrapperRef, setDisplayOptionList)

  return (
    <OptionListContainer ref={wrapperRef}>
      <OptionItems>{children}</OptionItems>
    </OptionListContainer>
  )
}

export default OptionList
