import React from 'react'
import ForgotPasswordForm from '../components/forgotPasswordForm'
import { sendRecoveryEmail } from '../auth'

const ForgotPassword = () => (
  <div>
    <h1>Brewing App</h1>
    <ForgotPasswordForm 
      sendRecoveryEmail={sendRecoveryEmail} 
      navigate={() => {}}
    />
  </div>
)

export default ForgotPassword