import React from 'react'
import ResetPasswordForm from '../components/resetPasswordForm'
import { resetPassword } from '../auth'

const ResetPassword = () => (
  <ResetPasswordForm 
    resetPassword={resetPassword} 
    navigate={() => {}} 
  />
)

export default ResetPassword