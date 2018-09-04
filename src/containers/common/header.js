import React from 'react'
import { NavBar } from '../../components'
import { Query } from "react-apollo"
import { currentUserQuery } from "../../queries"
import { logoutUser } from "../../adapters/userAdapter"

const Header = () => (
  <Query query={currentUserQuery} fetchPolicy={"network-only"}>
    {({loading, error, data}) => {

      let currentUser
      if(data){
        currentUser = data.currentUser
      }

      const signOut = () => {
        logoutUser()
      }

      return(
        currentUser ? <NavBar signOut={signOut} /> : <h1>Brewing App</h1>
      )

    }}
  </Query>
)

export default Header