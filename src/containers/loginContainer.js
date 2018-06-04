import React from "react"
import LoginForm from "../components/loginForm"
import { Mutation, Query } from "react-apollo"
import { LOGIN_MUTATION, UPDATE_VIEW_MODEL } from "../mutations"
import { loginViewModelQuery } from "../queries"
import { loginUserAsync } from "../compose"
import { withRouter } from "react-router"

const LoginContainer = ({ history }) => (
  <Mutation mutation={UPDATE_VIEW_MODEL}>
    {updateViewModel => {

      return(
        <Mutation mutation={LOGIN_MUTATION}>
          {loginMutation => {
  
            const login = (username, password) => {
              loginUserAsync(username, password).then(viewModel => {
                updateViewModel({ variables: {viewModel} })
                if(!viewModel.error){
                  loginMutation({ variables: {bool: true} })
                  history.push("/dashboard")
                }
              })
            }
  
            return(
              <Query query={loginViewModelQuery}>
                {({loading, error, data}) => {

                  let errorText = ""

                  if(data.viewModel){
                    errorText = data.viewModel.error
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

    }}
  </Mutation>
)

export default withRouter(LoginContainer)