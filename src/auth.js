import axios from 'axios'

export const createUser = (username, password, email) => {
  return axios.post('http://localhost:3001/signup', {
    username,
    password,
    email
  })
    .then(response => response)
    .catch(e => e)
}