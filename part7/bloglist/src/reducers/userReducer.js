import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'
import { createNotification } from './notificationReducer'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const { username, password } = credentials
    try {
      const user = await loginService.login({
        username,
        password,
      })
      dispatch(setUser(user))
      userService.setUser(user)
    } catch (exception) {
      dispatch(createNotification('Wrong credentials', 'error'))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(setUser(null))
    userService.removeUser()
  }
}

export default userSlice.reducer
