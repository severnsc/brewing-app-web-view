import React from "react"
import styles from "./styles"

const MaltColor = ({ value }) => {
	const color = styles.color(value)

	return(
		<div style={{background: color, ...styles.container}}>
			<span style={styles.value}>{Math.round(value)}</span>
		</div>
	)
}

export default MaltColor