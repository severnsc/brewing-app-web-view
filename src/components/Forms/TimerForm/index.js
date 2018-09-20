import React, { Component, Fragment } from "react"
import { TimerAlertForm, Button } from "../.."
import PropTypes from "prop-types"
import {
	convertMsToMinutesSecondsString,
	convertMinutesSecondsStringToMs 
} from "../../../utils"
import formStyles from "../styles"
import styles from "./styles"

class TimerForm extends Component {

	state = {
		name: this.props.name,
		duration: convertMsToMinutesSecondsString(this.props.duration),
		focus: ""
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

	toggleFocus = e => {
		if(e.type === "focus"){
			this.setState({ focus: e.target.name })
		}

		if(e.type === "blur"){
			this.setState({ focus: "" })
		}
	}

	render(){

		const {
			addTimerAlert,
			saveTimerAlert,
			deleteTimerAlert,
			...rest
		} = this.props

		const { name, duration, focus } = this.state

		const timerAlerts = rest.timerAlerts.map(timerAlert =>(
			<Fragment key={timerAlert.id}>
				<TimerAlertForm id={timerAlert.id} activationTime={timerAlert.activationTime} message={timerAlert.message} saveTimerAlert={saveTimerAlert} deleteTimerAlert={deleteTimerAlert} />
			</Fragment>
		))

		const labelFocusStyle = {...formStyles.label, ...formStyles.labelFocus}
		const inputFocusStyle = {...formStyles.input, ...formStyles.inputFocus}

		return(
			<Fragment>
				<h2 style={styles.title}>Timer Details</h2>
				<form onSubmit={this.handleSubmit}>

					<label style={focus === "name" ? labelFocusStyle : formStyles.label}>Name
						<input style={focus === "name" ? inputFocusStyle : formStyles.input} onFocus={this.toggleFocus} onBlur={this.toggleFocus} name="name" type="text" value={name} onChange={this.handleNameChange} />
					</label>

					<label style={focus === "duration" ? labelFocusStyle : formStyles.label}>Duration
						<input style={focus === "duration" ? inputFocusStyle : formStyles.input} onFocus={this.toggleFocus} onBlur={this.toggleFocus} name="duration" type="text" value={duration} onChange={this.handleDurationChange} />
					</label>

					<input style={styles.button} type="submit" value="Save" />
				</form>

				<h2 style={styles.subHeading}>Alerts</h2>
				{timerAlerts}
				<Button style={styles.button} onClick={addTimerAlert} value="Add timer alert" />
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
	addTimerAlert: PropTypes.func.isRequired,
	deleteTimerAlert: PropTypes.func.isRequired
}

export default TimerForm