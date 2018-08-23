import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"

class NewTimerForm extends Component {

	state = {
		name: "",
		duration: 0
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

	render() {
		return(
			<Fragment>
				<h2>New Timer</h2>
				<form onSubmit={this.handleSubmit}>
					
					<label style={{display: "block"}}>Name
						<input name="name" type="text" value={this.state.name} onChange={this.handleNameChange} />
					</label>

					<label style={{display: "block"}}>Duration in minutes
						<input name="duration" type="number" value={this.state.duration} onChange={this.handleDurationChange} />
					</label>

					<input type="submit" value="Create Timer" />

				</form>
			</Fragment>
		)
	}

}

NewTimerForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired
}

export default NewTimerForm