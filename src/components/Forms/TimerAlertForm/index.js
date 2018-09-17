import React, { Component } from "react"
import PropTypes from "prop-types"
import {
	convertMsToMinutesSecondsString,
	convertMinutesSecondsStringToMs 
} from "../../../utils"
import formStyles from "../styles"
import styles from "./styles"

class TimerAlertForm extends Component {

	constructor(props){
		super(props)
		this.input = React.createRef()
	}

	state = {
		message: this.props.message,
		focus: null
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

	handleFocus = e => {
		this.setState({ focus: e.target.name })
	}

	handleBlur = e => {
		this.setState({ focus: null })
	}

	deleteTimerAlert = e => {
		e.preventDefault()
		this.props.deleteTimerAlert(this.props.id)
	}

	render(){

		const { activationTime } = this.props
		const convertedActivationTime = convertMsToMinutesSecondsString(activationTime)

		let activationTimeLabelStyle = formStyles.label
		let activationTimeInputStyle = formStyles.input
		if(this.state.focus === "activationTime"){
			activationTimeLabelStyle = {...activationTimeLabelStyle, ...formStyles.labelFocus}
			activationTimeInputStyle = {...activationTimeInputStyle, ...formStyles.inputFocus}
		}

		let messageLabelStyle = formStyles.label
		let messageInputStyle = formStyles.input
		if(this.state.focus === "message"){
			messageLabelStyle = {...messageLabelStyle, ...formStyles.labelFocus}
			messageInputStyle = {...messageInputStyle, ...formStyles.inputFocus}
		}

		return(
			<form style={styles.form} onSubmit={this.handleSubmit}>
				<label style={activationTimeLabelStyle}>Activation time
					<input style={activationTimeInputStyle} onFocus={this.handleFocus} onBlur={this.handleBlur} name="activationTime" type="text" defaultValue={convertedActivationTime} ref={this.input} />
				</label>

				<label style={messageLabelStyle}>Message
					<input style={messageInputStyle} onFocus={this.handleFocus} onBlur={this.handleBlur} name="message" type="text" value={this.state.message} onChange={this.handleMessageChange} />
				</label>

				<input style={styles.button} type="submit" value="Save" />
				<button style={formStyles.tertiaryButton} onClick={this.deleteTimerAlert}>Delete</button>
			</form>
		)
	}

}

TimerAlertForm.propTypes = {
	id: PropTypes.string.isRequired,
	activationTime: PropTypes.number.isRequired,
	message: PropTypes.string.isRequired,
	saveTimerAlert: PropTypes.func.isRequired,
	deleteTimerAlert: PropTypes.func.isRequired
}

export default TimerAlertForm