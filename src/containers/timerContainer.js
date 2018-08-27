import React from "react"
import PropTypes from "prop-types"
import { Timer } from "../components"
import { Query } from "react-apollo"
import { timersQuery } from "../queries"
import { convertMsToMinutesSecondsString } from "../utils"

const TimerContainer = ({ id, startTimer, stopTimer, resetTimer }) => (
	<Query query={timersQuery}>
		{({loading, error, data, startPolling, stopPolling}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { timers } = data.currentUser
			const timer = timers.find(timer => timer.id === id)
			const time = convertMsToMinutesSecondsString(timer.remainingDuration)

			const { timerAlerts } = timer
			let unActivatedTimerAlerts = timerAlerts.filter(alert => !alert.activated)
			let nextAlert = null
			let nextAlertMessage = null
			let nextAlertActivationTime = null
			if(unActivatedTimerAlerts.length > 0){
				unActivatedTimerAlerts.sort((a,b) => {
					if(a.activationTime < b.activationTime){
						return 1
					}

					if(a.activationTime > b.activationTime){
						return -1
					}

					return 0
				})

				nextAlert = unActivatedTimerAlerts[0]
				nextAlertMessage = nextAlert.message
				nextAlertActivationTime = convertMsToMinutesSecondsString(nextAlert.activationTime)
			}

			const startTimerFunc = () => {
				startTimer()
				startPolling(1000)
			}

			const stopTimerFunc = () => {
				stopTimer()
				stopPolling()
			}

			return(
				<Timer
					name={timer.name}
					time={time}
					isRunning={timer.isRunning}
					startTimer={startTimerFunc}
					stopTimer={stopTimerFunc}
					resetTimer={resetTimer}
					nextAlertMessage={nextAlertMessage}
					nextAlertActivationTime={nextAlertActivationTime}
				/>
			)

		}}
	</Query>
)

TimerContainer.propTypes = {
	id: PropTypes.string.isRequired,
	startTimer: PropTypes.func.isRequired,
	stopTimer: PropTypes.func.isRequired,
	resetTimer: PropTypes.func.isRequired
}

export default TimerContainer