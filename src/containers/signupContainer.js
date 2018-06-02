import React from "react"
import { Mutation, Query } from "react-apollo"
import { UPDATE_VIEW_MODEL, SET_LOADING } from "../mutations"
import { validateUsernameAsync, createUserAsync } from "../compose"
import { signupViewModelQuery } from "../queries"
import { toProfile } from "../navigation"
import SignupForm from "../components/signupForm"

const SignupContainer = () => (

  <Mutation mutation={UPDATE_VIEW_MODEL}>
    {updateViewModel => {

      const validateUsernameFunc = username => {
        validateUsernameAsync(username).then(signupModel => {
          updateViewModel({ variables: {viewModel: signupModel} })
        })
      }

      return(
        <Mutation mutation={SET_LOADING}>
          {setLoading => {

             const createUserFunc = (username, password, email) => {
                setLoading({ variables: {bool: true} })
                createUserAsync(username, password, email).then(model => {
                  updateViewModel({ variables: {viewModel: model} })
                  if(model.username) toProfile()
                  setLoading({ variables: {bool: false} })
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

    }}
  </Mutation>

)

export default SignupContainer