import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"

const Flash = ({ message, style }) => (
	<span style={{...styles.flash, ...style}}>{message}</span>
)

Flash.propTypes = {
	message: PropTypes.string.isRequired,
	style: PropTypes.object
}

export default Flash