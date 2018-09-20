import React, { Component } from "react"
import PropTypes from "prop-types"

class NewYeastForm extends Component {

	state = {
		name: "",
		amount: 0,
		lab: "",
		number: "",
		type: "Ale",
		dryOrLiquid: "Dry",
		unitCost: 0,
		purchaseDate: "",
		reorderQuantity: 0,
		reorderThreshold: 0
	}

	onSubmit = e => {
		e.preventDefault()
		const {
			name,
			amount,
			lab,
			number,
			type,
			dry,
			unitCost,
			purchaseDate,
			reorderQuantity,
			reorderThreshold
		} = this.state
		this.props.onSubmit(name, amount, lab, number, type, dry, unitCost, purchaseDate, reorderQuantity, reorderThreshold)
	}

	handleChange = e => {
		const newState = {}
		newState[e.target.name] = e.target.value
		this.setState(newState)
	}

	render() {

		const {
			name,
			amount,
			lab,
			number,
			type,
			dry,
			unitCost,
			purchaseDate,
			reorderQuantity,
			reorderThreshold
		} = this.state

		return(
			<form onSubmit={this.onSubmit}>
				<label>Yeast name
					<input name="name" type="text" value={name} onChange={this.handleChange} />
				</label>
				<label>Amount
					<input name="amount" type="number" value={amount} onChange={this.handleChange} />
				</label>
				<label>Yeast lab
					<input name="lab" type="text" value={lab} onChange={this.handleChange} />
				</label>
				<label>Yeast number (i.e. WLP001)
					<input name="number" type="text" value={number} onChange={this.handleChange} />
				</label>
				<label>Type
					<select name="type" value={type} onChange={this.handleChange}>
						<option value="Ale">Ale</option>
						<option value="Lager">Lager</option>
						<option value="Hybrid">Hybrid</option>
						<option value="Wine">Wine</option>
						<option value="Cider">Cider</option>
						<option value="Bacteria/Wild">Bacteria/Wild</option>
					</select>
				</label>
				<label>Dry or liquid
					<select name="dry" value={dry} onChange={this.handleChange}>
						<option value="Dry">Dry</option>
						<option value="Liquid">Liquid</option>
					</select>
				</label>
				<label>Unit cost
					<input name="unitCost" type="number" value={unitCost} onChange={this.handleChange} />
				</label>
				<label>Purchase date
					<input name="purchaseDate" type="date" value={purchaseDate} onChange={this.handleChange} />
				</label>
				<label>Reorder Quantity
					<input name="reorderQuantity" type="number" value={reorderQuantity} onChange={this.handleChange} />
				</label>
				<label>Reorder Threshold
					<input name="reorderThreshold" type="number" value={reorderThreshold} onChange={this.handleChange} />
				</label>
				<input type="submit" value="submit" />
			</form>
		)

	}

}

NewYeastForm.propTypes = {
	onSubmit: PropTypes.func.isRequired
}

export default NewYeastForm