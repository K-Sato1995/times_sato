import React from 'react'
import { firestore, firebase } from 'firebaseConfig'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'

interface Props {
  currentUser: firebase.User
}

const LogsContainer = styled.div`
  padding: 0.1rem 2.35rem 3.125rem 2.35rem;

  @media screen and (max-width: 29.9999em) {
    padding: 0.1rem 0.625rem 3.125rem 0.625rem;
  }
`

const Logs = ({ currentUser }: Props) => {
  const logCategoriesRef = firestore.collection('logCategories')

  const query = logCategoriesRef

  const [logCategories, loading, error] = useCollectionData(query, {
    idField: 'id',
  })

  if (error) {
    console.log(error?.message)
  }

  if (loading) {
    return <>Loading</>
  }
  console.log(logCategories)

  // logCategories?.forEach((c) => {
  //   console.log(c.items.docs)
  // })

  return <LogsContainer>Logs</LogsContainer>
}

export default Logs
