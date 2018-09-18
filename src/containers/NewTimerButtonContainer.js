import React from "react"
import { Mutation } from "react-apollo"
import { UPDATE_MODAL } from "../mutations"

const NewTimerButtonContainer = ({ style }) => (
	<Mutation mutation={UPDATE_MODAL}>
		{mutation => {

			const newTimer = () => {
				mutation({ variables: {id: null, type: "newTimer"} })
			}

			return (
				<button style={style} onClick={newTimer}>New timer</button>
			)
			
		}}
	</Mutation>
)

export default NewTimerButtonContainer