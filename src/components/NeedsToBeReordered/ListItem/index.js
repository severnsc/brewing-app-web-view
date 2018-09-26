import React from "react"
import PropTypes from "prop-types"

const ListItem = ({ name, amount }) => (
	<div>
		<span>{name}</span>
		<span>{amount}</span>
	</div>
)

ListItem.propTypes = {
	name: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired
}

export default ListItem