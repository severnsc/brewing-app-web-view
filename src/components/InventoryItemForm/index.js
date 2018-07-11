import React, { Component } from "react"
import PropTypes from "prop-types"

class InventoryItemForm extends Component {

	state = {
		name: this.props.name,
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

	updateState = e => {
		const object = {}
		object[e.target.name] = e.target.value
		this.setState(object)
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.saveInventoryItem(this.state)
	}

	render() {

		const {
			name,
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

				<label>Name
					<input name="name" type="text" value={name} onChange={this.updateState} />
				</label>

				<label>Cost Unit
					<select name="costUnit" value={costUnit} onChange={this.updateState}>
						<option value="USD">USD</option>
						<option value="EUR">EUR</option>
						<option value="GBP">GBP</option>
					</select>
				</label>


				<label>Unit Cost
					<input name="unitCost" type="number" value={unitCost} onChange={this.updateState} />
				</label>

				<label>Reorder Cost
					<input name="reorderCost" type="number" value={reorderCost} onChange={this.updateState} />
				</label>

				<label>Quantity Unit
					<select name="quantityUnit" value={quantityUnit} onChange={this.updateState}>
						<option value="imperial">U.S. Imperial</option>
						<option value="metric">Metric</option>
					</select>
				</label>

				<label>Current Quantity
					<input name="currentQuantity" type="number" value={currentQuantity} onChange={this.updateState} />
				</label>

				<label>Reorder Quantity
					<input name="reorderQuantity" type="number" value={reorderQuantity} onChange={this.updateState} />
				</label>

				<label>Reorder Threshold
					<input name="reorderThreshold" type="number" value={reorderThreshold} onChange={this.updateState} />
				</label>

				<label>Last Reorder Date
					<input name="lastReorderDate" type="date" value={lastReorderDate} onChange={this.updateState} />
				</label>

				<label>Delivery Date
					<input name="deliveryDate" type="date" value={deliveryDate} onChange={this.updateState} />
				</label>

				<input type="submit" value="Save" />

			</form>

		)

	}

}

InventoryItemForm.propTypes = {
	name: PropTypes.string.isRequired,
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
	},
	saveInventoryItem: PropTypes.func.isRequired
}

export default InventoryItemForm