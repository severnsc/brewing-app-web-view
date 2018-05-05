import React, { Component } from 'react'

const SubMenu = ({username}) => (
  <div>
    <div>
      <p>{username}</p>
    </div>
    <a href="#">My Profile</a>
    <a href="#">Sign out</a>
  </div>
)

class NavBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      submenuVisible: false
    }

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setMenuRef = this.setMenuRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this);
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
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  setMenuRef(node) {
    this.menuRef = node
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && !this.menuRef.contains(event.target)) {
      this.setState({submenuVisible: false})
    }
  }

  render(){

    return(
      <nav>
        <a href="#">Timers</a>
        <a href="#">Inventories</a>
        <a ref={this.setMenuRef} onClick={() => this.toggleSubmenu()} href="#">Account &or;</a>
        {this.state.submenuVisible && 
          <div ref={this.setWrapperRef}><SubMenu username={"user"} /></div>
        }
      </nav>
    )
  
  }

}

export default NavBar