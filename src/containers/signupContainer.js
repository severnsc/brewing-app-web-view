import React from "react"
import { Mutation, Query } from "react-apollo"
import {
  UPDATE_SIGNUP_ERROR,
  UPDATE_SIGNUP_USERNAME_ERROR
} from "../mutations"
import { validateUsername, createUser } from "../adapters/userAdapter"
import { signupQuery } from "../queries"
import { withRouter } from "react-router"
import { SignupForm } from "../components"

const SignupContainer = ({match, location, history}) => (

  <Mutation mutation={UPDATE_SIGNUP_USERNAME_ERROR}>
    {updateSignupIsUsernameUnique => {

      const validateUsernameFunc = username => {
        validateUsername(username).then(bool => {
          updateSignupIsUsernameUnique({ variables: { bool } })
        })
      }

      return(
        <Mutation mutation={UPDATE_SIGNUP_ERROR}>
          {updateSignupError => {

            const createUserFunc = (username, password, email) => {
              createUser(username, password, email).then(bool => {
                const error = bool ? "" : "There was an error creating your account!"
                updateSignupError({ variables: {error} })
                if(bool) history.push("/profile")
              })
            }

            return(
              <Query query={signupQuery}>
                {({loading, error, data}) => {

                  let isUsernameUnique = true
                  let errorMessage = ""
                  
                  if(data.signup){
                    if(!data.signup.isUsernameUnique) 
                      isUsernameUnique = false
                    errorMessage = data.signup.error
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

export default withRouter(SignupContainer)