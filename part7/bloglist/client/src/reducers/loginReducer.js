import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'
import { createNotification } from './notificationReducer'
import loginService from '../services/login'
import { initializeBlogs } from './blogReducer'
import { initializeUsers } from './userReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLogin(state, action) {
      return action.payload
    },
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setLogin, setUsers } = loginSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const { username, password } = credentials
    try {
      const user = await loginService.login({
        username,
        password,
      })
      userService.setUser(user)
      dispatch(setLogin(user))
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    } catch (exception) {
      dispatch(createNotification('Wrong credentials', 'error'))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(setLogin(null))
    userService.removeUser()
  }
}

export default loginSlice.reducer
