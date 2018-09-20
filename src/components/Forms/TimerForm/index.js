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
		focus: null
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

	handleFocus = e => {
		this.setState({ focus: e.target.name })
	}

	handleBlur = e => {
		this.setState({ focus: null })
	}

	render(){

		const timerAlerts = this.props.timerAlerts.map(timerAlert =>(
			<Fragment key={timerAlert.id}>
				<TimerAlertForm id={timerAlert.id} activationTime={timerAlert.activationTime} message={timerAlert.message} saveTimerAlert={this.props.saveTimerAlert} deleteTimerAlert={this.props.deleteTimerAlert} />
			</Fragment>
		))

		let nameLabelStyle = formStyles.label
		let nameInputStyle = formStyles.input
		if(this.state.focus === "name"){
			nameLabelStyle = {...nameLabelStyle, ...formStyles.labelFocus}
			nameInputStyle = {...nameInputStyle, ...formStyles.inputFocus}
		}

		let durationLabelStyle = formStyles.label
		let durationInputStyle = formStyles.input
		if(this.state.focus === "duration"){
			durationLabelStyle = {...durationLabelStyle, ...formStyles.labelFocus}
			durationInputStyle = {...durationInputStyle, ...formStyles.inputFocus}
		}

		return(
			<Fragment>
				<h2 style={styles.title}>Timer Details</h2>
				<form onSubmit={this.handleSubmit}>

					<label style={nameLabelStyle}>Name
						<input style={nameInputStyle} onFocus={this.handleFocus} onBlur={this.handleBlur} name="name" type="text" value={this.state.name} onChange={this.handleNameChange} />
					</label>

					<label style={durationLabelStyle}>Duration
						<input style={durationInputStyle} onFocus={this.handleFocus} onBlur={this.handleBlur} name="duration" type="text" value={this.state.duration} onChange={this.handleDurationChange} />
					</label>

					<input style={styles.button} type="submit" value="Save" />
				</form>

				<h2 style={styles.subHeading}>Alerts</h2>
				{timerAlerts}
				<Button style={styles.button} onClick={this.props.addTimerAlert} value="Add timer alert" />
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