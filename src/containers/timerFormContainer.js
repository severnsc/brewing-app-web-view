import React, { Fragment } from "react"
import { Query, Mutation } from "react-apollo"
import { timersQuery } from "../queries"
import { UPDATE_ACTIVE_TIMER } from "../mutations"
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
							<Fragment>
								<button onClick={activateTimer}>Activate timer</button>
								<TimerForm
									duration={timer.duration}
									intervalDuration={timer.intervalDuration}
									timerAlerts={timer.timerAlerts}
								/>
							</Fragment>
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