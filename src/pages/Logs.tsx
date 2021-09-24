import React from 'react'
import { db } from 'firebaseConfig'
import { LogsLoadingSkeleton } from 'components/organisms'
import { useCollectionDataWithRecoil } from 'hooks'
import {
  logCategoriesState,
  logItemsState,
  logItemsByCategoryState,
} from 'recoil/logs'
import { useRecoilValue } from 'recoil'
import { collection, query, where } from 'firebase/firestore'
import { User } from 'firebase/auth'
import randomColor from 'randomcolor'
import { LogsTemplate } from 'components/templates'

interface Props {
  currentUser: User
}

const Logs = ({ currentUser }: Props) => {
  const { uid } = currentUser
  const {
    loading: categoriesLoading,
  } = useCollectionDataWithRecoil<LogCategory>(
    query(collection(db, 'logCategories'), where('uid', '==', uid)),
    logCategoriesState,
  )

  const {
    result: logItems,
    loading: logItemsLoading,
  } = useCollectionDataWithRecoil<LogItem>(
    query(collection(db, 'logItems'), where('uid', '==', uid)),
    logItemsState,
  )

  const logItemsByCateogory = useRecoilValue(logItemsByCategoryState)
  const sumOfTotalHours = logItems.reduce((acc, obj) => acc + obj.totalHours, 0)

  const formattedDataForChart = logItems
    ?.filter((item) => item.totalHours)
    .map((item) => {
      return {
        title: item.name,
        value: item.totalHours,
        percentage: Math.round((item.totalHours / sumOfTotalHours) * 100),
        color: randomColor({ luminosity: 'light' }),
      }
    })

  if (categoriesLoading || logItemsLoading) return <LogsLoadingSkeleton />

  return (
    <LogsTemplate
      currentUser={currentUser}
      formattedDataForChart={formattedDataForChart}
      logItemsByCateogory={logItemsByCateogory}
      sumOfTotalHours={sumOfTotalHours}
    />
  )
}

export default Logs
