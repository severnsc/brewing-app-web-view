import axios from 'axios'

axios.defaults.withCredentials = true

export const isUsernameUnique = async username => {
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
    .then(response => {
      console.log(response)
      return response.status === 200 ? true : false
    })
    .catch(e => false)
}

export const loginUser = async (username, password) => {
  return axios.post('http://localhost:3001/login', {
    username,
    password
  },
  {withCredentials: true}
  )
    .then(response => response)
    .catch(e => e)
}