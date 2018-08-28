import React from "react"
import PropTypes from "prop-types"
import { Query } from "react-apollo"
import { timersQuery } from "../queries"
import { convertMsToMinutesSecondsString } from "../utils"

const ActiveTimerAlertsContainer = ({ id }) => (
	<Query query={timersQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { timers } = data.currentUser
			const timer = timers.find(timer => timer.id === id)
			let { timerAlerts } = timer
			const sortedTimerAlerts = timerAlerts.concat().sort((a, b) => {
				if(a.activationTime > b.activationTime){
					return -1
				}

				if(a.activationTime < b.activationTime){
					return 1
				}

				return 0
			})

			return(
				<table>
					<thead>
						<tr>
							<th>Message</th>
							<th>Activation time</th>
							<th>Activated?</th>
						</tr>
					</thead>
					<tbody>
						{sortedTimerAlerts.map(alert => (
							<tr key={alert.id}>
								<td>{alert.message}</td>
								<td>{convertMsToMinutesSecondsString(alert.activationTime)}</td>
								<td>{alert.activated ? "Yes" : "No"}</td>
							</tr>
						))}
					</tbody>
				</table>
			)

		}}
	</Query>
)

ActiveTimerAlertsContainer.propTypes = {
	id: PropTypes.string.isRequired
}

export default ActiveTimerAlertsContainer