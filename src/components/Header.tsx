import React from 'react'
import styled from 'styled-components'
import SignOut from 'components/SignOut'
import Button from 'components/atoms/Button'

const NavWrapper = styled.div`
  margin: 0 auto;
  height: 50px;
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
`

const Nav = styled.div`
  margin: 0 auto;
  max-width: 860px;
  height: 50px;
  display: flex;
  justify-content: space-between;
`

const Title = styled.h1`
  font-size: 1.2rem;
  color: 000000;
  padding-left: 20px;

  @media screen and (max-width: 29.9999em) {
    padding-left: 10px;
  }
`

const Header = () => {
  return (
    <NavWrapper>
      <Nav>
        <Title>times_sato</Title>
        <SignOut />
      </Nav>
    </NavWrapper>
  )
}

export default Header
