import React from 'react'
import Main from 'components/Main'
import { Header, Footer } from 'components/organisms'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from 'firebaseConfig'
import SignIn from 'components/SignIn'
import { SyncLoader } from 'react-spinners'
import styled from 'styled-components'

const LoaderWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
`

function App() {
  const [user, loading] = useAuthState(auth)

  if (loading)
    return (
      <LoaderWrapper>
        <SyncLoader color={'#e0e0e0'} />
      </LoaderWrapper>
    )

  if (!user) return <SignIn />

  return (
    <>
      <Header />
      <Main currentUser={user} />
      <Footer />
    </>
  )
}

export default App
