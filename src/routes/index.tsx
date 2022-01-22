import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { User } from 'firebase/auth'

import { LoadingSkeleton } from 'components/organisms'

const Todos = lazy(() => import('pages/Todos'))
const TodoDetail = lazy(() => import('pages/TodoDetail'))
const Logs = lazy(() => import('pages/Logs'))
const LogDetail = lazy(() => import('pages/LogDetail'))

const Analysis = lazy(() => import('pages/Analysis'))

interface Props {
  currentUser: User
}

const Routes = ({ currentUser }: Props) => {
  return (
    <Switch>
      <Suspense fallback={<LoadingSkeleton />}>
        <Route exact path={['/', '/logs']}>
          <Logs currentUser={currentUser} />
        </Route>

        <Route path={'/logs/:itemID(\\w+)'}>
          <LogDetail currentUser={currentUser} />
        </Route>

        <Route path={'/analysis'}>
          <Analysis />
        </Route>
      </Suspense>
    </Switch>
  )
}

export default Routes
