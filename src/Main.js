import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './screens/home'
import Login from './screens/login'
import ForgotPassword from './screens/forgotPassword'
import ResetPassword from './screens/resetPassword'

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/forgotPassword" component={ForgotPassword} />
      <Route path="/resetPassword" component={ResetPassword} />
    </Switch>
  </main>
)

export default Main