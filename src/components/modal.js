import React, { Component } from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"

class ModalConstructor extends Component {

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

ModalConstructor.propTypes = {
  children: PropTypes.element.isRequired
}

const Modal = ({ children }) => {

  const modalStyle = {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "fixed",
    height: "100%",
    width: "100%",
    top: "0",
    left: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
  
  return(
    <ModalConstructor>
        <div style={modalStyle}>
          {children}
        </div>
    </ModalConstructor>
  )

}

Modal.propTypes = {
  children: PropTypes.element.isRequired
}

export default Modal