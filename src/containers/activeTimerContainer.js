import React from "react"
import { Query, Mutation, Subscription } from "react-apollo"
import { activeTimerQuery } from "../queries"
import {
	START_TIMER,
	STOP_TIMER,
	RESET_TIMER,
	ACTIVATE_TIMER_ALERT
} from "../mutations"
import { timerUpdated } from "../subscriptions"
import { ActiveTimer } from "../components"
import { convertMsToMinutesSecondsString } from "../utils"
import moment from "moment"

const ActiveTimerContainer = () => (
	<Query query={activeTimerQuery}>
		{({loading, error, data, client}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.log(error)
				return <p>Error!</p>
			}

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
																<Subscription subscription={timerUpdated}>
																	{({ data, loading}) => {

																		if(data){
																			const { remainingDuration } = data.timerUpdated
																			time = convertMsToMinutesSecondsString(remainingDuration)
																		}

																		return(
																			<div style={{border: "1px solid black"}}>
																				<h2>Active Timer</h2>
																				{timer ? <ActiveTimer name={timer.name} time={time} isRunning={timer.isRunning} startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} /> : <p>You don't have any active timers!</p>}
																			</div>
																		)
																	}}
																</Subscription>
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