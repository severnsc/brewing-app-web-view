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
				<Mutation mutation={CREATE_TIMER_ALERT}>
					{mutation => {

						const createTimeralert = (activationTime, message) => {
							const splitTime = activationTime.split(":")
							const convertedTime = splitTime[0] * 60 * 1000 + splitTime[1] * 1000
							mutation({ variables: {timerId: timer.id, activationTime: convertedTime, message} })
						}

						return(
							<Fragment>
								<h2>{timer.name} alerts</h2>
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