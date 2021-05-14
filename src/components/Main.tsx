import React from 'react'
import styled from 'styled-components'
import { firebase } from 'firebaseConfig'
import Routes from 'routes'

const MainContainer = styled.div`
  max-width: 860px;
  margin: 0 auto;
  margin-top: 20px;
`
interface Props {
  currentUser: firebase.User
}

const Main = ({ currentUser }: Props) => {
  return (
    <MainContainer>
      <Routes currentUser={currentUser} />
    </MainContainer>
  )
}

export default Main
