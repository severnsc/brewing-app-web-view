import React, { Component } from 'react'
import PropTypes from "prop-types"

class HoverableTableRow extends Component {

  constructor(props){
    super(props)
    this.state = {
      hover: false
    }

    this.updateHoverState = this.updateHoverState.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  updateHoverState(e) {
    if(e.type === "mouseenter"){
      this.setState({hover: true})
    }

    if(e.type === "mouseleave"){
      this.setState({hover: false})
    }
  }

  handleClick() {
    this.props.onClick(this.props.id)
  }

  render(){

    const backgroundColor = this.state.hover ? "#e8e8e8" : "white"

    return(
      <tr style={{cursor:"pointer", backgroundColor}} onClick={this.handleClick} onMouseEnter={this.updateHoverState} onMouseLeave={this.updateHoverState}>
        {this.props.children}
      </tr>
    )

  }

}

HoverableTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element
  ]).isRequired,
  onClick: PropTypes.func.isRequired
}

export default HoverableTableRow