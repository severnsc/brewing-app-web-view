import React from "react"
import PropTypes from "prop-types"

const Tab = ({ label, component, active, onClick }) => (
	<li onClick={() => onClick(label)}>
		{label}
	</li>
)

Tab.propTypes = {
	label: PropTypes.string.isRequired,
	component: PropTypes.element.isRequired,
	active: PropTypes.bool.isRequired,
	onClick: PropTypes.func
}

export default Tab