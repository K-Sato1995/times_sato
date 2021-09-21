import React from 'react'
import { auth } from 'firebaseConfig'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
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
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
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
