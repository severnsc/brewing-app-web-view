import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"

const ListItem = ({ name, amount, reorderQuantity, reorderCost }) => (
	<div style={styles.container}>
		<span style={styles.item}>{name}</span>
		<span style={styles.item}>Remaining: {amount}</span>
		<span style={styles.item}>Amount to reorder: {reorderQuantity}</span>
		<span style={styles.item}>Reorder cost: ${reorderCost}</span>
	</div>
)

ListItem.propTypes = {
	name: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	reorderQuantity: PropTypes.number.isRequired,
	reorderCost: PropTypes.number.isRequired
}

export default ListItem