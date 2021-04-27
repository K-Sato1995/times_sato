import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  /* font-size: 1rem; */
  /* border: none; */
  color: #697980;
  background-color: #fff;
  cursor: pointer;
  padding-right: 20px;

  @media screen and (max-width: 29.9999em) {
    padding-right: 10px;
  }
  :hover {
    color: #111;
  }
`

interface Props {
  type: 'primary' | 'secondary' | 'link'
  children: React.ReactChildren
}

const BaseButton = ({ children }: Props) => {
  return <Button>{children}</Button>
}

export default BaseButton
