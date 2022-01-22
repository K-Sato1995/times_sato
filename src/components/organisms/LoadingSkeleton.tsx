import React from 'react'
import { useLocation } from 'react-router-dom'
import {
  LogsLoadingSkeleton,
  LogDetailLoadingSkeleton,
} from 'components/organisms'

export const LoadingSkeleton = () => {
  const location = useLocation()
  const currPath = location.pathname

  if (currPath === '/' || currPath === 'logs') {
    return <LogsLoadingSkeleton />
  } else if (/\/logs\//.test(currPath)) {
    return <LogDetailLoadingSkeleton />
  } else {
    return <LogsLoadingSkeleton />
  }
}
