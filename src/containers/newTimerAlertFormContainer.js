import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { Query, Mutation } from "react-apollo"
import { timersQuery } from "../queries"
import { CREATE_TIMER_ALERT, DELETE_TIMER_ALERT } from "../mutations"
import { NewTimerAlertForm } from "../components"
import TimerAlertFormContainer from "./common/timerAlertFormContainer"
import DeleteButtonContainer from "./common/deleteButtonContainer"
import {
	convertMsToMinutesSecondsString,
	convertMinutesSecondsStringToMs
} from "../utils"

class NewTimerAlertFormContainer extends Component {

	state = {
		editingId: ""
	}

	setEditingId = id => {
		this.setState({ editingId: id })
	}

	render(){

		const { id } = this.props

		return(
			<Query query={timersQuery}>
				{({loading, error, data}) => {

					if(loading) return <p>Loading...</p>
					if(error){
						console.log(error)
						return <p>Error!</p>
					}

					const { timers } = data.currentUser
					const timer = timers.find(timer => timer.id === id)

					return (
						<Mutation 
							mutation={CREATE_TIMER_ALERT}
							update={(cache, { data: { createTimerAlert } }) => {
								const { currentUser } = cache.readQuery({ query: timersQuery })
								cache.writeQuery({
									query: timersQuery,
									data: {
										currentUser:{
											...currentUser,
											timers: timers.map(timer => timer.id === id ? {...timer, timerAlerts: [...timer.timerAlerts, createTimerAlert]} : timer)
										}
									}
								})						
							}}
						>
							{mutation => {

								const createTimeralert = (activationTime, message) => {
									const convertedTime = convertMinutesSecondsStringToMs(activationTime)
									mutation({ variables: {timerId: timer.id, activationTime: convertedTime, message} })
								}

								const saveTimerAlert = (id, activationTime, message) => {
									this.setState({ editingId: "" })
								}

								const { editingId } = this.state

								const alerts = timer.timerAlerts.map(alert => {
									if(alert.id === editingId){
										return(
											<TimerAlertFormContainer key={alert.id} id={alert.id} activationTime={alert.activationTime} message={alert.message} saveTimerAlert={saveTimerAlert} />
										)
									}else{
										return(
											<Fragment key={alert.id}>
												<li>{alert.message} | {convertMsToMinutesSecondsString(alert.activationTime)}</li>
												<button onClick={() => this.setEditingId(alert.id)}>Edit</button>
												<DeleteButtonContainer id={alert.id} mutation={DELETE_TIMER_ALERT} refetchQuery={timersQuery} />
											</Fragment>	
										)
									}
								})

								return(
									<Fragment>
										<h2>{timer.name} alerts</h2>
										<ul>
											{alerts}
										</ul>
										<NewTimerAlertForm handleSubmit={createTimeralert} />
									</Fragment>
								)

							}}
						</Mutation>
					)

				}}
			</Query>
		)
	}
	
}

NewTimerAlertFormContainer.propTypes = {
	id: PropTypes.string.isRequired
}

export default NewTimerAlertFormContainer