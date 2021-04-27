import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  font-size: 1rem;
  border: solid ${(props) => props.theme.borderColor} 1px;
  outline: none;
  resize: none;
  :focus {
    outline: auto ${(props) => props.theme.primaryColor} 1px;
  }
  :disabled {
    background-color: #eee;
    opacity: 0.5;
    cursor: not-allowed;
  }
`

interface InputProps extends React.HTMLAttributes<HTMLElement> {
  [key: string]: any
}

const Input = (props: InputProps) => {
  return <StyledInput {...props} />
}

export default Input
