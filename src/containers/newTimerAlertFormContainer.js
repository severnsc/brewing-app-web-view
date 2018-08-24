import React, { Component, Fragment } from "react"
import { Query, Mutation } from "react-apollo"
import { timersQuery } from "../queries"
import { CREATE_TIMER_ALERT, DELETE_TIMER_ALERT } from "../mutations"
import { NewTimerAlertForm } from "../components"
import TimerAlertFormContainer from "./common/timerAlertFormContainer"
import DeleteButtonContainer from "./common/deleteButtonContainer"

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
									const splitTime = activationTime.split(":")
									const convertedTime = splitTime[0] * 60 * 1000 + splitTime[1] * 1000
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
												<li>{alert.message} | {alert.activationTime}</li>
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

export default NewTimerAlertFormContainer