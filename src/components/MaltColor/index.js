import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"

const MaltColor = ({ value }) => {
	const color = styles.color(value)

	return(
		<div style={{background: color, ...styles.container}}>
			<span style={styles.value}>{Math.round(value)}</span>
		</div>
	)
}

MaltColor.propTypes = {
	value: PropTypes.number.isRequired
}

export default MaltColor