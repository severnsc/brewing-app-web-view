import React, { Component } from "react"
import PropTypes from "prop-types"
import { Button } from "../.."
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
		focus: ""
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

	toggleFocus = e => {
		if(e.type === "focus"){
			this.setState({ focus: e.target.name })
		}

		if(e.type === "blur"){
			this.setState({ focus: "" })
		}
	}

	deleteTimerAlert = e => {
		e.preventDefault()
		this.props.deleteTimerAlert(this.props.id)
	}

	render(){

		const { message, focus } = this.state
		const { activationTime } = this.props
		const convertedActivationTime = convertMsToMinutesSecondsString(activationTime)

		const labelFocusStyle = {...formStyles.label, ...formStyles.labelFocus}
		const inputFocusStyle = {...formStyles.input, ...formStyles.inputFocus}

		return(
			<form style={styles.form} onSubmit={this.handleSubmit}>
				<label style={focus === "activationTime" ? labelFocusStyle : formStyles.label}>Activation time
					<input style={focus === "activationTime" ? inputFocusStyle : formStyles.input} onFocus={this.toggleFocus} onBlur={this.toggleFocus} name="activationTime" type="text" defaultValue={convertedActivationTime} ref={this.input} />
				</label>

				<label style={focus === "message" ? labelFocusStyle : formStyles.label}>Message
					<input style={focus === "message" ? inputFocusStyle : formStyles.input} onFocus={this.toggleFocus} onBlur={this.toggleFocus} name="message" type="text" value={message} onChange={this.handleMessageChange} />
				</label>

				<input style={styles.button} type="submit" value="Save" />
				<Button style={formStyles.tertiaryButton} onClick={this.deleteTimerAlert} value="Delete" />
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