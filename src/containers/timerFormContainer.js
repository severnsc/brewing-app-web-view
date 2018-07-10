import React, { Fragment } from "react"
import { Query, Mutation } from "react-apollo"
import { timersQuery } from "../queries"
import {
	UPDATE_ACTIVE_TIMER,
	UPDATE_TIMER,
	UPDATE_TIMER_ALERT
} from "../mutations"
import TimerForm from "../components/timerForm"
import PropTypes from "prop-types"

const TimerFormContainer = ({ id }) => (
	<Query query={timersQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error) return <p>Error!</p>

			const timers = data.currentUser.timers

			const timer = timers.find(timer => timer.id === id)

			return(
				<Mutation mutation={UPDATE_ACTIVE_TIMER}>
					{activateTimerMutation => {

						const activateTimer = () => {
							activateTimerMutation({ variables: { id } })
						}

						return(
							<Mutation mutation={UPDATE_TIMER}>
								{updateTimer => {

									const saveTimer = (name, duration) => {
										updateTimer({ variables: { id, name, duration: parseInt(duration, 10) } })
									}

									return(
										<Mutation mutation={UPDATE_TIMER_ALERT}>
											{updateTimerAlertMutation => {

												const saveTimerAlert = (id, activationTime, message) => {
													updateTimerAlertMutation({
														variables: {id, activationTime, message}
													})
												}

												return(
													<Fragment>
														<button onClick={activateTimer}>Activate timer</button>
														<TimerForm
															name={timer.name}
															duration={timer.duration}
															timerAlerts={timer.timerAlerts}
															saveTimer={saveTimer}
															saveTimerAlert={saveTimerAlert}
														/>
													</Fragment>
												)
											}}
										</Mutation>
									)

								}}
							</Mutation>
						)
					}}
				</Mutation>
			)

		}}
	</Query>
)

TimerFormContainer.propTypes = {
	id: PropTypes.string.isRequired
}

export default TimerFormContainer