import React from "react"
import PropTypes from "prop-types"

const Tab = ({ label, component }) => (
	<div>
		<span>{label}</span>
		{component}
	</div>
)

Tab.propTypes = {
	label: PropTypes.string.isRequired,
	component: PropTypes.element.isRequired
}

export default Tab