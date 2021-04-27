import React from 'react'
import { auth, firebase } from 'firebaseConfig'
import styled from 'styled-components'
import { Button } from 'components/atoms'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const SiteTitle = styled.h1`
  display: block;
  position: absolute;
  left: 5%;
  font-size: 1.2rem;
  color: 000000;
`

const SignInButton = styled(Button)`
  position: absolute;
  top: 40%;
  border-radius: 10px;
  padding: 10px;
`

const SignIn = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <Container>
      <SiteTitle>times_sato</SiteTitle>
      <SignInButton buttonType="secondary" onClick={signInWithGoogle}>
        Sign in with Google
      </SignInButton>
    </Container>
  )
}

export default SignIn
