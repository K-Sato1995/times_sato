import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { firebase } from 'firebaseConfig'
import Times from 'components/Times'
import Todos from 'components/Todos'

interface Props {
  currentUser: firebase.User
}

const Routes = ({ currentUser }: Props) => {
  return (
    <Switch>
      <Route exact path={['/', '/times']}>
        <Times currentUser={currentUser} />
      </Route>
      <Route path={'/todos'} component={Todos} />
    </Switch>
  )
}

export default Routes
