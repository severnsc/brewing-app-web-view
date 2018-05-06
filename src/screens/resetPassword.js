import React from 'react'
import ResetPasswordForm from '../components/resetPasswordForm'
import { resetPassword } from '../auth'

const ResetPassword = () => (
  <div>
    <h1>Brewing App</h1>
    <ResetPasswordForm 
      resetPassword={resetPassword} 
      navigate={() => {}} 
    />
  </div>
)

export default ResetPassword