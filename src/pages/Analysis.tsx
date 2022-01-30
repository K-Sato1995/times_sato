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
import { format } from 'date-fns'
// import {
//   BarChart,
//   Bar,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts'

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

  const logByDate: LogsByDate = {}

  // INFO: O(n**3) (^^ ;)
  allLogs.forEach((category) => {
    category.logItems.forEach((logItem: LogItemWithChildLogs) => {
      logItem.logs.forEach((log: Log) => {
        const date = format(new Date(log.date.toDate()), 'yyyy-MM-dd')
        if (logByDate[date]) {
          logByDate[date].totalHours += log.hours
          logByDate[date].logs.push(log)
        } else {
          logByDate[date] = { totalHours: log.hours, logs: [log] }
        }
      })
    })
  })

  console.log(logByDate)

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}

export default Analysis
