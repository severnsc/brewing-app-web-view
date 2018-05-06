import axios from 'axios'

export const isUsernameUnique = async username => {
  return axios.post('http://localhost:3001/isUsernameUnique', {
    username: username
  }).then(response => response.data)
}