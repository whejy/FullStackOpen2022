import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

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

export const loginUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user))
    userService.setUser(user)
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(setUser(null))
    userService.removeUser()
  }
}

export default userSlice.reducer
