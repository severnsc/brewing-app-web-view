import React from 'react'
import SignupForm from '../components/signupForm'
import { isUsernameUnique } from '../adapters/userAdapter'
import { createUser } from '../auth'

const Home = () => (
  <SignupForm 
    isUsernameUnique={isUsernameUnique}
    createUser={createUser}
    navigate={() => {}} 
  />
)

export default Home