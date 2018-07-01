import React, { Component } from "react"
import PropTypes from "prop-types"

class InventoryItemForm extends Component {

	state = {
		costUnit: this.props.costUnit,
		unitCost: this.props.unitCost,
		reorderCost: this.props.reorderCost,
		quantityUnit: this.props.quantityUnit,
		currentQuantity: this.props.currentQuantity,
		reorderQuantity: this.props.reorderQuantity,
		reorderThreshold: this.props.reorderThreshold,
		lastReorderDate: this.props.lastReorderDate,
		deliveryDate: this.props.deliveryDate
	}

	costUnitChange = e => {
		this.setState({ costUnit: e.target.value })
	}

	unitCostChange = e => {
		this.setState({ unitCost: e.target.value })
	}

	reorderCostChange = e => {
		this.setState({ reorderCost: e.target.value })
	}

	quantityUnitChange = e => {
		this.setState({ quantityUnit: e.target.value })
	}

	currentQuantityChange = e => {
		this.setState({ currentQuantity: e.target.value })
	}

	reorderQuantityChange = e => {
		this.setState({ reorderQuantity: e.target.value })
	}

	reorderThresholdChange = e => {
		this.setState({ reorderThreshold: e.target.value })
	}

	lastReorderDateChange = e => {
		this.setState({ lastReorderDate: e.target.value })
	}

	deliveryDateChange = e => {
		this.setState({ deliveryDate: e.target.value })
	}

	handleSubmit = e => {
		e.preventDefault()
	}

	render() {

		const {
			costUnit,
			unitCost,
			reorderCost,
			quantityUnit,
			currentQuantity,
			reorderQuantity,
			reorderThreshold,
			lastReorderDate,
			deliveryDate
		} = this.state

		return(

			<form onSubmit={this.handleSubmit}>

				<label>Cost Unit
					<select name="costUnit" value={costUnit} onChange={this.costUnitChange}>
						<option value="USD">USD</option>
						<option value="EUR">EUR</option>
						<option value="GBP">GBP</option>
					</select>
				</label>


				<label>Unit Cost
					<input type="number" value={unitCost} onChange={this.unitCostChange} />
				</label>

				<label>Reorder Cost
					<input type="number" value={reorderCost} onChange={this.reorderCostChange} />
				</label>

				<label>Quantity Unit
					<select name="quantityUnit" value={quantityUnit} onChange={this.quantityUnitChange}>
						<option value="imperial">U.S. Imperial</option>
						<option value="metric">Metric</option>
					</select>
				</label>

				<label>Current Quantity
					<input type="number" value={currentQuantity} onChange={this.currentQuantityChange} />
				</label>

				<label>Reorder Quantity
					<input type="number" value={reorderQuantity} onChange={this.reorderQuantityChange} />
				</label>

				<label>Reorder Threshold
					<input type="number" value={reorderThreshold} onChange={this.reorderThresholdChange} />
				</label>

				<label>Last Reorder Date
					<input type="date" value={lastReorderDate} onChange={this.lastReorderDateChange} />
				</label>

				<label>Delivery Date
					<input type="date" value={deliveryDate} onChange={this.deliveryDateChange} />
				</label>

			</form>

		)

	}

}

InventoryItemForm.propTypes = {
	//Costs
	costUnit: PropTypes.string.isRequired,
	unitCost: PropTypes.number.isRequired,
	reorderCost: PropTypes.number.isRequired,

	//Quantities
	quantityUnit: PropTypes.string.isRequired,
	currentQuantity: PropTypes.number.isRequired,
	reorderQuantity: PropTypes.number.isRequired,
	reorderThreshold: PropTypes.number.isRequired,

	//Dates
	lastReorderDate: (props, propName, componentName) => {
		if(!/\d{4}-\d{2}-\d{2}/.test(props[propName])){
			return new Error(`Invalid prop ${propName} supplied to ${componentName}. Validation failed.`)
		}
	},
	deliveryDate: (props, propName, componentName) => {
		if(!/\d{4}-\d{2}-\d{2}/.test(props[propName])){
			return new Error(`Invalid prop ${propName} supplied to ${componentName}. Validation failed.`)
		}
	}
}

export default InventoryItemForm