import axios from 'axios'

export const createUser = (username, password) => {
  return axios.post('http://localhost:3001/signup', {
    username,
    password
  })
    .then(response => response)
    .catch(e => e)
}