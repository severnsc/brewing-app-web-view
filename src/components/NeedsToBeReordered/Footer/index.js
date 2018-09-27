import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"

const Footer = ({ totalReorderCost }) => (
	<div style={styles.container}>
		<span>Total reorder cost: ${totalReorderCost}</span>
	</div>
)

Footer.propTypes = {
	totalReorderCost: PropTypes.number.isRequired
}

export default Footer