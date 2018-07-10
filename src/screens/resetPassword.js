import React from 'react'
import { ResetPasswordForm } from '../components'
import { resetPassword } from '../adapters/userAdapter'

const ResetPassword = () => (
  <ResetPasswordForm 
    resetPassword={resetPassword} 
    navigate={() => {}} 
  />
)

export default ResetPassword