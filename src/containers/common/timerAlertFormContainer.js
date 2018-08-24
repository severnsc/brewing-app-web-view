import React from "react"
import PropTypes from "prop-types"
import { TimerAlertForm } from "../../components"
import { Mutation } from "react-apollo"
import { UPDATE_TIMER_ALERT } from "../../mutations"

const TimerAlertFormContainer = ({ id, activationTime, message, saveTimerAlert }) => (
	<Mutation mutation={UPDATE_TIMER_ALERT}>
		{mutation => {

			const save = (id, activationTime, message) => {
				saveTimerAlert(id, activationTime, message)
				mutation({ 
					variables: { id, activationTime, message },
					optimisitcResponse: {
						__typename:"Mutation",
						updateTimerAlert: {
							__typename: "TimerAlert",
							id,
							activationTime,
							message
						}
					}
				})
			}

			return(
				<TimerAlertForm id={id} activationTime={activationTime} message={message} saveTimerAlert={save} />
			)

		}}
	</Mutation>
)

TimerAlertFormContainer.propTypes = {
	id: PropTypes.string.isRequired,
	activationTime: PropTypes.number.isRequired,
	message: PropTypes.string.isRequired,
	saveTimerAlert: PropTypes.func.isRequired
}

export default TimerAlertFormContainer