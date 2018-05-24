import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"

class Modal extends Component {

  constructor(props){
    super(props)
    this.modalRoot = document.getElementById("modal-root")
    this.el = document.createElement('div')
  }

  componentDidMount(){
    this.modalRoot.appendChild(this.el)
  }

  componentWillUnmount(){
    this.modalRoot.removeChild(this.el)
  }

  render(){

    return(
      ReactDOM.createPortal(
        this.props.children,
        this.el
      )
    )

  }

}

Modal.propTypes = {
  children: PropTypes.element.isRequired
}

export default Modal