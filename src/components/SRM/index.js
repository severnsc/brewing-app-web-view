import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"

const SRM = ({ value }) => {

	let style = styles[Math.round(value)]
	if(!style && value >= 31){
		style = styles.dark
	}

	if(!style){
		style = null
	}

	return(
		<div style={{...style, ...styles.container}}>
			<span style={styles.value}>{Math.round(value)}</span>
		</div>
	)
}

SRM.propTypes = {
	value: PropTypes.number.isRequired
}

export default SRM