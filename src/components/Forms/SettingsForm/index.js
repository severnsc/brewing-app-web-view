import React, { Component } from "react"
import PropTypes from "prop-types"
import formStyles from "../styles"
import globalStyles from "../../styles"

class SettingsForm extends Component {

	state = {
		weight: "",
		liquid: "",
		currency: "",
		maltColor: "",
		beerColor: "",
		disabled: true
	}

	componentDidMount() {
		const state = Object.keys(this.state)
		state.forEach(key => {
			if(this.props[key]){
				const newState = []
				newState[key] = this.props[key]
				this.setState(newState)
			}
		})
	}

	componentDidUpdate(prevProps, prevState) {
		//If there are any empty inputs and disabled is false
		const { disabled, ...inputs } = this.state
		if(Object.keys(inputs).some(key => this.state[key] === "") && !disabled){
			this.setState({ disabled: true })
			return
		}
		//If any of the inputs have changed value
		const { disabled: prevDisabled, ...prevInputs } = prevState
		if(Object.keys(prevInputs).some(key => 
			prevState[key] !== this.state[key] && 
			this.state[key] !== this.props[key]
		)){
			this.setState({	disabled: false })
		}
	}

	onChange = e => {
		const newState = {}
		newState[e.target.name] = e.target.value
		this.setState(newState)
	}

	onSubmit = e => {
		e.preventDefault()
		const { weight, liquid, currency, maltColor, beerColor } = this.state
		this.props.onSubmit(weight, liquid, currency, maltColor, beerColor)
		this.setState({ disabled: true })
	}

	render(){
		const { weight, liquid, currency, maltColor, beerColor, disabled } = this.state
		return(
			<form onSubmit={this.onSubmit}>
				<label htmlFor="weight" style={formStyles.label}>
					Weight
					<select id="weight" name="weight" value={weight} onChange={this.onChange} style={formStyles.select}>
						<option disabled value="">Select weight units</option>
						<option value="imperial">Imperial (lbs/oz)</option>
						<option value="metric">Metric (kg/g)</option>
					</select>
				</label>
				<label htmlFor="liquid" style={formStyles.label}>
					Liquid
					<select id="liquid" name="liquid" value={liquid} onChange={this.onChange} style={formStyles.select}>
						<option disabled value="">Select liquid units</option>
						<option value="imperial">Imperial (gal/oz)</option>
						<option value="metric">Metric (l/ml)</option>
					</select>
				</label>
				<label htmlFor="currency" style={formStyles.label}>
					Currency
					<select id="currency" name="currency" value={currency} onChange={this.onChange} style={formStyles.select}>
						<option disabled value="">Select currency units</option>
						<option value="USD">USD</option>
						<option value="GBP">GBP</option>
						<option value="EUR">EUR</option>
					</select>
				</label>
				<label htmlFor="maltColor" style={formStyles.label}>
					Malt color
					<select id="maltColor" name="maltColor" value={maltColor} onChange={this.onChange} style={formStyles.select}>
						<option disabled value="">Select malt color units</option>
						<option value="SRM">SRM</option>
						<option value="EBC">EBC</option>
						<option value="L">L</option>
					</select>
				</label>
				<label htmlFor="beerColor" style={formStyles.label}>
					Beer color
					<select id="beerColor" name="beerColor" value={beerColor} onChange={this.onChange} style={formStyles.select}>
						<option disabled value="">Select beer color units</option>
						<option value="SRM">SRM</option>
						<option value="EBC">EBC</option>
						<option value="L">L</option>
					</select>
				</label>
				<input type="submit" value="Save settings" style={disabled ? {...globalStyles.button, ...formStyles.disabled} : globalStyles.button} disabled={disabled} />
			</form>
		)		
	}

}

SettingsForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	weight: PropTypes.oneOf(["imperial", "metric"]),
	liquid: PropTypes.oneOf(["imperial", "metric"]),
	currency: PropTypes.oneOf(["USD", "GBP", "EUR"]),
	maltColor: PropTypes.oneOf(["SRM", "EBC", "L"]),
	beerColor: PropTypes.oneOf(["SRM", "EBC", "L"])
}

export default SettingsForm