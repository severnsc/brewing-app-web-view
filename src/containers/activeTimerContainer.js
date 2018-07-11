import React from "react"
import { Query, Mutation } from "react-apollo"
import { activeTimerQuery } from "../queries"
import {
	START_TIMER,
	STOP_TIMER,
	RESET_TIMER,
	DECREMENT_TIMER,
	ACTIVATE_TIMER_ALERT
} from "../mutations"
import { ActiveTimer } from "../components"
import moment from "moment"

const ActiveTimerContainer = () => (
	<Query query={activeTimerQuery}>
		{({loading, error, data, client}) => {

			if(loading) return <p>Loading...</p>
			if(error) return <p>Error...</p>

			const { activeTimer, currentUser } = data

			let timer
			let time
			if(activeTimer.id){
				const timers = currentUser.timers
				timer = timers.find(timer => timer.id === activeTimer.id)
				const tempTime = moment.duration(timer.remainingDuration)
				time = `${tempTime.minutes()}:${tempTime.seconds()}`
				time = tempTime.seconds() < 10 ? (time + "0") : time
				time = tempTime.minutes() < 10 ? ("0" + time) : time
				time = tempTime.hours() ? (tempTime.hours() + ":" + time) : time
			}

			return(
				<Mutation 
					mutation={START_TIMER}
					update={(cache, { data: { startTimer } }) => {
						const { activeTimer, currentUser } = cache.readQuery({ query: activeTimerQuery })
						const timers = currentUser.timers
						const newTimers = timers.map(timer => timer.id === startTimer.id ? startTimer : timer)
						const data = {
							activeTimer,
							currentUser: {
								...currentUser,
								timers: newTimers
							}
						}
						cache.writeQuery({ query: activeTimerQuery, data })
					}}
				>
					{startTimerMutation => {

							const startTimer = () => {
								startTimerMutation({ variables: { id: activeTimer.id } })
							}

							return(
								<Mutation 
									mutation={STOP_TIMER}
									update={(cache, { data: { stopTimer } }) => {
										const { activeTimer, currentUser } = cache.readQuery({ query: activeTimerQuery })
										const timers = currentUser.timers
										const newTimers = timers.map(timer => timer.id === stopTimer.id ? stopTimer : timer)
										const data = {
											activeTimer,
											currentUser: {
												...currentUser,
												timers: newTimers
											}
										}
										cache.writeQuery({ query: activeTimerQuery, data })
									}}
								>
									{stopTimerMutation => {

										const stopTimer = () => {
											stopTimerMutation({ variables: { id: activeTimer.id } })
										}

										return(
											<Mutation
												mutation={RESET_TIMER}
												update={(cache, { data: { resetTimer } }) => {
													const { activeTimer, currentUser } = cache.readQuery({ query: activeTimerQuery })
													const timers = currentUser.timers
													const newTimers = timers.map(timer => timer.id === resetTimer.id ? resetTimer : timer)
													const data = {
														activeTimer,
														currentUser: {
															...currentUser,
															timers: newTimers
														}
													}
													cache.writeQuery({ query: activeTimerQuery, data })
												}}
											>
												{resetTimerMutation => {

													const resetTimer = () => {
														resetTimerMutation({ variables: { id: activeTimer.id} })
													}

													return(
														<Mutation mutation={ACTIVATE_TIMER_ALERT}>
															{activateTimerAlertMutation => {
																return(
																	<Mutation 
																		mutation={DECREMENT_TIMER}
																		update={(cache, { data: { decrementTimer } }) => {
																			const { activeTimer, currentUser } = cache.readQuery({ query: activeTimerQuery })
																			const timers = currentUser.timers
																			const currentTimer = timers.find(timer => timer.id === activeTimer.id)
																			const alertsToActivate = currentTimer.timerAlerts.filter(alert => alert.activationTime === currentTimer.remainingDuration)
																			if(alertsToActivate.length) alertsToActivate.forEach(alert => activateTimerAlertMutation({ variables: { id: alert.id } }))
																			const newTimers = timers.map(timer => timer.id === decrementTimer.id ? decrementTimer : timer)
																			const data = {
																				activeTimer,
																				currentUser: {
																					...currentUser,
																					timers: newTimers
																				}
																			}
																			cache.writeQuery({ query: activeTimerQuery, data })
																		}}
																	>
																		{decrementTimerMutation => {

																			let timeoutId
																			if(timer && timer.isRunning){ 
																				timeoutId = setTimeout(() => decrementTimerMutation({ 
																					variables: {id: activeTimer.id} 
																				}), timer.intervalDuration)
																			}else{
																				if(timeoutId){
																					clearTimeout(timeoutId)
																				}
																			}

																			return(
																				<div style={{border: "1px solid black"}}>
																					<h2>Active Timer</h2>
																					{timer ? <ActiveTimer name={timer.name} time={time} isRunning={timer.isRunning} startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} /> : <p>You don't have any active timers!</p>}
																				</div>
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

export default ActiveTimerContainer