import React from 'react'
import { NavBar } from '../../components'
import { Query, Mutation } from "react-apollo"
import { LOGIN_MUTATION } from '../../mutations'
import { currentUserQuery } from "../../queries"

const Header = () => (
  <Query query={currentUserQuery} fetchPolicy={"network-only"}>
    {({loading, error, data}) => {

      console.log(data)

      let currentUser
      if(data){
        currentUser = data.currentUser
      }

      return(
        <Mutation mutation={LOGIN_MUTATION}>

          {mutation => {

            const signOut = () => {
              mutation({ variables: { bool: false } })
            }

            return(
              currentUser ? <NavBar signOut={signOut} /> : <h1>Brewing App</h1>
            )

          }}

        </Mutation>
      )

    }}
  </Query>
)

export default Header