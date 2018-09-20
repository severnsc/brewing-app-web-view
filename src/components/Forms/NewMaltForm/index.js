import React, { Component } from "react"
import PropTypes from "prop-types"

class NewMaltForm extends Component {

	state = {
		name: "",
		amount: 0,
		type: "Base",
		color: 0,
		countryOfOrigin: "",
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
			type,
			color,
			countryOfOrigin,
			unitCost,
			purchaseDate,
			reorderQuantity,
			reorderThreshold
		} = this.state
		this.props.onSubmit(name, amount, type, color, countryOfOrigin, unitCost, purchaseDate, reorderQuantity, reorderThreshold)
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
			type,
			color,
			countryOfOrigin,
			unitCost,
			purchaseDate,
			reorderQuantity,
			reorderThreshold
		} = this.state

		return(
			<form onSubmit={this.onSubmit}>
				<label>Malt name
					<input name="name" type="text" value={name} onChange={this.handleChange} />
				</label>
				<label>Amount
					<input name="amount" type="number" value={amount} onChange={this.handleChange} />
				</label>
				<label>Type
					<select name="type" value={type} onChange={this.handleChange}>
						<option value="Base">Base</option>
						<option value="Crystal">Crystal</option>
						<option value="Roast">Roast</option>
					</select>
				</label>
				<label>Color (SRM)
					<input name="color" type="number" value={color} onChange={this.handleChange} />
				</label>
				<label>Country of Origin
					<input name="countryOfOrigin" type="text" value={countryOfOrigin} onChange={this.handleChange} />
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

NewMaltForm.propTypes = {
	onSubmit: PropTypes.func.isRequired
}

export default NewMaltForm