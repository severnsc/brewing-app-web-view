import React from "react"
import { Mutation } from "react-apollo"
import { UPDATE_FLASH } from "../mutations"
import { ForgotPasswordForm } from '../components'
import { sendRecoveryEmail } from '../adapters/userAdapter'

const ForgotPasswordContainer = ({ history }) => (
	<Mutation mutation={UPDATE_FLASH}>
		{updateFlash => {

			const updateFlashFunc = () => {
				updateFlash({ variables: { message: "Check your email to reset your password" } })
					.then(() => sendRecoveryEmail())
			}

			return(
				<ForgotPasswordForm
					sendRecoveryEmail={updateFlashFunc} 
    			navigate={() => history.push("/")}
				/>
			)

		}}
	</Mutation>
)

export default ForgotPasswordContainer