import React, { Component } from "react"
import PropTypes from "prop-types"
import styles from "./styles"
import formStyles from "../styles"
import globalStyles from "../../styles"

class HopsForm extends Component {

	state = {
		name: "",
		amount: 0,
		alphaAcids: 0,
		countryOfOrigin: "",
		unitCost: 0,
		purchaseDate: "",
		deliveryDate: "",
		reorderQuantity: 0,
		reorderThreshold: 0,
		focus: ""
	}

	componentDidMount() {
		const {
			name,
			amount,
			alphaAcids,
			countryOfOrigin,
			unitCost,
			purchaseDate,
			deliveryDate,
			reorderQuantity,
			reorderThreshold
		} = this.props

		this.setState({
			name: name || "",
			amount: amount || 0,
			alphaAcids: alphaAcids || 0,
			countryOfOrigin: countryOfOrigin || "",
			unitCost: unitCost || 0,
			purchaseDate: purchaseDate || "",
			deliveryDate: deliveryDate || "",
			reorderQuantity: reorderQuantity || 0,
			reorderThreshold: reorderThreshold || 0
		})
	}

	onSubmit = e => {
		e.preventDefault()
		const {
			name,
			amount,
			alphaAcids,
			countryOfOrigin,
			unitCost,
			purchaseDate,
			deliveryDate,
			reorderQuantity,
			reorderThreshold
		} = this.state
		this.props.onSubmit(amount, unitCost, purchaseDate, deliveryDate, reorderQuantity, reorderThreshold, name, alphaAcids, countryOfOrigin)
	}

	handleChange = e => {
		const newState = {}
		newState[e.target.name] = e.target.value
		this.setState(newState)
	}

	toggleFocus = e => {
		if(e.type === "focus"){
			this.setState({ focus: e.target.name })
		}

		if(e.type === "blur"){
			this.setState({ focus: "" })
		}
	}

	render() {

		const {
			name,
			amount,
			alphaAcids,
			countryOfOrigin,
			unitCost,
			purchaseDate,
			deliveryDate,
			reorderQuantity,
			reorderThreshold,
			focus
		} = this.state

		const labelFocusStyle = {...formStyles.label, ...formStyles.labelFocus}
		const inputFocusStyle = {...formStyles.input, ...formStyles.inputFocus}

		return(
			<form style={styles.form} onSubmit={this.onSubmit}>
				<label style={focus === "name" ? labelFocusStyle : formStyles.label}>Hop name
					<input style={focus === "name" ? inputFocusStyle : formStyles.input} name="name" type="text" value={name} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "amount" ? labelFocusStyle : formStyles.label}>Amount (oz)
					<input style={focus === "amount" ? inputFocusStyle : formStyles.input} name="amount" type="number" value={amount} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "alphaAcids" ? labelFocusStyle : formStyles.label}>Alpha Acid Percentage
					<input style={focus === "alphaAcids" ? inputFocusStyle : formStyles.input} name="alphaAcids" type="number" step="0.1" value={alphaAcids} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "countryOfOrigin" ? labelFocusStyle : formStyles.label}>Country of Origin
					<input style={focus === "countryOfOrigin" ? inputFocusStyle : formStyles.input} name="countryOfOrigin" type="text" value={countryOfOrigin} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "unitCost" ? labelFocusStyle : formStyles.label}>Unit cost
					<input style={focus === "unitCost" ? inputFocusStyle : formStyles.input} name="unitCost" type="number" value={unitCost} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "purchaseDate" ? labelFocusStyle : formStyles.label}>Purchase date
					<input style={focus === "purchaseDate" ? inputFocusStyle : formStyles.input} name="purchaseDate" type="date" value={purchaseDate} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "deliveryDate" ? labelFocusStyle : formStyles.label}>Delivery date
					<input style={focus === "deliveryDate" ? inputFocusStyle : formStyles.input} name="deliveryDate" type="date" value={deliveryDate} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "reorderQuantity" ? labelFocusStyle : formStyles.label}>Reorder Quantity
					<input style={focus === "reorderQuantity" ? inputFocusStyle : formStyles.input} name="reorderQuantity" type="number" value={reorderQuantity} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "reorderThreshold" ? labelFocusStyle : formStyles.label}>Reorder Threshold
					<input style={focus === "reorderThreshold" ? inputFocusStyle : formStyles.input} name="reorderThreshold" type="number" value={reorderThreshold} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<input style={globalStyles.button} type="submit" value="submit" />
			</form>
		)

	}

}

HopsForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	name: PropTypes.string,
	amount: PropTypes.number,
	alphaAcids: PropTypes.number,
	countryOfOrigin: PropTypes.string,
	unitCost: PropTypes.number,
	purchaseDate: PropTypes.string,
	reorderQuantity: PropTypes.number,
	reorderThreshold: PropTypes.number
}

export default HopsForm