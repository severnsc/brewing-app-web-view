import React, { Component, Fragment } from "react"
import { TimerAlertForm } from ".."
import PropTypes from "prop-types"
import {
	convertMsToMinutesSecondsString,
	convertMinutesSecondsStringToMs 
} from "../../utils"

class TimerForm extends Component {

	state = {
		name: this.props.name,
		duration: convertMsToMinutesSecondsString(this.props.duration)
	}

	handleSubmit = e => {
		e.preventDefault()
		const duration = convertMinutesSecondsStringToMs(this.state.duration)
		this.props.saveTimer(this.state.name, duration)
	}

	handleNameChange = e => {
		this.setState({ name: e.target.value })
	}

	handleDurationChange = e => {
		this.setState({ duration: e.target.value })
	}

	addTimerAlert = () => {
		this.props.addTimerAlert()
	}

	render(){

		const timerAlerts = this.props.timerAlerts.map(timerAlert =>
			<TimerAlertForm key={timerAlert.id} id={timerAlert.id} activationTime={timerAlert.activationTime} message={timerAlert.message} saveTimerAlert={this.props.saveTimerAlert} />
		)

		console.log(this.state.duration)

		return(
			<Fragment>
				<h2>Timer</h2>
				<form onSubmit={this.handleSubmit}>

					<label>Name
						<input name="name" type="text" value={this.state.name} onChange={this.handleNameChange} />
					</label>

					<label>Duration
						<input name="duration" type="text" value={this.state.duration} onChange={this.handleDurationChange} />
					</label>

					<input type="submit" value="Save" />
				</form>

				<h2>Alerts</h2>
				{timerAlerts}
				<button onClick={this.addTimerAlert}>Add timer alert</button>
			</Fragment>
		)

	}

}

TimerForm.propTypes = {
	name: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired,
	timerAlerts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			activationTime: PropTypes.number,
			message: PropTypes.string,
			activated: PropTypes.bool
		})
	).isRequired,
	saveTimer: PropTypes.func.isRequired,
	saveTimerAlert: PropTypes.func.isRequired,
	addTimerAlert: PropTypes.func.isRequired
}

export default TimerForm