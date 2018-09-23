import axios from 'axios'

axios.defaults.withCredentials = true

export const validateUsername = async username => {
  return axios.post('https://brewing-app-api.herokuapp.com/isUsernameUnique', {
    username: username
  }).then(response => response.data)
}

export const createUser = async (username, password, email) => {
  return axios.post('https://brewing-app-api.herokuapp.com/signup', {
    username,
    password,
    email
  })
    .then(response => response.status === 200 ? true : false)
    .catch(e => false)
}

export const loginUser = async (username, password) => {
  return axios.post('https://brewing-app-api.herokuapp.com/login', {
    username,
    password
  },
  {withCredentials: true}
  )
    .then(response => {
      console.log(response)
      return response.data === "OK" ? true : false
    })
    .catch(e => e)
}

export const logoutUser = async () => {
  return axios.get("https://brewing-app-api.herokuapp.com/logout")
    .then(res => res)
    .catch(e => e)
}

export const sendRecoveryEmail = async username => {
  return axios.post('https://brewing-app-api.herokuapp.com/sendRecoveryEmail', {
    username
  })
    .then(response => response)
    .catch(e => {throw new Error("email send failed!")})
}

export const resetPassword = async password => {
  return axios.post('https://brewing-app-api.herokuapp.com/resetForm', {
    password
  })
    .then(response => response)
    .catch(e => {throw new Error("resetPassword failed!")})
}