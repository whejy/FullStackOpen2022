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

export default { setUser, getUser, getToken, removeUser }
