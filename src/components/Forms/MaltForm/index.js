import React, { Component } from "react"
import PropTypes from "prop-types"
import styles from "./styles"
import formStyles from "../styles"
import globalStyles from "../../styles"
import moment from "moment"

class MaltForm extends Component {

	state = {
		name: "",
		amount: 0,
		type: "Base",
		color: 0,
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
			type,
			color,
			countryOfOrigin,
			unitCost,
			purchaseDate,
			deliveryDate,
			reorderQuantity,
			reorderThreshold
		} = this.props
		const formattedPurchaseDate = purchaseDate 
													? moment(new Date(purchaseDate)).format("YYYY-MM-DD")
													: null

		const formattedDeliveryDate = deliveryDate
													? moment(new Date(deliveryDate)).format("YYYY-MM-DD")
													: null


		this.setState({
			name: name || "",
			amount: amount || 0,
			type: type || "Base",
			color: color || 0,
			countryOfOrigin: countryOfOrigin || "",
			unitCost: unitCost || 0,
			purchaseDate: formattedPurchaseDate || "",
			deliveryDate: formattedDeliveryDate || "",
			reorderQuantity: reorderQuantity || 0,
			reorderThreshold: reorderThreshold || 0
		})
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
			deliveryDate,
			reorderQuantity,
			reorderThreshold
		} = this.state
		this.props.onSubmit(name, amount, type, color, countryOfOrigin, unitCost, purchaseDate, deliveryDate, reorderQuantity, reorderThreshold)
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
			type,
			color,
			countryOfOrigin,
			unitCost,
			purchaseDate,
			deliveryDate,
			reorderQuantity,
			reorderThreshold,
			focus
		} = this.state

		return(
			<form style={styles.form} onSubmit={this.onSubmit}>
				<label style={focus === "name" ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Malt name
					<input autoFocus style={focus === "name" ? {...formStyles.input, ...formStyles.inputFocus} : formStyles.input} name="name" type="text" value={name} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "amount" ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Amount
					<input style={focus === "amount" ? {...formStyles.input, ...formStyles.inputFocus} : formStyles.input} name="amount" type="number" value={amount} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "type" ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Type
					<select style={formStyles.select} name="type" value={type} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus}>
						<option value="Base">Base</option>
						<option value="Crystal">Crystal</option>
						<option value="Roast">Roast</option>
					</select>
				</label>
				<label style={focus === "color" ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Color (SRM)
					<input style={focus === "color" ? {...formStyles.input, ...formStyles.inputFocus} : formStyles.input} name="color" type="number" value={color} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "countryOfOrigin" ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Country of Origin
					<input style={focus === "countryOfOrigin" ? {...formStyles.input, ...formStyles.inputFocus} : formStyles.input} name="countryOfOrigin" type="text" value={countryOfOrigin} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "unitCost" ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Unit cost
					<input style={focus === "unitCost" ? {...formStyles.input, ...formStyles.inputFocus} : formStyles.input} name="unitCost" type="number" value={unitCost} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "purchaseDate" ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Purchase date
					<input style={focus === "purchaseDate" ? {...formStyles.input, ...formStyles.inputFocus} : formStyles.input} name="purchaseDate" type="date" value={purchaseDate} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "deliveryDate" ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Delivery date
					<input style={focus === "deliveryDate" ? {...formStyles.input, ...formStyles.inputFocus} : formStyles.input} name="deliveryDate" type="date" value={deliveryDate} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "reorderQuantity" ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Reorder Quantity
					<input style={focus === "reorderQuantity" ? {...formStyles.input, ...formStyles.inputFocus} : formStyles.input} name="reorderQuantity" type="number" value={reorderQuantity} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<label style={focus === "reorderThreshold" ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Reorder Threshold
					<input style={focus === "reorderThreshold" ? {...formStyles.input, ...formStyles.inputFocus} : formStyles.input} name="reorderThreshold" type="number" value={reorderThreshold} onChange={this.handleChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>
				<input style={globalStyles.button} type="submit" value="submit" />
			</form>
		)

	}

}

MaltForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	name: PropTypes.string,
	amount: PropTypes.number,
	type: PropTypes.string,
	color: PropTypes.number,
	countryOfOrigin: PropTypes.string,
	unitCost: PropTypes.number,
	purchaseDate: PropTypes.string,
	reorderQuantity: PropTypes.number,
	reorderThreshold: PropTypes.number
}

export default MaltForm