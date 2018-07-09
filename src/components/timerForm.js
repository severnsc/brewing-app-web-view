import React, { Component, Fragment } from "react"
import TimerAlertForm from "./timerAlertForm"
import PropTypes from "prop-types"

class TimerForm extends Component {

	state = {
		duration: this.props.duration,
		intervalDuration: this.props.intervalDuration
	}

	handleSubmit = e => {
		e.preventDefault()
	}

	handleDurationChange = e => {
		this.setState({ duration: e.target.value })
	}

	handleIntervalDurationChange = e => {
		this.setState({ intervalDuration: e.target.value })
	}

	render(){

		const timerAlerts = this.props.timerAlerts.map(timerAlert =>
			<TimerAlertForm key={timerAlert.id} activationTime={timerAlert.activationTime} message={timerAlert.message} />
		)

		return(
			<Fragment>
				<h2>Timer</h2>
				<form onSubmit={this.handleSubmit}>
					<label>Duration
						<input name="duration" type="number" value={this.state.duration} onChange={this.handleDurationChange} />
					</label>

					<label>Interval duration
						<input name="intervalDuration" type="number" value={this.state.intervalDuration} onChange={this.handleIntervalDurationChange} />
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
	duration: PropTypes.number.isRequired,
	intervalDuration: PropTypes.number.isRequired,
	timerAlerts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			activationTime: PropTypes.number,
			message: PropTypes.string,
			activated: PropTypes.bool
		})
	).isRequired
}

export default TimerForm