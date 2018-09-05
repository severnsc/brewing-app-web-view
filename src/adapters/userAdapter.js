import axios from 'axios'

axios.defaults.withCredentials = true

export const validateUsername = async username => {
  return axios.post('http://localhost:3001/isUsernameUnique', {
    username: username
  }).then(response => response.data)
}

export const createUser = async (username, password, email) => {
  return axios.post('http://localhost:3001/signup', {
    username,
    password,
    email
  })
    .then(response => response.status === 200 ? true : false)
    .catch(e => false)
}

export const loginUser = async (username, password) => {
  return axios.post('http://localhost:3001/login', {
    username,
    password
  },
  {withCredentials: true}
  )
    .then(response => response.status === 200 ? true : false)
    .catch(e => e)
}

export const logoutUser = async () => {
  return axios.get("http://localhost:3001/logout")
    .then(res => res)
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