import React, { Component } from "react"
import PropTypes from "prop-types"

class InventoryForm extends Component {

	state = {
		name: this.props.name
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.save(this.state.name)
	}

	handleChange = e => {
		this.setState({ name: e.target.value })
	}

	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				<label>Name
					<input type="text" value={this.state.name} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Save" />
			</form>
		)
	}

}

InventoryForm.propTypes = {
	name: PropTypes.string.isRequired,
	save: PropTypes.func.isRequired
}

export default InventoryForm