import React from "react"
import { LoginForm } from "../components"
import { Query } from "react-apollo"
import { loginQuery } from "../queries"
import { loginUser } from "../adapters/userAdapter"
import { withRouter } from "react-router"

const LoginContainer = ({ history }) => {

  return(
    <Query query={loginQuery}>
      {({loading, error, data, client}) => {

        let errorText = ""

        if(data.login){
          errorText = data.login.error
        }

        const login = (username, password) => {
          loginUser(username, password).then(bool => {
            if(bool){
              client.resetStore().then(() =>
                history.push("/dashboard")
              )
            }
          })
        }

        return(
          <LoginForm login={login} error={errorText} />
        )

      }}
    </Query>
  )

}

export default withRouter(LoginContainer)