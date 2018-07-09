import React from "react"
import { Query } from "react-apollo"
import { activeTimerQuery } from "../queries"
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

			const startTimer = () => console.log("timer started!")
			const stopTimer = () => console.log("timer stopped!")
			const resetTimer = () => console.log("timer reset!")

			return(
				<div style={{border: "1px solid black"}}>
					<h2>Active Timer</h2>
					{timer ? <ActiveTimer time={time} isRunning={timer.isRunning} startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} /> : <p>You don't have any active timers!</p>}
				</div>
			)
		}}
	</Query>
)

export default ActiveTimerContainer