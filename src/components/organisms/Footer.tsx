import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'components/atoms'

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
`

const TimesLink = styled(Link)`
  position: absolute;
  height: 100%;
  text-decoration: none;
  left: 0;
  padding-top: 1rem;
  text-align: center;
  width: 50%;
  color: ${(props) => props.theme.secondaryColor};
  border-right: solid 1px ${(props) => props.theme.borderColor};
`

const TodosLink = styled(Link)`
  position: absolute;
  text-decoration: none;
  color: ${(props) => props.theme.secondaryColor};
  height: 100%;
  text-align: center;
  padding-top: 1rem;
  right: 0;
  width: 50%;
`

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <TimesLink to={'/'}>times</TimesLink>
        <TodosLink to={'/todos'}>todos</TodosLink>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
