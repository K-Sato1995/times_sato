import React, { useRef } from 'react'
import styled from 'styled-components'
import { useDetectOutsideClick } from 'hooks'
import { FaTimes } from 'react-icons/fa'

const OptionListContainer = styled.div`
  margin: 10px 0;
  box-shadow: 0 1px 10px 0 rgb(0 0 0 / 25%);
  background: #fff;
  border-radius: 2.5px;
  z-index: 1000;
  min-width: 150px;
  overflow-y: auto;
`

const OptionListTop = styled.div`
  position: relative;
  background-color: #fafbfc;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  height: 1.5rem;
`

const OptionItems = styled.div``

const CloseIcon = styled(FaTimes)`
  position: absolute;
  right: 5%;
  top: 50%;
  margin-top: -0.5rem;
  font-size: 1rem;
  cursor: pointer;
  color: ${(props) => props.theme.secondaryColor};
`

interface Props {
  setDisplayOptionList: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

const OptionList = ({ children, setDisplayOptionList }: Props) => {
  const wrapperRef = useRef(null)
  useDetectOutsideClick(wrapperRef, setDisplayOptionList)

  return (
    <OptionListContainer ref={wrapperRef}>
      <OptionListTop>
        <CloseIcon
          onClick={() => {
            setDisplayOptionList(false)
          }}
        />
      </OptionListTop>
      <OptionItems>{children}</OptionItems>
    </OptionListContainer>
  )
}

export default OptionList
