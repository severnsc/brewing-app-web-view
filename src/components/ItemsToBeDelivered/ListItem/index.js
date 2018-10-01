import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"

const ListItem = ({ name, amountOrdered, currentQuantity, deliveryDate }) => (
	<div style={styles.container}>
		<span style={styles.item}>{name}</span>
		<span style={styles.item}>Amount ordered: {amountOrdered}</span>
		<span style={styles.item}>Current quantity: {currentQuantity}</span>
		<span style={styles.item}>Delivery date: {deliveryDate}</span>
	</div>
)

ListItem.propTypes = {
	name: PropTypes.string.isRequired,
	amountOrdered: PropTypes.number.isRequired,
	currentQuantity: PropTypes.number.isRequired,
	deliveryDate: PropTypes.string.isRequired
}

export default ListItem