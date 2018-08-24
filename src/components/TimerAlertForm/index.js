import React, { Component } from "react"
import PropTypes from "prop-types"

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
		const splitTime = this.input.current.value.split(":")
		const convertedTime = splitTime[0] * 60 * 1000 + splitTime[1] * 1000
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
		const minutes = Math.floor(activationTime/60000)
		let seconds = (activationTime/60000 - minutes)*60
		if(seconds < 10) seconds = "0" + seconds
		const convertedActivationTime = `${minutes}:${seconds}`

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