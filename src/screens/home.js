import React from 'react'
import SignupForm from '../components/signupForm'
import { isUsernameUnique } from '../adapters/userAdapter'
import { createUser } from '../auth'

const Home = () => (
  <div>
    <h1>Brewing App</h1>
    <SignupForm 
      isUsernameUnique={isUsernameUnique}
      createUser={createUser}
      navigate={() => {}} 
    />
  </div>
)

export default Home