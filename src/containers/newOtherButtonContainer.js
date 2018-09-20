import React from "react"
import { Mutation } from "react-apollo"
import { UPDATE_MODAL } from "../mutations"
import { Button } from "../components"

const NewOtherButtonContainer = ({ style }) => (
	<Mutation mutation={UPDATE_MODAL}>
		{mutation => {

			const newTimer = () => {
				mutation({ variables: {id: null, type: "newOther"} })
			}
			
			return (
				<Button style={style} onClick={newTimer} value="Add new misc inventory item" />
			)
			
		}}
	</Mutation>
)

export default NewOtherButtonContainer