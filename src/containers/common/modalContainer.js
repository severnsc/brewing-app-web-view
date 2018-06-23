import React from "react"
import PropTypes from "prop-types"
import Modal from "../../components/modal"
import { Mutation } from "react-apollo"
import { UPDATE_MODAL } from "../../mutations"

const ModalContainer = ({ modalItem }) => (
  <Mutation mutation={UPDATE_MODAL}>
    {mutation => {

      const closeModal = () => {
        mutation({ variables: { type: "", id: "" }})
      }

      return(
        <Modal closeModal={closeModal}>
          {modalItem}
        </Modal>
      )
    }}
  </Mutation>
)

ModalContainer.propTypes = {
  modalItem: PropTypes.element.isRequired
}

export default ModalContainer