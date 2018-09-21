import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import styles from "./styles"
import formStyles from "../styles"
import globalStyles from "../../styles"

class NewTimerForm extends Component {

	state = {
		name: "",
		duration: 0,
		focus: ""
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.handleSubmit(this.state.name, this.state.duration)
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

	render() {

		const labelFocusStyle = {...formStyles.label, ...formStyles.labelFocus}
		const inputFocusStyle = {...formStyles.input, ...formStyles.inputFocus}

		const { name, duration, focus } = this.state

		return(
			<Fragment>
				<h2 style={globalStyles.subHeading}>New Timer</h2>
				<form style={styles.form} onSubmit={this.handleSubmit}>
					
					<label style={focus === "name" ? labelFocusStyle : formStyles.label}>Name
						<input style={focus === "name" ? inputFocusStyle : formStyles.input} name="name" type="text" value={name} onChange={this.handleNameChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
					</label>

					<label style={focus === "duration" ? labelFocusStyle : formStyles.label}>Duration in minutes
						<input style={focus === "duration" ? inputFocusStyle : formStyles.input} name="duration" type="number" value={duration} onChange={this.handleDurationChange} onFocus={this.toggleFocus} onBlur={this.toggleFocus} />
					</label>

					<input style={globalStyles.button} type="submit" value="Create Timer" />

				</form>
			</Fragment>
		)
	}

}

NewTimerForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired
}

export default NewTimerForm