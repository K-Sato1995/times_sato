import React from 'react'
import styled from 'styled-components'
import { Heading, Button } from 'components/atoms'
import { auth } from 'firebaseConfig'

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

const Title = styled(Heading).attrs(() => ({
  size: 'h1',
}))`
  padding-left: 20px;

  @media screen and (max-width: 29.9999em) {
    padding-left: 10px;
  }
`

const SignOutLink = styled(Button)`
  font-size: 1rem;
  padding-right: 20px;

  @media screen and (max-width: 29.9999em) {
    padding-right: 10px;
  }
  :hover {
    color: #111;
  }
`

const Header = () => {
  return (
    <NavWrapper>
      <Nav>
        <Title>times_sato</Title>
        {auth.currentUser && (
          <SignOutLink buttonType="link" onClick={() => auth.signOut()}>
            Sign Out
          </SignOutLink>
        )}
      </Nav>
    </NavWrapper>
  )
}

export default Header
