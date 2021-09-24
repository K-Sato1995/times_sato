import React from 'react'
import { Header, Footer } from 'components/organisms'
import { useAuthState } from 'hooks'
import SignIn from 'pages/SignIn'
import styled from 'styled-components'
import { LoadingSkeleton } from 'components/organisms'
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
    <>
      <Header />

      <MainContainer>
        {loading ? <LoadingSkeleton /> : renderMainComponents()}
      </MainContainer>

      <Footer currentUser={user} />
    </>
  )
}

export default App
