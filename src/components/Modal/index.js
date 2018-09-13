import React, { Component } from "react"
import ReactDOM from "react-dom"
import styles from "./styles"
import PropTypes from "prop-types"
import formStyles from "../Forms/styles"

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

const Overlay = ({ children }) => {

  return(
    <div style={styles.overlay}>
      {children}
    </div>
  )

}

Overlay.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

const Modal = ({ children, closeModal }) => {
  
  return(
    <ModalConstructor>
        <div style={styles.modal}>
          <Overlay>
            {children}
            <button style={formStyles.tertiaryButton} onClick={() => closeModal()}>Cancel</button>
          </Overlay>
        </div>
    </ModalConstructor>
  )

}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default Modal