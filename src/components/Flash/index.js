import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"

const Flash = ({ message }) => (
	<span style={styles.flash}>{message}</span>
)

Flash.propTypes = {
	message: PropTypes.string.isRequired
}

export default Flash