import React from "react"
import { NewTimerForm } from "../components"
import { Mutation, Query } from "react-apollo"
import { CREATE_TIMER } from "../mutations"
import { currentUserQuery } from "../queries"

const NewTimerFormContainer = () => (
	<Query query={currentUserQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error) return <p>Error!</p>

			const userId = data.currentUser.id

			return(
				<Mutation mutation={CREATE_TIMER}>
					{mutation => {

						const createTimer = (name, duration, alerts) => {
							const durationInMs = duration * 60 * 1000
							const convertedAlerts = alerts.map(alert => {
								const { activationTime } = alert
								const splitTime = activationTime.split(":").map(time => parseInt(time, 10))
								const convertedTime = splitTime[0] * 60 * 1000 + splitTime[1] * 1000
								return {...alert, activationTime: convertedTime}
							})
							//Need to get userId though a query and add to the mutation
							mutation({ variables: {userId, name, duration: durationInMs, alerts: convertedAlerts, intervalDuration: 1000} })
						}

						return(
							<NewTimerForm handleSubmit={createTimer} />
						)

					}}
				</Mutation>
			)

		}}
	</Query>
)

export default NewTimerFormContainer