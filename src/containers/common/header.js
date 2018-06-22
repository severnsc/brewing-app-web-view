import React from 'react'
import PropTypes from 'prop-types'
import NavBar from '../../components/navBar'
import { Mutation } from "react-apollo"
import { LOGIN_MUTATION } from '../../mutations'

const Header = ({ isLoggedIn }) => (
  <Mutation mutation={LOGIN_MUTATION}>

    {mutation => {

      const signOut = () => {
        mutation({ variables: { bool: false } })
      }

      return(
        isLoggedIn ? <NavBar signOut={signOut} /> : <h1>Brewing App</h1>
      )

    }}

  </Mutation>
)

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default Header