import React from "react"
import { LoginForm } from "../components"
import { Mutation, Query } from "react-apollo"
import { LOGIN_MUTATION } from "../mutations"
import { loginQuery, currentUserQuery } from "../queries"
import { withRouter } from "react-router"

const LoginContainer = ({ history }) => (

  <Query query={loginQuery}>
    {({loading, error, data}) => {

      let errorText = ""

      if(data.login){
        errorText = data.login.error
      }

      return(
        <Mutation
          mutation={LOGIN_MUTATION}
          optimisticResponse={{
            authenticateUser: {
              __typename: "CurrentUser",
              id: "1"
            }
          }}
          update={(cache, { data: { authenticateUser } }) => {
            if(authenticateUser){
              const { currentUser } = cache.readQuery({ query: currentUserQuery })
              const data = {
                currentUser: {
                  ...currentUser,
                  id: authenticateUser.id
                }
              }
              cache.writeQuery({ query: currentUserQuery, data })
              history.push("/dashboard")
            }else{
              const { login } = cache.readQuery({ query: loginQuery })
              data = {
                login: {
                  ...login,
                  error: "Invalid username or password!"
                }
              }
              cache.writeQuery({ query: loginQuery, data })
            }
          }}
        >
          {loginMutation => {

            const login = (username, password) => {
              loginMutation({ variables: {username, password} })
            }

            return(
              <LoginForm login={login} error={errorText} />
            )

          }}
        </Mutation>
      )

    }}
  </Query>

)

export default withRouter(LoginContainer)