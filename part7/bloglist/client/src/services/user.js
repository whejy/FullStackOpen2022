import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setUser = (user) => {
  window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
  token = user.token
}

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }
  return null
}

const getToken = () => token

const removeUser = () => {
  window.localStorage.removeItem('loggedBlogsUser')
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { setUser, getUser, getToken, removeUser, getAll }
