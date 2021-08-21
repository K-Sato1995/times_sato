import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { firebase } from 'firebaseConfig'
import { LoadingState } from 'components/molecules'
import { LoaderWrapper } from 'components/atoms'

const Todos = lazy(() => import('pages/Todos'))
const TodoDetail = lazy(() => import('pages/TodoDetail'))
const Logs = lazy(() => import('pages/Logs'))
const LogDetail = lazy(() => import('pages/LogDetail'))

interface Props {
  currentUser: firebase.User
}

const Routes = ({ currentUser }: Props) => {
  return (
    <Switch>
      <Suspense
        fallback={
          <LoaderWrapper>
            <LoadingState />
          </LoaderWrapper>
        }
      >
        <Route exact path={['/', '/logs']}>
          <Logs currentUser={currentUser} />
        </Route>

        <Route path={'/logs/:itemID(\\w+)'}>
          <LogDetail currentUser={currentUser} />
        </Route>

        <Route exact path={'/issues'}>
          <Todos currentUser={currentUser} />
        </Route>

        <Route path={'/issues/:itemID(\\w+)'}>
          <TodoDetail />
        </Route>
      </Suspense>
    </Switch>
  )
}

export default Routes
