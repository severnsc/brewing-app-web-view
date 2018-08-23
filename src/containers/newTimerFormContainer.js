import React from "react"
import { NewTimerForm } from "../components"
import { Mutation } from "react-apollo"
import { CREATE_TIMER } from "../mutations"

const NewTimerFormContainer = () => (
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
				mutation({ variables: {name, duration: durationInMs, alerts: convertedAlerts, intervalDuration: 1000} })
			}

			return(
				<NewTimerForm handleSubmit={createTimer} />
			)

		}}
	</Mutation>
)

export default NewTimerFormContainer