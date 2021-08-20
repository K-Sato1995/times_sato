import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { firebase } from 'firebaseConfig'
import Todos from 'pages/Todos'
import Logs from 'pages/Logs'
import LogDetail from 'pages/LogDetail'
import TodoDetail from 'pages/TodoDetail'

interface Props {
  currentUser: firebase.User
}

const Routes = ({ currentUser }: Props) => {
  return (
    <Switch>
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
    </Switch>
  )
}

export default Routes
