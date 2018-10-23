import React from "react"
import { SettingsForm } from "../components"
import { Mutation } from "react-apollo"

const UpdateSettingsFormContainer = () => (
	<Mutation>
		{mutation => {

			return(
				<SettingsForm onSubmit={() => {}} />
			)

		}}
	</Mutation>
)

export default UpdateSettingsFormContainer