import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 3.125rem;
  border-top: solid ${(props) => props.theme.borderColor} 1px;
`

const FooterContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 860px;
  height: 3.125rem;
  font-size: 1.1rem;
  text-align: center;
`

const FooterItem = styled(Link)`
  display: inline-block;
  height: 100%;
  text-decoration: none;
  padding-top: 1rem;
  text-align: center;
  width: 33%;
  color: ${(props) => props.theme.secondaryColor};
  border-right: solid 1px ${(props) => props.theme.borderColor};
`

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterItem to={'/'}>times</FooterItem>
        <FooterItem to={'/todos'}>todos</FooterItem>
        <FooterItem to={'/logs'}>logs</FooterItem>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
