import React from 'react'
import styled from 'styled-components'

const OptionsContainer = styled.form`
  position: absolute;
  top: 20%;
  right: 0;
  background: #fff;
  z-index: 1000;
  width: 150px;
  text-align: center;
  border-radius: 2.5px;
  box-shadow: 0 1px 10px 0 rgb(0 0 0 / 25%);
`

const OptionsList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`

const OptionItem = styled.li`
  display: inline-block;
  padding: 0.7rem 0;
  width: 100%;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.secondaryColor};
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.primaryColor};
  }
`

interface Props {
  handleDelete: any
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export const LogItemOptions = ({ handleDelete, setIsEditing }: Props) => {
  return (
    <OptionsContainer>
      <OptionsList>
        <OptionItem
          onClick={() => {
            setIsEditing(true)
          }}
        >
          Rename
        </OptionItem>
        <OptionItem onClick={handleDelete}>Delete</OptionItem>
      </OptionsList>
    </OptionsContainer>
  )
}
