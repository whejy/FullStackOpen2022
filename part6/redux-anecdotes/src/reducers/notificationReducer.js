import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

export const { setNotification } = notificationSlice.actions

let timeOutId = null

// Async function that sets and then clears notification
export const createNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(setNotification(message))

    if (timeOutId) {
      clearTimeout(timeOutId)
    }
    timeOutId = setTimeout(() => dispatch(setNotification(null)), time * 1000)
  }
}

export default notificationSlice.reducer
