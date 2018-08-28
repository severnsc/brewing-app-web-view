import React from "react"
import PropTypes from "prop-types"
import { Mutation } from "react-apollo"
import { UPDATE_MODAL } from "../mutations"

const ViewActiveTimerAlertsLinkContainer = ({ id }) => (
	<Mutation mutation={UPDATE_MODAL}>
		{updateModalMutation => {

			const updateModal = () => {
				updateModalMutation({ variables: { id, type: "activeTimerAlerts" } })
			}

			const style = {textDecoration: "underline", cursor: "pointer"}

			return(
				<span style={style} onClick={updateModal}>View all alerts for this timer</span>
			)

		}}
	</Mutation>
)

ViewActiveTimerAlertsLinkContainer.propTypes = {
	id: PropTypes.string.isRequired
}

export default ViewActiveTimerAlertsLinkContainer