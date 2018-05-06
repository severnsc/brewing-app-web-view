import axios from 'axios'

export const createUser = async (username, password, email) => {
  return axios.post('http://localhost:3001/signup', {
    username,
    password,
    email
  })
    .then(response => response)
    .catch(e => e)
}

export const loginUser = async (username, password) => {
  return axios.post('http://localhost:3001/login', {
    username,
    password
  })
    .then(response => response)
    .catch(e => e)
}

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