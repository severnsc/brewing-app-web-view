import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"

const Tab = ({ label, component, active, onClick }) => (
	<li onClick={() => onClick(label)} style={active ? styles.active : styles.tab}>
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