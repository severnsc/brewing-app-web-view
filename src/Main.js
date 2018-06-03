import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './screens/home'
import Login from './screens/login'
import ForgotPassword from './screens/forgotPassword'
import ResetPassword from './screens/resetPassword'
import Profile from "./screens/profile"
import Dashboard from './screens/dashboard'

const Main = () => (
  <main style={{display:"flex", flexFlow:"column", alignItems:"center"}}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/forgotPassword" component={ForgotPassword} />
      <Route path="/resetPassword" component={ResetPassword} />
      <Route path="/profile" component={Profile} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </main>
)

export default Main