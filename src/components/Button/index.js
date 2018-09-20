import React from "react"
import PropTypes from "prop-types"
import globalStyles from "../styles"

const Button = ({ onClick, value, style }) => (
	<button style={{...globalStyles.button, ...style}} onClick={onClick}>
		{value}
	</button>
)

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired,
	style: PropTypes.object
}

export default Button