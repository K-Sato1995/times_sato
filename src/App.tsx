import React from 'react'
import { Header, Footer } from 'components/organisms'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from 'firebaseConfig'
import SignIn from 'pages/SignIn'
import styled from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import { LoadingState } from 'components/molecules'
import Routes from 'routes'

const MainContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
  margin-top: 20px;
`

function App() {
  const [user, loading] = useAuthState(auth)

  if (loading) return <LoadingState />

  if (!user) return <SignIn />

  return (
    <Router>
      <Header />
      <MainContainer>
        <Routes currentUser={user} />
      </MainContainer>
    </Router>
  )
}

export default App
