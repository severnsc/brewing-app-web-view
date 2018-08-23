import React from "react"
import { FixedNewItemButton } from "../components"
import { Mutation } from "react-apollo"
import { UPDATE_MODAL } from "../mutations"

const FixedNewTimerButtonContainer = () => (
	<Mutation mutation={UPDATE_MODAL}>
		{mutation => {

			const newTimer = () => {
				mutation({ variables: {id: null, type: "newTimer"} })
			}

			return (
				<FixedNewItemButton onClick={newTimer} />
			)
			
		}}
	</Mutation>
)

export default FixedNewTimerButtonContainer