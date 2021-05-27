import React from 'react'
import styled from 'styled-components'
import { firestore } from 'firebaseConfig'
import { useParams } from 'react-router-dom'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import { Heading, ContentWrapper } from 'components/atoms'
import { LoadingState } from 'components/molecules'
import { NewLogForm, LogBox } from 'components/organisms'

const LogsConatiner = styled.div`
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-bottom: 0;
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

  if (logLoading || logItemLoading) return <LoadingState />

  let sum = 0

  logs?.forEach((log) => {
    sum += Number(log.hours)
  })

  console.log(sum)
  return (
    <ContentWrapper>
      <Heading size={'h1'}>{logItem?.name}</Heading>

      <LogsConatiner>
        {logs?.map((log) => (
          <LogBox key={log.id} log={log} />
        ))}

        <NewLogForm itemID={itemID} logItem={logItem} currTotalHours={sum} />
      </LogsConatiner>
    </ContentWrapper>
  )
}

export default LogDetail
