import React from "react"
import { Query } from "react-apollo"
import { profileViewModelQuery } from "../queries"

const ProfileContainer = () => (
  <Query query={profileViewModelQuery}>

    {({loading, error, data}) => {

      if(loading) return <p>Loading...</p>
      if(error) return <p>Error!</p>

      const username = data.currentUser.userName

      return(
        <p>{username}</p>
      )

    }}

  </Query>
)

export default ProfileContainer