import React from 'react'
import LoginForm from '../components/loginForm'
import { loginUser } from '../auth'

const Login = () => <LoginForm loginUser={loginUser} navigate={() => {}} />

export default Login