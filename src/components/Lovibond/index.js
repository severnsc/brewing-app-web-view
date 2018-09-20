import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"

const Lovibond = ({ value }) => {

	let style = styles[value]
	if(!style && value >= 41){
		style = styles.dark
	}

	if(!style){
		style = null
	}

	return(
		<div style={{...style, ...styles.container}}>
			<span style={styles.value}>{value}</span>
		</div>
	)

}

Lovibond.propTypes = {
	value: PropTypes.number.isRequired
}

export default Lovibond