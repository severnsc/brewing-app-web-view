import React, { Component } from "react"
import PropTypes from "prop-types"
import {
	convertMsToMinutesSecondsString,
	convertMinutesSecondsStringToMs 
} from "../../utils"

class TimerAlertForm extends Component {

	constructor(props){
		super(props)
		this.input = React.createRef()
	}

	state = {
		message: this.props.message
	}

	handleSubmit = e => {
		e.preventDefault()
		const convertedTime = convertMinutesSecondsStringToMs(this.input.current.value)
		this.props.saveTimerAlert(this.props.id, convertedTime, this.state.message)
	}

	handleActivationTimeChange = e => {
		this.setState({ activationTime: e.target.value })
	}

	handleMessageChange = e => {
		this.setState({ message: e.target.value })
	}

	render(){

		const { activationTime } = this.props
		const convertedActivationTime = convertMsToMinutesSecondsString(activationTime)

		return(
			<form onSubmit={this.handleSubmit}>
				<label>Activation time
					<input type="text" defaultValue={convertedActivationTime} ref={this.input} />
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
	id: PropTypes.string.isRequired,
	activationTime: PropTypes.number.isRequired,
	message: PropTypes.string.isRequired,
	saveTimerAlert: PropTypes.func.isRequired
}

export default TimerAlertForm