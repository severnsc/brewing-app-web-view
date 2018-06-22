import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class SubMenu extends Component {

  constructor(props){
    super(props)
    this.state = {
      profileBackgroundColor: "white",
      profileTextColor: "black",
      signOutBackgroundColor: "white",
      signOutTextColor:"black"
    }
  }

  updateLinkColors = event => {
    if(event.type === "mouseenter"){
      if(event.target.innerHTML === "My Profile"){
        this.setState({
          profileBackgroundColor:"#c1c1c1",
          profileTextColor: "white"
        })
      }

      if(event.target.innerHTML === "Sign out"){
        this.setState({
          signOutBackgroundColor: "#c1c1c1",
          signOutTextColor: "white"
        })
      }
    }

    if(event.type === "mouseleave"){
      if(event.target.innerHTML === "My Profile"){
        this.setState({
          profileBackgroundColor: "white",
          profileTextColor: "black"
        })
      }

      if(event.target.innerHTML === "Sign out"){
        this.setState({
          signOutBackgroundColor: "white",
          signOutTextColor: "black"
        })
      }
    }
  }
  
  render(){
    const linkStyle = {
      padding: "3px 40px",
      margin: "0",
      color: "white"
    }

    const subLinkStyle = {
      ...linkStyle,
      padding: "12px",
      textDecoration: "none"
    }

    return (
      <Fragment>
        <p style={linkStyle}>{this.props.username}</p>
        <a onMouseEnter={this.updateLinkColors} onMouseLeave={this.updateLinkColors} style={{...subLinkStyle, backgroundColor: this.state.profileBackgroundColor, color: this.state.profileTextColor}} href="/profile">My Profile</a>
        <a onClick={this.props.signOut} onMouseEnter={this.updateLinkColors} onMouseLeave={this.updateLinkColors} style={{...subLinkStyle, backgroundColor: this.state.signOutBackgroundColor, color: this.state.signOutTextColor}} href="http://localhost:3001/logout">Sign out</a>
      </Fragment>
    )
  }
}

SubMenu.propTypes = {
  username: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired
}

class NavBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      submenuVisible: false,
      timersLinkColor: "",
      inventoriesLinkColor: "",
      accountLinkColor: ""
    }
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  toggleSubmenu() {
    this.setState({submenuVisible: !this.state.submenuVisible})
  }

  hideSubmenu() {
    this.setState({submenuVisible: false})
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
      this.setState({submenuVisible: false, accountLinkColor:""})
    }
  }

  updateTimersLinkColor = event => {
    if(event.type === "mouseenter"){
      this.setState({timersLinkColor: "gray"})
    }

    if(event.type === "mouseleave"){
      this.setState({timersLinkColor:""})
    }
  }

  updateInventoriesLinkColor = event => {
    if(event.type === "mouseenter"){
      this.setState({inventoriesLinkColor: "gray"})
    }

    if(event.type === "mouseleave"){
      this.setState({inventoriesLinkColor:""})
    }
  }

  updateAccountLinkColor = event => {

    if(event.type === "mouseenter"){
      this.setState({accountLinkColor: "gray"})
    }

    if(event.type === "mouseleave"){
      if(this.state.submenuVisible) return null
      this.setState({accountLinkColor:""})
    }
  }

  render(){

    const navLinkStyle = {
      display:"inline-block",
      color:"white",
      textDecoration:"none",
      lineHeight: "50px",
      padding:"0 12px"
    }

    const subMenuStyle = {
      position: "absolute",
      right: "100px",
      top: "50px",
      backgroundColor: "gray",
      display: "flex",
      flexFlow: "column",
      border:"1px solid"
    }

    return(
      <nav style={{display:"flex", justifyContent:"space-between", alignItems: "center", height:"50px", backgroundColor:"#383838"}} >
        <span style={{marginLeft:"100px"}} >
          <a onMouseEnter={this.updateTimersLinkColor} onMouseLeave={this.updateTimersLinkColor} style={{...navLinkStyle, backgroundColor: this.state.timersLinkColor}} href="/timers">Timers</a>
          <a onMouseEnter={this.updateInventoriesLinkColor} onMouseLeave={this.updateInventoriesLinkColor} style={{...navLinkStyle, backgroundColor: this.state.inventoriesLinkColor}} href="/inventories">Inventories</a>
        </span>
        <a onMouseEnter={this.updateAccountLinkColor} onMouseLeave={this.updateAccountLinkColor} style={{...navLinkStyle, marginRight:"100px", backgroundColor: this.state.accountLinkColor}} ref={this.setMenuRef} onClick={() => this.toggleSubmenu()}>Account &or;</a>
        {this.state.submenuVisible && 
          <nav style={subMenuStyle} ref={this.setWrapperRef}><SubMenu username={"user"} signOut={this.props.signOut} /></nav>
        }
      </nav>
    )
  
  }

}

NavBar.propTypes = {
  signOut: PropTypes.func.isRequired
}

export default NavBar