import React from 'react'
import styled, { css } from 'styled-components'

type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4'

const StyledHeading = styled.h1`
  color: 000000;

  ${(props: HeadingProps) =>
    props.size === 'h1' &&
    css`
      font-size: 1.2rem;
    `}

  ${(props: HeadingProps) =>
    props.size === 'h2' &&
    css`
      font-size: 1rem;
    `}

  ${(props: HeadingProps) =>
    props.size === 'h3' &&
    css`
      font-size: 0.8rem;
    `}

  ${(props: HeadingProps) =>
    props.size === 'h4' &&
    css`
      font-size: 0.6rem;
    `}
`

interface HeadingProps extends React.HTMLAttributes<HTMLElement> {
  size?: HeadingSize
  children: React.ReactNode
  [key: string]: any
}

const Heading = (props: HeadingProps) => {
  const { children } = props

  return <StyledHeading {...props}>{children}</StyledHeading>
}

export default Heading
