import React from "react"
import LoginForm from "../components/loginForm"
import { Mutation, Query } from "react-apollo"
import { LOGIN_MUTATION } from "../mutations"
import { loginQuery } from "../queries"
import { loginUser } from "../adapters/userAdapter"
import { withRouter } from "react-router"

const LoginContainer = ({ history }) => (

  <Mutation mutation={LOGIN_MUTATION}>
    {loginMutation => {

      const login = (username, password) => {
        loginUser(username, password).then(bool => {
          if(bool){
            loginMutation({ variables: { bool } })
            history.push("/dashboard")
          }
        })
      }

      return(
        <Query query={loginQuery}>
          {({loading, error, data}) => {

            let errorText = ""

            if(data.login){
              errorText = data.login.error
            }

            return(
              <LoginForm login={login} error={errorText} />
            )

          }}
        </Query>
      )

    }}
  </Mutation>

)

export default withRouter(LoginContainer)