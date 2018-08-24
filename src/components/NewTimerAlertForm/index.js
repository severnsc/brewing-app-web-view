import React, { Component } from "react"
import PropTypes from "prop-types"

class NewTimerAlertForm extends Component {

	state = {
		activationTime: "",
		message: ""
	}

	handleActivationTimeChange = e => {
		this.setState({ activationTime: e.target.value})
	}

	handleMessageChange = e => {
		this.setState({ message: e.target.value })
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.handleSubmit(this.state.activationTime, this.state.message)
		this.setState({
			activationTime: "",
			message: ""
		})
	}

	render(){
	
		return(
			<form onSubmit={this.handleSubmit}>

				<label>Activation time
					<span>This is the time that the alert should be sent to you. The format is Hours:Minutes:Seconds</span>
					<input name="activationTime" type="text" value={this.state.activationTime} onChange={this.handleActivationTimeChange} />
				</label>

				<label>Message
					<input name="message" type="text" value={this.state.message} onChange={this.handleMessageChange} />
				</label>

				<input type="submit" value="Create alert" />
			</form>
		)

	}

}

NewTimerAlertForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired
}

export default NewTimerAlertForm