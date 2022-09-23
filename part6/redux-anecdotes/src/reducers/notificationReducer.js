import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      const notification = action.payload
      return notification
    },
  },
})

let timeOutId = null

// Async function that creates and then clears notification
export const createNotification = (message) => {
  return async (dispatch) => {
    dispatch(setNotification(message))

    if (timeOutId) {
      clearTimeout(timeOutId)
    }

    timeOutId = setTimeout(() => dispatch(setNotification(null)), 3000)
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
