import React, { Component } from "react"
import PropTypes from "prop-types"

class SettingsForm extends Component {

	state = {
		weight: "",
		liquid: "",
		currency: "",
		maltColor: "",
		beerColor: ""
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

	onChange = e => {
		const newState = {}
		newState[e.target.name] = e.target.value
		this.setState(newState)
	}

	onSubmit = e => {
		e.preventDefault()
		const { weight, liquid, currency, maltColor, beerColor } = this.state
		this.props.onSubmit(weight, liquid, currency, maltColor, beerColor)
	}

	render(){
		const { weight, liquid, currency, maltColor, beerColor } = this.state
		return(
			<form onSubmit={this.onSubmit}>
				<select name="weight" value={weight} onChange={this.onChange}>
					<option value="imperial">Imperial (lbs/oz)</option>
					<option value="metric">Metric (kg/g)</option>
				</select>
				<select name="liquid" value={liquid} onChange={this.onChange}>
					<option value="imperial">Imperial (gal/oz)</option>
					<option value="metric">Metric (l/ml)</option>
				</select>
				<select name="currency" value={currency} onChange={this.onChange}>
					<option value="USD">USD</option>
					<option value="GBP">GBP</option>
					<option value="EUR">EUR</option>
				</select>
				<select name="maltColor" value={maltColor} onChange={this.onChange}>
					<option value="SRM">SRM</option>
					<option value="EBC">EBC</option>
					<option value="L">L</option>
				</select>
				<select name="beerColor" value={beerColor} onChange={this.onChange}>
					<option value="SRM">SRM</option>
					<option value="ECB">ECB</option>
					<option value="L">L</option>
				</select>
				<input type="submit" value="Save settings" />
			</form>
		)		
	}

}

SettingsForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	weight: PropTypes.string,
	liquid: PropTypes.string,
	currency: PropTypes.string,
	maltColor: PropTypes.string,
	beerColor: PropTypes.string
}

export default SettingsForm