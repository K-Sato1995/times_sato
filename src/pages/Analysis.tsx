import React from 'react'
import { db } from 'firebaseConfig'
import { useCollectionDataWithRecoil } from 'hooks'
import {
  logCategoriesState,
  logItemsState,
  allLogsState,
  logsState,
} from 'recoil/logs'
import { useRecoilValue } from 'recoil'
import { collection, query, where } from 'firebase/firestore'
import { User } from 'firebase/auth'

interface Props {
  currentUser: User
}

const Analysis = ({ currentUser }: Props) => {
  const { uid } = currentUser
  useCollectionDataWithRecoil<LogCategory>(
    query(collection(db, 'logCategories'), where('uid', '==', uid)),
    logCategoriesState,
  )

  useCollectionDataWithRecoil<LogItem>(
    query(collection(db, 'logItems'), where('uid', '==', uid)),
    logItemsState,
  )

  const { result: logs, loading: lTest } = useCollectionDataWithRecoil<Log>(
    query(collection(db, 'logs'), where('uid', '==', uid)),
    logsState,
  )

  const allLogs = useRecoilValue(allLogsState)
  console.log(allLogs)

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}

export default Analysis
