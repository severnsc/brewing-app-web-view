import React from 'react'
import PropTypes from 'prop-types'
import NavBar from './components/navBar'

const Header = ({ isLoggedIn }) => 
  isLoggedIn ? <NavBar /> : <h1>Brewing App</h1>

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default Header