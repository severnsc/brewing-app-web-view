import React from "react"
import { Mutation } from "react-apollo"
import { UPDATE_MODAL } from "../mutations"
import { Button } from "../components"

const NewTimerButtonContainer = ({ style }) => (
	<Mutation mutation={UPDATE_MODAL}>
		{mutation => {

			const newTimer = () => {
				mutation({ variables: {id: null, type: "newTimer"} })
			}
			
			return (
				<Button style={style} onClick={newTimer} value="New timer" />
			)
			
		}}
	</Mutation>
)

export default NewTimerButtonContainer