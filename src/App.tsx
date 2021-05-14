import React from 'react'
import { Header, Footer } from 'components/organisms'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from 'firebaseConfig'
import SignIn from 'pages/SignIn'
import { SyncLoader } from 'react-spinners'
import styled from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from 'routes'

const MainContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
  margin-top: 20px;
`

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
    <Router>
      <Header />

      <MainContainer>
        <Routes currentUser={user} />
      </MainContainer>

      <Footer />
    </Router>
  )
}

export default App
