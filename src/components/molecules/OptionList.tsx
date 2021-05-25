import React from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'

const OptionListContainer = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 0.3rem;
  margin: 10px 0;
  box-shadow: 0 1px 10px 0 rgb(0 0 0 / 25%);
  background: #fff;
  border-radius: 2.5px;
  z-index: 1000;
  min-width: 150px;
  overflow-y: auto;
`

const OptionListTop = styled.div`
  background-color: #fafbfc;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  height: 1.5rem;
`

const OptionItems = styled.div``

const CloseIcon = styled(FaTimes)`
  position: absolute;
  right: 5%;
  top: 4%;
  font-size: 1rem;
  cursor: pointer;
  color: ${(props) => props.theme.secondaryColor};
`

interface Props {
  setDisplayOptionList: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

const OptionList = ({ children, setDisplayOptionList }: Props) => {
  return (
    <OptionListContainer>
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
