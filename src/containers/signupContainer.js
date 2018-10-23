import React from "react"
import { Mutation, Query } from "react-apollo"
import {
  UPDATE_SIGNUP_ERROR,
  UPDATE_SIGNUP_USERNAME_ERROR,
  CREATE_INVENTORY
} from "../mutations"
import { validateUsername, createUser } from "../adapters/userAdapter"
import { signupQuery, currentUserQuery } from "../queries"
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

            return(
              <Mutation mutation={CREATE_INVENTORY}>
                {createInventory => {

                  return(
                    <Query query={signupQuery}>
                      {({loading, error, data, client}) => {

                        let isUsernameUnique = true
                        let errorMessage = ""
                        
                        if(data.signup){
                          if(!data.signup.isUsernameUnique) 
                            isUsernameUnique = false
                          errorMessage = data.signup.error
                        }

                        const createUserFunc = (username, password, email) => {
                          createUser(username, password, email).then(bool => {
                            const error = bool ? "" : "There was an error creating your account!"
                            updateSignupError({ variables: {error} })
                            if(bool) client.resetStore().then(() => {
                              client.query({query: currentUserQuery}).then(async ({ data }) => {
                                console.log(data)
                                const { id } = data.currentUser
                                await createInventory({ variables: {name: "Hops", userId: id} })
                                await createInventory({ variables: {name: "Malt", userId: id} })
                                await createInventory({ variables: {name: "Yeast", userId: id} })
                                await createInventory({ variables: {name: "Other", userId: id} })
                                history.push("/createSettings")
                              })
                            })
                          })
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

    }}
  </Mutation>

)

export default withRouter(SignupContainer)