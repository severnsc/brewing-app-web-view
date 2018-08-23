import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"

const NewButton = ({ onClick }) => (
	<button style={styles.newButton} onClick={onClick}>
		+
	</button>
)

NewButton.propTypes = {
	onClick: PropTypes.func.isRequired
}

export default NewButton