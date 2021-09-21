import React from 'react'
import styled from 'styled-components'
import { db } from 'firebaseConfig'
import { useParams } from 'react-router-dom'
import { useCollectionData, useDocumentData } from 'hooks'
import { Heading, ContentWrapper, LoaderWrapper } from 'components/atoms'
import { LoadingState } from 'components/molecules'
import { NewLogForm, LogBox } from 'components/organisms'
import { format } from 'date-fns'
import ReactTooltip from 'react-tooltip'
import CalendarHeatmap from 'react-calendar-heatmap'
import { collection, query, where, orderBy, doc } from 'firebase/firestore'
import 'react-calendar-heatmap/dist/styles.css'
import { User } from 'firebase/auth'

const LogsConatiner = styled.div`
  /* margin-top: 1rem; */
  border: solid ${(props) => props.theme.borderColor} 1px;
  border-bottom: 0;
`
interface Props {
  currentUser: User
}

const LogDetail = ({ currentUser }: Props) => {
  const { itemID } = useParams<{ itemID: string }>()
  const { uid } = currentUser
  const logItemQuery = doc(db, `logItems`, itemID)

  const logQuery = query(
    collection(db, 'logs'),
    where('logItemID', '==', itemID),
    orderBy('date', 'desc'),
  )

  const [logs, logLoading, logError] = useCollectionData(logQuery)
  const [logItem, logItemLoading, logItemError] = useDocumentData(logItemQuery)

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
      <NewLogForm
        itemID={itemID}
        logItem={logItem}
        currTotalHours={sum}
        uid={uid}
      />
      <LogsConatiner>
        {logs?.map((log) => (
          <LogBox key={log.id} log={log} />
        ))}
      </LogsConatiner>
    </ContentWrapper>
  )
}

export default LogDetail
