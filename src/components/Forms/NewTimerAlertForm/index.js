import React, { Component } from "react"
import PropTypes from "prop-types"
import styles from "./styles"
import formStyles from "../styles"
import globalStyles from "../../styles"

class NewTimerAlertForm extends Component {

	state = {
		activationTime: "",
		message: "",
		focus: ""
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

	toggleFocus = e => {
		if(e.type === "focus"){
			this.setState({ focus: e.target.name })
		}

		if(e.type === "blur"){
			this.setState({ focus: "" })
		}
	}

	render(){
	
		const labelFocusStyle = {...formStyles.label, ...formStyles.labelFocus}
		const inputFocusStyle = {...formStyles.input, ...formStyles.inputFocus}

		const { activationTime, message, focus } = this.state

		return(
			<form style={styles.form} onSubmit={this.handleSubmit}>

				<label style={focus === "activationTime" ? labelFocusStyle : formStyles.label}>Activation time
					<span style={styles.helperText}>This is the time that the alert should be sent to you. The format is Hours:Minutes:Seconds</span>
					<input style={focus === "activationTime" ? inputFocusStyle : formStyles.input} name="activationTime" type="text" value={activationTime} onChange={this.handleActivationTimeChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>

				<label style={focus === "message" ? labelFocusStyle : formStyles.label}>Message
					<input style={focus === "message" ? inputFocusStyle : formStyles.input} name="message" type="text" value={message} onChange={this.handleMessageChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
				</label>

				<input style={globalStyles.button} type="submit" value="Create alert" />
			</form>
		)

	}

}

NewTimerAlertForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired
}

export default NewTimerAlertForm