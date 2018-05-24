import React from "react"
import LoginForm from "../components/loginForm"
import { Mutation } from "react-apollo"
import { LOGIN_MUTATION } from "../mutations"
import { loginUser } from '../auth'

const LoginContainer = () => (
  <Mutation mutation={LOGIN_MUTATION}>
    {mutation => {

      const logIn = () => {
        mutation({ variables: { bool: true } })
      }

      return(
        <LoginForm logIn={logIn} loginUser={loginUser} />
      )

    }}
  </Mutation>
)

export default LoginContainer