import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"

const FixedNewItemButton = ({ onClick }) => (
	<button style={styles.newButton} onClick={onClick}>
		+
	</button>
)

FixedNewItemButton.propTypes = {
	onClick: PropTypes.func.isRequired
}

export default FixedNewItemButton