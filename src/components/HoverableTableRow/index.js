import React, { Component } from 'react'
import styles from "./styles"
import PropTypes from "prop-types"

class HoverableTableRow extends Component {

  state = {
    hover: false
  }

  updateHoverState = e => {
    if(e.type === "mouseenter"){
      this.setState({hover: true})
    }

    if(e.type === "mouseleave"){
      this.setState({hover: false})
    }
  }

  handleClick = () => {
    this.props.onClick(this.props.id)
  }

  render(){

    const style = this.state.hover ? styles.hover : styles.default

    return(
      <tr style={style} onClick={this.handleClick} onMouseEnter={this.updateHoverState} onMouseLeave={this.updateHoverState}>
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
  onClick: PropTypes.func
}

export default HoverableTableRow