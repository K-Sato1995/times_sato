import React from 'react'
import styled from 'styled-components'
import { Heading, Button } from 'components/atoms'
import { auth } from 'firebaseConfig'

const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 3.125rem;
  background-color: #212329;
  border-bottom: solid ${(props) => props.theme.borderColor} 1px;
`

const Nav = styled.div`
  width: 100%;
  max-width: 860px;
  height: 3.125rem;
`

const NavItems = styled.div`
  padding: 0 2.25rem;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 29.9999em) {
    padding: 0 0.625rem;
  }
`

const Title = styled(Heading)`
  color: #fff;
`

const SignOutLink = styled(Button)`
  font-size: 1rem;
  background-color: #212329;
  color: #fff;
  :hover {
    color: #c7bebe;
  }
`

const Header = () => {
  return (
    <NavWrapper>
      <Nav>
        <NavItems>
          <Title size={'h1'}>times_sato</Title>
          {auth.currentUser && (
            <SignOutLink buttonType="link" onClick={() => auth.signOut()}>
              Sign Out
            </SignOutLink>
          )}
        </NavItems>
      </Nav>
    </NavWrapper>
  )
}

export default Header
