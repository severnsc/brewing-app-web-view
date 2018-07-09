import React from "react"
import { Query, Mutation } from "react-apollo"
import { activeTimerQuery } from "../queries"
import {
	START_TIMER,
	STOP_TIMER,
	RESET_TIMER,
	DECREMENT_TIMER
} from "../mutations"
import ActiveTimer from "../components/activeTimer"
import moment from "moment"

const ActiveTimerContainer = () => (
	<Query query={activeTimerQuery}>
		{({loading, error, data, client}) => {

			if(loading) return <p>Loading...</p>
			if(error) return <p>Error...</p>

			const { activeTimerId, currentUser } = data

			let timer
			let time
			if(activeTimerId){
				const timers = currentUser.timers
				timer = timers.find(timer => timer.id === activeTimerId)
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
						const { activeTimerId, currentUser } = cache.readQuery({ query: activeTimerQuery })
						const timers = currentUser.timers
						const newTimers = timers.map(timer => timer.id === startTimer.id ? startTimer : timer)
						const data = {
							activeTimerId,
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
								startTimerMutation({ variables: { id: activeTimerId } })
							}

							return(
								<Mutation 
									mutation={STOP_TIMER}
									update={(cache, { data: { stopTimer } }) => {
										const { activeTimerId, currentUser } = cache.readQuery({ query: activeTimerQuery })
										const timers = currentUser.timers
										const newTimers = timers.map(timer => timer.id === stopTimer.id ? stopTimer : timer)
										const data = {
											activeTimerId,
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
											stopTimerMutation({ variables: { id: activeTimerId } })
										}

										return(
											<Mutation
												mutation={RESET_TIMER}
												update={(cache, { data: { resetTimer } }) => {
													const { activeTimerId, currentUser } = cache.readQuery({ query: activeTimerQuery })
													const timers = currentUser.timers
													const newTimers = timers.map(timer => timer.id === resetTimer.id ? resetTimer : timer)
													const data = {
														activeTimerId,
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
														resetTimerMutation({ variables: { id: activeTimerId} })
													}

													return(
														<Mutation 
															mutation={DECREMENT_TIMER}
															update={(cache, { data: { decrementTimer } }) => {
																const { activeTimerId, currentUser } = cache.readQuery({ query: activeTimerQuery })
																const timers = currentUser.timers
																const newTimers = timers.map(timer => timer.id === decrementTimer.id ? decrementTimer : timer)
																const data = {
																	activeTimerId,
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
																		variables: {id: activeTimerId} 
																	}), timer.intervalDuration)
																}else{
																	if(timeoutId){
																		clearTimeout(timeoutId)
																	}
																}

																return(
																	<div style={{border: "1px solid black"}}>
																		<h2>Active Timer</h2>
																		{timer ? <ActiveTimer time={time} isRunning={timer.isRunning} startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} /> : <p>You don't have any active timers!</p>}
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
	</Query>
)

export default ActiveTimerContainer