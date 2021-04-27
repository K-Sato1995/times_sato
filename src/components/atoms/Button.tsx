import React from 'react'
import styled, { css } from 'styled-components'

type ButtonType = 'primary' | 'secondary' | 'link'

const ButtonBase = styled.button`
  cursor: pointer;
  border: none;
  outline: none;

  ${(props: ButtonProps) =>
    props.buttonType === 'primary' &&
    css`
      background-color: ${(props) => props.theme.primaryColor};
      color: #fff;
    `}

  ${(props: ButtonProps) =>
    props.buttonType === 'link' &&
    css`
      background-color: #fff;
      color: #697980;

      :hover {
        color: #111;
      }
    `}
  
    ${(props: ButtonProps) =>
    props.buttonType === 'secondary' &&
    css`
      border: solid ${(props) => props.theme.borderColor} 1px;
      color: #697980;
      background-color: #fff;

      :hover {
        border: solid ${(props) => props.theme.borderColor} 2px;
      }
    `}
  
   :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  buttonType?: ButtonType
  children: React.ReactNode
  [key: string]: any
}

const Button = (props: ButtonProps) => {
  const { children } = props

  return <ButtonBase {...props}>{children}</ButtonBase>
}

export default Button
