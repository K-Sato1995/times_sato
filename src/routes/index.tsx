import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { firebase } from 'firebaseConfig'
import Logs from 'pages/Logs'
import LogDetail from 'pages/LogDetail'

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
    </Switch>
  )
}

export default Routes
