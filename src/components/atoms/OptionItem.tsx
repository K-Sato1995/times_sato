import React from 'react'
import styled, { css } from 'styled-components'

const StyledOptionItem = styled.div`
  padding: 0.25rem;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.secondaryColor};
  cursor: pointer;

  :hover {
    background-color: #f8f8f8;

    ${(props: { hoverBackgroundColor?: string }) =>
      props.hoverBackgroundColor &&
      css`
        background-color: ${(props: { hoverBackgroundColor?: string }) =>
          props.hoverBackgroundColor
            ? props.hoverBackgroundColor
            : (props) => props.theme.primaryColor};
        color: #fff;
      `}
  }
`

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  hoverBackgroundColor?: string
  [key: string]: any
}

const OptionItem = ({ children, hoverBackgroundColor, ...rest }: Props) => {
  return (
    <StyledOptionItem hoverBackgroundColor={hoverBackgroundColor} {...rest}>
      {children}
    </StyledOptionItem>
  )
}

export default OptionItem
