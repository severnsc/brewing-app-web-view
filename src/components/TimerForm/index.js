import React, { Component, Fragment } from "react"
import { TimerAlertForm } from ".."
import PropTypes from "prop-types"

class TimerForm extends Component {

	state = {
		name: this.props.name,
		duration: this.props.duration
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.saveTimer(this.state.name, this.state.duration)
	}

	handleNameChange = e => {
		this.setState({ name: e.target.value })
	}

	handleDurationChange = e => {
		this.setState({ duration: e.target.value })
	}

	render(){

		const timerAlerts = this.props.timerAlerts.map(timerAlert =>
			<TimerAlertForm key={timerAlert.id} id={timerAlert.id} activationTime={timerAlert.activationTime} message={timerAlert.message} saveTimerAlert={this.props.saveTimerAlert} />
		)

		return(
			<Fragment>
				<h2>Timer</h2>
				<form onSubmit={this.handleSubmit}>

					<label>Name
						<input name="name" type="text" value={this.state.name} onChange={this.handleNameChange} />
					</label>

					<label>Duration
						<input name="duration" type="number" value={this.state.duration} onChange={this.handleDurationChange} />
					</label>

					<input type="submit" value="Save" />
				</form>

				<h2>Alerts</h2>
				{timerAlerts}
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
	saveTimerAlert: PropTypes.func.isRequired
}

export default TimerForm