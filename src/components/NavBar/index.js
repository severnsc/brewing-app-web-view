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
        <p style={styles.link}>{this.props.username}</p>
        <Link onClick={this.props.onProfileClick} onMouseEnter={this.updateMouseEnter} onMouseLeave={this.updateMouseEnter} style={profileStyle} to="/profile">My Profile</Link>
        <a onClick={this.props.signOut} onMouseEnter={this.updateMouseEnter} onMouseLeave={this.updateMouseEnter} style={signOutStyle} href="http://localhost:3001/logout">Sign out</a>
      </Fragment>
    )
  }
}

SubMenu.propTypes = {
  username: PropTypes.string.isRequired,
  onProfileClick: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired
}

class NavBar extends Component {

  state = {
    submenuVisible: false,
    mouseenter: null
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  toggleSubmenu = () => {
    this.setState({submenuVisible: !this.state.submenuVisible})
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef = node => {
    this.wrapperRef = node
  }

  setMenuRef = node => {
    this.menuRef = node
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && !this.menuRef.contains(event.target)) {
      this.setState({submenuVisible: false, mouseenter: null})
    }
  }

  handleMouse = event => {
    if(event.type === "mouseenter"){
      this.setState({mouseenter: event.target.innerHTML})
    }

    if(event.type === "mouseleave"){
      this.setState({"mouseenter": null})
    }
  }

  render(){

    const timersLinkStyle = this.state.mouseenter === "Timers" ? styles.navLinkMouseEnter : styles.navLink
    const inventoriesLinkStyle = this.state.mouseenter === "Inventories" ? styles.navLinkMouseEnter : styles.navLink
    const accountLinkStyle = this.state.mouseenter === "Account ∨" ? styles.accountLinkMouseEnter : styles.accountLink

    return(
      <nav style={styles.nav} >
        <span style={styles.span} >
          <Link onMouseEnter={this.handleMouse} onMouseLeave={this.handleMouse} style={timersLinkStyle} to="/timers">Timers</Link>
          <Link onMouseEnter={this.handleMouse} onMouseLeave={this.handleMouse} style={inventoriesLinkStyle} to="/inventories">Inventories</Link>
        </span>
        <a onMouseEnter={this.handleMouse} onMouseLeave={this.handleMouse} style={accountLinkStyle} ref={this.setMenuRef} onClick={this.toggleSubmenu}>Account &or;</a>
        {this.state.submenuVisible && 
          <nav style={styles.subMenu} ref={this.setWrapperRef}><SubMenu onProfileClick={this.toggleSubmenu} username={"user"} signOut={this.props.signOut} /></nav>
        }
      </nav>
    )
  
  }

}

NavBar.propTypes = {
  signOut: PropTypes.func.isRequired
}

export default NavBar