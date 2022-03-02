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
import { add, differenceInCalendarDays, isFuture } from 'date-fns'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

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

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]

  const getTicks = (startDate: any, endDate: any, num: any) => {
    const diffDays = differenceInCalendarDays(endDate, startDate)

    let current = startDate,
      velocity = Math.round(diffDays / (num - 1))

    const ticks = [startDate.getTime()]

    for (let i = 1; i < num - 1; i++) {
      ticks.push(add(current, { days: i * velocity }).getTime())
    }

    ticks.push(endDate.getTime())
    return ticks
  }

  const startDate = new Date(2019, 0, 11)
  const endDate = new Date(2019, 9, 15)

  const ticks = getTicks(startDate, endDate, 5)

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}

export default Analysis
