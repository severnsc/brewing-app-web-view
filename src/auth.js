import axios from 'axios'

export const sendRecoveryEmail = async username => {
  return axios.post('http://localhost:3001/sendRecoveryEmail', {
    username
  })
    .then(response => response)
    .catch(e => {throw new Error("email send failed!")})
}

export const resetPassword = async password => {
  return axios.post('http://localhost:3001/resetForm', {
    password
  })
    .then(response => response)
    .catch(e => {throw new Error("resetPassword failed!")})
}