import React from 'react'
import styled from 'styled-components'
import SignOut from 'components/SignOut'

const NavWrapper = styled.div`
  margin: 0 auto;
  height: 50px;
  border-bottom: solid #e0e0e0 1px;
`

const Nav = styled.div`
  margin: 0 auto;
  max-width: 860px;
  height: 50px;
  display: flex;
  justify-content: space-between;

  /* border: solid 1px; */
`

const Title = styled.h1`
  font-size: 1.2em;
  color: 000000;
  padding-left: 20px;
  /* border: solid 1px; */
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
