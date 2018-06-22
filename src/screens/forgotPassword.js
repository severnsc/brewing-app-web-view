import React from 'react'
import ForgotPasswordForm from '../components/forgotPasswordForm'
import { sendRecoveryEmail } from '../adapters/userAdapter'

const ForgotPassword = () => (
  <ForgotPasswordForm 
    sendRecoveryEmail={sendRecoveryEmail} 
    navigate={() => {}}
  />
)

export default ForgotPassword