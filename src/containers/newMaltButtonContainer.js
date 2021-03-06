import React from "react"
import { Mutation } from "react-apollo"
import { UPDATE_MODAL } from "../mutations"
import { Button } from "../components"

const NewMaltButtonContainer = ({ style }) => (
	<Mutation mutation={UPDATE_MODAL}>
		{mutation => {

			const newTimer = () => {
				mutation({ variables: {id: null, type: "newMalt"} })
			}
			
			return (
				<Button style={style} onClick={newTimer} value="Add new malt" />
			)
			
		}}
	</Mutation>
)

export default NewMaltButtonContainer