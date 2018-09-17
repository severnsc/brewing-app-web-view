import React, { Fragment } from "react"
import { Query, Mutation } from "react-apollo"
import { activeTimerQuery } from "../queries"
import {
	START_TIMER,
	STOP_TIMER,
	RESET_TIMER,
	ACTIVATE_TIMER_ALERT,
	UPDATE_ACTIVE_TIMER
} from "../mutations"
import TimerContainer from "./timerContainer"
import ViewActiveTimerAlertsLinkContainer from "./viewActiveTimerAlertsLinkContainer"
import globalStyles from "../components/styles"

const styles = {
	container: {
		border: "1px solid black",
		padding: "10px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		background: "hsl(0, 0%, 90%)",
		borderRadius: "20px"
	},
	deactivate: {
		marginTop: "10px",
		textDecoration: "underline",
    background: "none",
    border: "none",
    cursor: "pointer"
	}
}

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
												const newTimer = {
													...resetTimer,
													timerAlerts: resetTimer.timerAlerts.map(alert => ({...alert, activated: false}))
												}
												const newTimers = timers.map(timer => timer.id === resetTimer.id ? newTimer : timer)
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
																<Mutation mutation={UPDATE_ACTIVE_TIMER}>
																	{updateActiveTimer => {

																		const deactivateTimer = () => {
																			updateActiveTimer({ variables: {id: null} })
																		}

																		let content
																		if(activeTimer.id){
																			content = (
																				<Fragment>
																					<TimerContainer id={activeTimer.id} startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} />
																					<button style={styles.deactivate} onClick={deactivateTimer}>Deactivate timer</button>
																					<br />
																					<ViewActiveTimerAlertsLinkContainer id={activeTimer.id} />
																				</Fragment>
																			)
																		}else{
																			content = <p>You don't have any active timers!</p>
																		}

																		return(
																			<div style={styles.container}>
																				<h2 style={globalStyles.subHeading}>Active Timer</h2>
																				{content}
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