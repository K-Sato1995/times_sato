import React from 'react'
import { auth, firebase } from 'firebaseConfig'
import styled from 'styled-components'
import { Button, Heading } from 'components/atoms'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Title = styled(Heading).attrs(() => ({
  size: 'h1',
}))`
  display: block;
  position: absolute;
  left: 5%;
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
      <Title>Study Log</Title>
      <SignInButton buttonType="secondary" onClick={signInWithGoogle}>
        Sign in with Google
      </SignInButton>
    </Container>
  )
}

export default SignIn
