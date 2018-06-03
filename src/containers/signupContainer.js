import React from "react"
import { Mutation, Query } from "react-apollo"
import { UPDATE_VIEW_MODEL } from "../mutations"
import { validateUsernameAsync, createUserAsync } from "../compose"
import { signupViewModelQuery } from "../queries"
import { withRouter } from "react-router"
import SignupForm from "../components/signupForm"

const SignupContainer = ({match, location, history}) => (

  <Mutation mutation={UPDATE_VIEW_MODEL}>
    {updateViewModel => {

      const validateUsernameFunc = username => {
        validateUsernameAsync(username).then(signupModel => {
          updateViewModel({ variables: {viewModel: signupModel} })
        })
      }

      const createUserFunc = (username, password, email) => {
        createUserAsync(username, password, email).then(model => {
          updateViewModel({ variables: {viewModel: model} })
          if(model.error === "") history.push("/profile")
        })
      }

      return(
        <Query query={signupViewModelQuery}>
          {({loading, error, data}) => {

            let isUsernameUnique = true
            let errorMessage = ""
            
            if(data.viewModel){
              if(!data.viewModel.isUsernameUnique) 
                isUsernameUnique = false
              errorMessage = data.viewModel.error
            }

            return(

              <SignupForm
                error={errorMessage}
                validateUsername={validateUsernameFunc}
                isUsernameUnique={isUsernameUnique}
                createUser={createUserFunc}
              />

            )

          }}
        </Query>
      )

    }}
  </Mutation>

)

export default withRouter(SignupContainer)