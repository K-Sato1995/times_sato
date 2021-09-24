import React from 'react'
import { db } from 'firebaseConfig'
import { useParams } from 'react-router-dom'
import { useCollectionDataWithRecoil, useDocumentDataWithRecoil } from 'hooks'

import { logsState, logItemState } from 'recoil/logs'
import { format } from 'date-fns'
import { collection, query, where, orderBy, doc } from 'firebase/firestore'
import 'react-calendar-heatmap/dist/styles.css'
import { User } from 'firebase/auth'
import { LogDetailTemplate } from 'components/templates'
import { LogDetailLoadingSkeleton } from 'components/organisms'

interface Props {
  currentUser: User
}

const LogDetail = ({ currentUser }: Props) => {
  const { itemID } = useParams<{ itemID: string }>()

  const { result: logs, loading: logLoading } = useCollectionDataWithRecoil(
    query(
      collection(db, 'logs'),
      where('logItemID', '==', itemID),
      orderBy('date', 'desc'),
    ),
    logsState,
  )
  const {
    result: logItem,
    loading: logItemLoading,
  } = useDocumentDataWithRecoil(doc(db, `logItems`, itemID), logItemState)

  if (logLoading || logItemLoading) return <LogDetailLoadingSkeleton />

  const currTotalHours = logs.reduce((acc, obj) => acc + obj.hours, 0)

  const formattedLogs: FormattedLog[] = logs.map((log) => {
    const date = format(new Date(log.date.toDate()), 'yyyy-MM-dd')
    return { date: date, count: log.hours }
  })

  return (
    <LogDetailTemplate
      currentUser={currentUser}
      itemID={itemID}
      logItem={logItem}
      logs={logs}
      formattedLogs={formattedLogs}
      currTotalHours={currTotalHours}
    />
  )
}

export default LogDetail
