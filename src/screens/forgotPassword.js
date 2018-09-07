import React from 'react'
import { ForgotPasswordForm } from '../components'
import { sendRecoveryEmail } from '../adapters/userAdapter'

const styles = {
	container: {
		background:"linear-gradient(to top left, hsl(167, 90%, 38%), hsl(167, 90%, 90%))",
		flex: "1 1 auto",
		display:"flex",
		justifyContent:"center",
		alignItems: "flex-start",
		padding: "50px 10px 0px"
	}
}

const ForgotPassword = () => (
	<div style={styles.container}>
  	<ForgotPasswordForm 
    	sendRecoveryEmail={sendRecoveryEmail} 
    	navigate={() => {}}
  	/>
  </div>
)

export default ForgotPassword