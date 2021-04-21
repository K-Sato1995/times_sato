import React from 'react'
import { auth, firebase } from 'firebaseConfig'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const SiteTitle = styled.h1`
  display: block;
  position: absolute;
  left: 5%;
  font-size: 1.2em;
  color: 000000;
`

const SignInButton = styled.button`
  position: absolute;
  top: 40%;
  border: solid #e0e0e0 1px;
  border-radius: 10px;
  cursor: pointer;
  color: #697980;
  background-color: #fff;
  padding: 10px;
  outline: none;

  :hover {
    border: solid #e0e0e0 2px;
  }
`

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <Container>
      <SiteTitle>times_sato</SiteTitle>
      <SignInButton onClick={signInWithGoogle}>
        Sign in with Google
      </SignInButton>
    </Container>
  )
}

export default SignIn
