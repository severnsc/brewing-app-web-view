import React, { Fragment } from "react"
import { Query, Mutation } from "react-apollo"
import { timersQuery } from "../queries"
import {
	CREATE_TIMER_ALERT,
	UPDATE_ACTIVE_TIMER,
	UPDATE_TIMER,
	UPDATE_TIMER_ALERT,
	DELETE_TIMER_ALERT
} from "../mutations"
import { TimerForm } from "../components"
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
													<Mutation
														mutation={CREATE_TIMER_ALERT}
														update={(cache, { data: { createTimerAlert }}) => {
															const { currentUser } = cache.readQuery({query: timersQuery})
															const { timers } = currentUser
															const timer = timers.find(timer => timer.id === id)
															const { timerAlerts } = timer
															const newTimerAlerts = [...timerAlerts, createTimerAlert]
															const data = {
																currentUser: {
																	...currentUser,
																	timers: timers.map(timer => timer.id === id ? {...timer, timerAlerts: newTimerAlerts} : timer)
																}
															}
															cache.writeQuery({query: timersQuery, data})
														}}
													>
														{createTimerAlertMutation => {

															const createTimerAlert = () =>{
																createTimerAlertMutation({ variables: {
																	timerId: id,
																	activationTime: 0,
																	message: ""
																}})
															}

															return(
																<Mutation
																	mutation={DELETE_TIMER_ALERT}
																	update={(cache, { data: { deleteTimerAlert }}) => {
																		const { currentUser } = cache.readQuery({ query: timersQuery })
																		const { timers } = currentUser
																		const timer = timers.find(timer => timer.id === id)
																		const { timerAlerts } = timer
																		const newTimerAlerts = timerAlerts.filter(alert => alert.id !== deleteTimerAlert.id)
																		const data = {
																			currentUser: {
																				...currentUser,
																				timers: timers.map(timer => timer.id === id ? {...timer, timerAlerts: newTimerAlerts} : timer)
																			}
																		}
																		cache.writeQuery({ query: timersQuery, data })
																	}}
																>
																	{deleteTimerAlertMutation => {

																		const deleteTimerAlert = id => {
																			deleteTimerAlertMutation({ variables: { id } })
																		}

																		return(
																			<Fragment>
																				<p>All times are in HH:MM:SS format</p>
																				<button onClick={activateTimer}>Activate timer</button>
																				<TimerForm
																					name={timer.name}
																					duration={timer.duration}
																					timerAlerts={timer.timerAlerts}
																					saveTimer={saveTimer}
																					saveTimerAlert={saveTimerAlert}
																					addTimerAlert={createTimerAlert}
																					deleteTimerAlert={deleteTimerAlert}
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