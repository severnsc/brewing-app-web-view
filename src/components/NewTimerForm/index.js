import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import shortid from "shortid"

class NewTimerForm extends Component {

	state = {
		name: "",
		duration: 0,
		alerts: [{id: shortid.generate(), activationTime: "", message: ""}]
	}

	addAlert = e => {
		e.preventDefault()
		this.setState((prevState, props) => ({
			alerts: [...prevState.alerts, {id: shortid.generate(), activationTime: "", message: ""}]
		}))
	}

	deleteAlert = (e, id) => {
		e.preventDefault()
		e.persist()
		this.setState((prevState, props) => ({
			alerts: prevState.alerts.filter(alert => alert.id !== id)
		}))
	}

	handleSubmit = e => {
		e.preventDefault()
		this.props.handleSubmit(this.state.name, this.state.duration, this.state.alerts)
	}

	handleNameChange = e => {
		this.setState({ name: e.target.value })
	}

	handleDurationChange = e => {
		this.setState({ duration: e.target.value })
	}

	handleAlertActivationTimeChange = e => {
		e.persist()
		this.setState((prevState, props) => ({
			alerts: prevState.alerts.map(alert => alert.id === e.target.id ? {...alert, activationTime: e.target.value} : alert)
		}))
	}

	handleAlertMessageChange = e => {
		e.persist()
		this.setState((prevState, props) => ({
			alerts: prevState.alerts.map(alert => alert.id === e.target.id ? {...alert, message: e.target.value} : alert)
		}))
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

					<label style={{display: "block"}}>Alerts

						{this.state.alerts.map((alert, i) => (
							<Fragment key={alert.id}>
								<h3>Alert {i+1}</h3>
								<span style={{display: "block"}}>When should this alert be sent? Format is Minutes:Seconds</span>
								<input id={alert.id} type="text" value={alert.activationTime} onChange={this.handleAlertActivationTimeChange} />

								<span style={{display: "block"}}>Alert message</span>
								<input id={alert.id} type="text" value={alert.message} onChange={this.handleAlertMessageChange} />

								<button onClick={e => this.deleteAlert(e, alert.id)}>Delete alert</button>
							</Fragment>

						))}

						<button onClick={this.addAlert} style={{display: "block"}}>Add alert</button>
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