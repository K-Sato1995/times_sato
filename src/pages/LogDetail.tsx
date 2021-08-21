import React from 'react'
import styled from 'styled-components'
import { firestore } from 'firebaseConfig'
import { useParams } from 'react-router-dom'
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore'
import { Heading, ContentWrapper, LoaderWrapper } from 'components/atoms'
import { LoadingState } from 'components/molecules'
import { NewLogForm, LogBox } from 'components/organisms'
import { format } from 'date-fns'
import ReactTooltip from 'react-tooltip'
import CalendarHeatmap from 'react-calendar-heatmap'
import { firebase } from 'firebaseConfig'
import 'react-calendar-heatmap/dist/styles.css'

const LogsConatiner = styled.div`
  margin-top: 1rem;
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-bottom: 0;
`
interface Props {
  currentUser: firebase.User
}

const LogDetail = ({ currentUser }: Props) => {
  const { itemID } = useParams<{ itemID: string }>()
  const logsRef = firestore.collection('logs')
  const logItemRef = firestore.doc(`logItems/${itemID}`)
  const { uid } = currentUser

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

  if (logLoading || logItemLoading)
    return (
      <LoaderWrapper>
        <LoadingState />
      </LoaderWrapper>
    )

  let sum = 0

  logs?.forEach((log) => {
    sum += Number(log.hours)
  })

  const formattedLogs: any = logs?.map((log) => {
    const date = format(new Date(log.date.toDate()), 'yyyy-MM-dd')
    return { date: date, count: log.hours }
  })

  const getTooltipDataAttrs = (value: { date: string; count: number }) => {
    // Temporary hack around null value.date issue
    if (!value || !value.date) {
      return null
    }
    // Configuration for react-tooltip
    return {
      'data-tip': `${value.date.slice(0, 10)} | ${value.count} h`,
    }
  }

  return (
    <ContentWrapper>
      <Heading size={'h1'}>{logItem?.name}</Heading>

      <ReactTooltip />
      <CalendarHeatmap
        startDate={new Date('2021-05-01')}
        endDate={new Date('2022-05-01')}
        values={formattedLogs}
        tooltipDataAttrs={getTooltipDataAttrs}
      />

      <LogsConatiner>
        {logs?.map((log) => (
          <LogBox key={log.id} log={log} />
        ))}

        <NewLogForm
          itemID={itemID}
          logItem={logItem}
          currTotalHours={sum}
          uid={uid}
        />
      </LogsConatiner>
    </ContentWrapper>
  )
}

export default LogDetail
