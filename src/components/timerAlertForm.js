import React, { Component } from "react"
import PropTypes from "prop-types"

class TimerAlertForm extends Component {

	state = {
		activationTime: this.props.activationTime,
		message: this.props.message
	}

	handleSubmit = e => {
		e.preventDefault()
	}

	handleActivationTimeChange = e => {
		this.setState({ activationTime: e.target.value })
	}

	handleMessageChange = e => {
		this.setState({ message: e.target.value })
	}

	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				<label>Activation time
					<input type="number" value={this.state.activationTime} onChange={this.handleActivationTimeChange} />
				</label>

				<label>Message
					<input type="text" value={this.state.message} onChange={this.handleMessageChange} />
				</label>

				<input type="submit" value="Save" />
			</form>
		)
	}

}

TimerAlertForm.propTypes = {
	activationTime: PropTypes.number.isRequired,
	message: PropTypes.string.isRequired
}

export default TimerAlertForm