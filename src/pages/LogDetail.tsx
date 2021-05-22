import React from 'react'
import styled from 'styled-components'
import { firebase, firestore } from 'firebaseConfig'
import { SyncLoader } from 'react-spinners'
import { useParams } from 'react-router-dom'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { LogBox } from 'components/organisms'

const MainWrapper = styled.div`
  padding: 0 2.35rem 3.125rem 2.35rem;

  @media screen and (max-width: 29.9999em) {
    padding: 0.1rem 0.625rem 3.125rem 0.625rem;
  }
`

const LogsConatiner = styled.div`
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-bottom: 0;
`

const LoaderWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
`

const LogDetail = () => {
  const { itemID } = useParams<{ itemID: string }>()
  const logsRef = firestore.collection('logs')
  const query = logsRef.where('logItemID', '==', itemID)

  const [logs, loading, error] = useCollectionData(query, { idField: 'id' })

  if (error) {
    console.log(error.message)
  }

  if (loading) {
    return (
      <LoaderWrapper>
        <SyncLoader color={'#e0e0e0'} />
      </LoaderWrapper>
    )
  }

  return (
    <MainWrapper>
      <LogsConatiner>
        {logs?.map((log) => (
          <LogBox key={log.id} log={log} />
        ))}
      </LogsConatiner>
    </MainWrapper>
  )
}

export default LogDetail
