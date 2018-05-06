import React from 'react'
import LoginForm from '../components/loginForm'
import { loginUser } from '../auth'

const Login = () => (
  <div>
    <h1>Brewing App</h1>
    <LoginForm loginUser={loginUser} navigate={() => {}} />
  </div>
)

export default Login