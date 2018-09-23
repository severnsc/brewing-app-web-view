import React, { Component } from "react"
import PropTypes from "prop-types"
import styles from "./styles"
import formStyles from "../styles"
import globalStyles from "../../styles"

class YeastForm extends Component {

	state = {
		name: "",
		amount: 0,
		lab: "",
		number: "",
		type: "Ale",
		dryOrLiquid: "Dry",
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
			lab,
			number,
			type,
			dryOrLiquid,
			unitCost,
			purchaseDate,
			deliveryDate,
			reorderQuantity,
			reorderThreshold
		} = this.props

		this.setState({
			name: name || "",
			amount: amount || 0,
			lab: lab || "",
			number: number || "",
			type: type || "Ale",
			dryOrLiquid: dryOrLiquid || "Dry",
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
			lab,
			number,
			type,
			dryOrLiquid,
			unitCost,
			purchaseDate,
			deliveryDate,
			reorderQuantity,
			reorderThreshold
		} = this.state
		this.props.onSubmit(amount, unitCost, purchaseDate, deliveryDate, reorderQuantity, reorderThreshold, name, lab, number, type, dryOrLiquid)
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
			lab,
			number,
			type,
			dryOrLiquid,
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
				<label style={focus === "name" ? labelFocusStyle : formStyles.label}>Yeast name
					<input style={focus === "name" ? inputFocusStyle : formStyles.input} name="name" type="text" value={name} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "amount" ? labelFocusStyle : formStyles.label}>Amount
					<input style={focus === "amount" ? inputFocusStyle : formStyles.input} name="amount" type="number" value={amount} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "lab" ? labelFocusStyle : formStyles.label}>Yeast lab
					<input style={focus === "lab" ? inputFocusStyle : formStyles.input} name="lab" type="text" value={lab} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "number" ? labelFocusStyle : formStyles.label}>Yeast number (i.e. WLP001)
					<input style={focus === "number" ? inputFocusStyle : formStyles.input} name="number" type="text" value={number} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "type" ? labelFocusStyle : formStyles.label}>Type
					<select style={formStyles.select} name="type" value={type} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus}>
						<option value="Ale">Ale</option>
						<option value="Lager">Lager</option>
						<option value="Hybrid">Hybrid</option>
						<option value="Wine">Wine</option>
						<option value="Cider">Cider</option>
						<option value="Bacteria/Wild">Bacteria/Wild</option>
					</select>
				</label>
				<label style={focus === "dry" ? labelFocusStyle : formStyles.label}>Dry or liquid
					<select style={formStyles.select} name="dryOrLiquid" value={dryOrLiquid} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus}>
						<option value="Dry">Dry</option>
						<option value="Liquid">Liquid</option>
					</select>
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
				<input style={globalStyles.button} type="submit" value="Submit" />
			</form>
		)

	}

}

YeastForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	name: PropTypes.string,
	amount: PropTypes.number,
	lab: PropTypes.string,
	number: PropTypes.string,
	type: PropTypes.oneOf([
		"Ale",
		"Lager",
		"Hybrid",
		"Wine",
		"Cider",
		"Bacteria/Wild"
	]),
	dryOrLiquid: PropTypes.oneOf(["Dry", "Liquid"]),
	unitCost: PropTypes.number,
	purchaseDate: PropTypes.string,
	deliveryDate: PropTypes.string,
	reorderQuantity: PropTypes.number,
	reorderThreshold: PropTypes.number
}

export default YeastForm