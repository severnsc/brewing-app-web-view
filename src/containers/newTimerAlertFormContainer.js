import React, { Fragment } from "react"
import { Query, Mutation } from "react-apollo"
import { timersQuery } from "../queries"
import { CREATE_TIMER_ALERT } from "../mutations"
import { NewTimerAlertForm } from "../components"

const NewTimerAlertFormContainer = ({ id }) => (
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

						return(
							<Fragment>
								<h2>{timer.name} alerts</h2>
								<ul>
									{timer.timerAlerts.map(alert => <li key={alert.id}>{alert.message} | {alert.activationTime}</li>)}
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

export default NewTimerAlertFormContainer