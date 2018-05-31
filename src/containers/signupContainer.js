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
                setLoading({ variables: {loading: true} })
                createUserAsync(username, password, email).then(userModel => {
                  updateViewModel({ variables: {viewModel: userModel} })
                  toProfile()
                  setLoading({ variables: {loading: false} })
                })
              }

              return(
                <Query query={signupViewModelQuery}>
                  {({loading, error, data}) => {

                    let isUsernameUnique = true
                    if(data.viewModel && !data.viewModel.isUsernameUnique){
                      isUsernameUnique = false
                    }

                    return(

                      <SignupForm
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