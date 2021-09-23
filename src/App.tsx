import React from 'react'
import { Header, Footer } from 'components/organisms'
import { useAuthState } from 'hooks'
import SignIn from 'pages/SignIn'
import styled from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'
import { LoaderWrapper } from 'components/atoms'
import { LoadingState } from 'components/molecules'
import Routes from 'routes'
import { RecoilRoot } from 'recoil'

const MainContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
  margin-top: 20px;
`

function App() {
  const [user, loading] = useAuthState()

  const renderMainComponents = () => {
    if (!user) return <SignIn />

    return (
      <RecoilRoot>
        <Routes currentUser={user} />
      </RecoilRoot>
    )
  }

  return (
    <Router>
      <Header />

      <MainContainer>
        {loading ? (
          <LoaderWrapper>
            <LoadingState />
          </LoaderWrapper>
        ) : (
          renderMainComponents()
        )}
      </MainContainer>

      <Footer currentUser={user} />
    </Router>
  )
}

export default App
