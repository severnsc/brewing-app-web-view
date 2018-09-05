import React from "react"
import { LoginForm } from "../components"
import { Query, Mutation } from "react-apollo"
import { loginQuery } from "../queries"
import { LOGIN_MUTATION } from "../mutations"
import { loginUser } from "../adapters/userAdapter"
import { withRouter } from "react-router"

const LoginContainer = ({ history }) => {

  return(
    <Query query={loginQuery}>
      {({loading, error, data, client}) => {

        return(
          <Mutation
            mutation={LOGIN_MUTATION}
            update={(cache, {data: { updateLogin } }) => {
              const { login } = cache.readQuery({ query: loginQuery })
              const data = {
                login: {
                  ...login,
                  updateLogin
                }
              }
              cache.writeQuery({query: loginQuery, data})
            }}
          >
            {loginMutation => {

               let errorText = ""

              if(data.login){
                errorText = data.login.error
              }

              const login = (username, password) => {
                loginUser(username, password)
                  .then(bool => {
                    if(bool){
                      client.resetStore().then(() =>
                        history.push("/dashboard")
                      )
                    }else{
                      loginMutation({ variables: {error: "Invalid username or password"} })
                    }
                  })
                  .catch(e => loginMutation({ variables: {error: "There was a problem logging in!"} }))
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

}

export default withRouter(LoginContainer)