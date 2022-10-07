import { createSlice } from '@reduxjs/toolkit'
import { loginUser } from './userReducer'
import loginService from '../services/login'
import userService from '../services/user'
import { createNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout(state, action) {
      return action.payload
    },
  },
})

export const { login, logout } = loginSlice.actions

export const logUserIn = (credentials) => {
  return async (dispatch) => {
    const { username, password } = credentials
    try {
      const user = await loginService.login({ username, password })
      userService.setUser(user)
      dispatch(loginUser(user))
    } catch (exception) {
      dispatch(createNotification('Wrong credentials', 'error'))
    }
  }
}

export const logUserOut = () => {
  return async (dispatch) => {
    userService.removeUser()
    dispatch(logout(null))
  }
}
