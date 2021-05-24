import React from 'react'
import styled from 'styled-components'
import { firestore } from 'firebaseConfig'
import { SyncLoader } from 'react-spinners'
import { useParams } from 'react-router-dom'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import { Heading } from 'components/atoms'
import { LogBox } from 'components/organisms'
import { NewLogForm } from 'components/organisms'

const MainWrapper = styled.div`
  padding: 0 2.35rem 4.125rem 2.35rem;

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
  const logItemRef = firestore.doc(`logItems/${itemID}`)

  const logQuery = logsRef
    .where('logItemID', '==', itemID)
    .orderBy('date', 'desc')

  const [logs, logLoading, logError] = useCollectionData(logQuery, {
    idField: 'id',
  })

  const [logItem, logItemLoading, logItemError] = useDocumentData(logItemRef, {
    idField: 'id',
  })

  if (logError || logItemError) {
    logError && console.log(logError.message)
    logItemError && console.log(logItemError.message)
  }

  if (logLoading || logItemLoading) {
    return (
      <LoaderWrapper>
        <SyncLoader color={'#e0e0e0'} />
      </LoaderWrapper>
    )
  }

  return (
    <MainWrapper>
      <Heading size={'h1'}>{logItem?.name}</Heading>

      <LogsConatiner>
        {logs?.map((log) => (
          <LogBox key={log.id} log={log} />
        ))}

        <NewLogForm itemID={itemID} logItem={logItem} />
      </LogsConatiner>
    </MainWrapper>
  )
}

export default LogDetail
