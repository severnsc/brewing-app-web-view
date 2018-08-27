import React from "react"
import { Query, Mutation } from "react-apollo"
import { activeTimerQuery } from "../queries"
import {
	START_TIMER,
	STOP_TIMER,
	RESET_TIMER,
	ACTIVATE_TIMER_ALERT
} from "../mutations"
import TimerContainer from "./timerContainer"

const ActiveTimerContainer = () => (
	<Query query={activeTimerQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.log(error)
				return <p>Error!</p>
			}

			const { activeTimer } = data

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
																<div style={{border: "1px solid black"}}>
																	<h2>Active Timer</h2>
																	{activeTimer.id ? <TimerContainer id={activeTimer.id} startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} /> : <p>You don't have any active timers!</p>}
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