import { useState, useEffect } from 'react'
import { auth } from 'firebaseConfig'
import { onAuthStateChanged, User } from 'firebase/auth'

export const useAuthState = (): [User | null, boolean] => {
  const [state, setState] = useState(() => {
    const user = auth.currentUser

    return {
      initializing: !user,
      user,
    }
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState({ initializing: false, user })
    })

    // unsubscribe to the listener when unmounting
    return () => unsubscribe()
  }, [])

  return [state.user, state.initializing]
}
export default useAuthState
