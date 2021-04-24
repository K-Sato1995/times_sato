import React from 'react'
import { auth } from 'firebaseConfig'
import styled from 'styled-components'

const SignOutLink = styled.button`
  border: none;
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
const SignOut = () => {
  return (
    auth.currentUser && (
      <SignOutLink onClick={() => auth.signOut()}>Sign Out</SignOutLink>
    )
  )
}

export default SignOut
