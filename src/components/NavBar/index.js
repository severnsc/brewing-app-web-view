import React, { Component, Fragment } from 'react'
import styles from "./styles"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

class SubMenu extends Component {

  state = {
    mouseenter: null
  }

  updateMouseEnter = event => {
    if(event.type === "mouseenter"){
      this.setState({mouseenter: event.target.innerHTML})
    }

    if(event.type === "mouseleave"){
      this.setState({mouseenter: event.target.innerHTML})
    }
  }
  
  render(){

    const profileStyle = this.state.mouseenter === "My Profile" ? styles.mouseenter : styles.default
    const signOutStyle = this.state.mouseenter === "Sign out" ? styles.mouseenter : styles.default

    return (
      <Fragment>
        <Link onMouseEnter={this.updateMouseEnter} onMouseLeave={this.updateMouseEnter} style={profileStyle} to="/profile">My Profile</Link>
        <a onClick={this.props.signOut} onMouseEnter={this.updateMouseEnter} onMouseLeave={this.updateMouseEnter} style={signOutStyle} href="https://brewing-app-api.herokuapp.com/logout">Sign out</a>
      </Fragment>
    )
  }
}

SubMenu.propTypes = {
  signOut: PropTypes.func.isRequired
}

class NavBar extends Component {

  state = {
    submenuVisible: false,
    mouseenter: null
  }

  handleMouse = event => {
    if(event.type === "mouseenter"){
      this.setState({
        mouseenter: event.target.innerHTML,
        submenuVisible: ["Account", "user", "My Profile", "Sign out"].includes(event.target.innerHTML)
      })
    }

    if(event.type === "mouseleave"){
      const submenuVisible = ["Account", "user", "My Profile", "Sign out"].includes(event.target.innerHTML) ? false : this.state.submenuVisible
      this.setState({
        "mouseenter": null,
        submenuVisible
      })
    }
  }

  render(){

    if(this.props.authenticated){

      const timersLinkStyle = this.state.mouseenter === "Timers" ? styles.navLinkMouseEnter : styles.navLink
      const inventoriesLinkStyle = this.state.mouseenter === "Inventories" ? styles.navLinkMouseEnter : styles.navLink
      const accountLinkStyle = this.state.mouseenter === "Account" || this.state.submenuVisible ? styles.accountLinkMouseEnter : styles.accountLink

      return(
        <nav style={styles.nav} >
          <span style={styles.span} >
            <Link onMouseEnter={this.handleMouse} onMouseLeave={this.handleMouse} style={timersLinkStyle} to="/timers">Timers</Link>
            <Link onMouseEnter={this.handleMouse} onMouseLeave={this.handleMouse} style={inventoriesLinkStyle} to="/inventories">Inventories</Link>
          </span>
          <a onMouseEnter={this.handleMouse} onMouseLeave={this.handleMouse} style={accountLinkStyle}>Account</a>
          {this.state.submenuVisible && 
            <nav onMouseEnter={this.handleMouse} onMouseLeave={this.handleMouse} style={styles.subMenu}><SubMenu username={"user"} signOut={this.props.signOut} /></nav>
          }
        </nav>
      )

    }else{
      return(
        <nav style={{...styles.nav, border: "none"}}>
          <p style={styles.navLink}>Brewing App</p>
        </nav>
      )
    }
  
  }

}

NavBar.propTypes = {
  authenticated: PropTypes.bool,
  signOut: PropTypes.func
}

export default NavBar