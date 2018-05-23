import React from "react"
import LoginForm from "../components/loginForm"
import { Mutation } from "react-apollo"
import { LOGIN_MUTATION } from "../mutations"
import { loginUser } from '../auth'

const LoginContainer = () => (
  <Mutation mutation={LOGIN_MUTATION}>
    {mutation => {

      const setIsLoggedIn = bool => {
        mutation({ variables: { bool } })
      }

      return(
        <LoginForm setIsLoggedIn={setIsLoggedIn} loginUser={loginUser} />
      )

    }}
  </Mutation>
)

export default LoginContainer