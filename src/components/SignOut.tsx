import React from 'react'
import { auth } from 'firebaseConfig'
import styled from 'styled-components'
import { Button } from 'components/atoms'

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
const SignOut = () => {
  return (
    auth.currentUser && (
      <SignOutLink buttonType="link" onClick={() => auth.signOut()}>
        Sign Out
      </SignOutLink>
    )
  )
}

export default SignOut
