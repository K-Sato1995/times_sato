import React from 'react'
import { auth, firebase } from 'firebaseConfig'
import styled from 'styled-components'
import { Button } from 'components/atoms'

const Container = styled.div`
  display: flex;
  justify-content: center;
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
      <SignInButton buttonType="secondary" onClick={signInWithGoogle}>
        Sign in with Google
      </SignInButton>
    </Container>
  )
}

export default SignIn
