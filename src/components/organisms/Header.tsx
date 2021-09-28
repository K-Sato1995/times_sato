import React from 'react'
import styled from 'styled-components'
import { Heading, Button } from 'components/atoms'
import { auth } from 'firebaseConfig'
import { useHistory } from 'react-router-dom'

const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 3.125rem;
  background-color: #212329;
  box-shadow: 0 1px 10px 0 rgb(0 0 0 / 10%);
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
  cursor: pointer;
`

// const SignOutLink = styled(Button)`
//   font-size: 1rem;
//   background-color: #212329;
//   color: #fff;
//   :hover {
//     color: #c7bebe;
//   }
// `

const Header = () => {
  const history = useHistory()

  return (
    <NavWrapper>
      <Nav>
        <NavItems>
          <Title
            size={'h1'}
            onClick={() => {
              history.push('/')
            }}
          >
            Study Log
          </Title>
          {/* <SignOutLink buttonType="link" onClick={() => auth.signOut()}>
            Sign Out
          </SignOutLink> */}
        </NavItems>
      </Nav>
    </NavWrapper>
  )
}

export default React.memo(Header)
