import React from 'react'
import Main from 'components/Main'
import Header from 'components/Header'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from 'firebaseConfig'
import SignIn from 'components/SignIn'

function App() {
  const [user] = useAuthState(auth)

  if (!user) return <SignIn />

  return (
    <>
      <Header />
      <Main currentUser={user} />
    </>
  )
}

export default App
