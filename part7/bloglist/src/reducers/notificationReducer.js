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

export const createNotification = (message, type, seconds) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }))

    if (timeOutId) {
      clearTimeout(timeOutId)
    }

    timeOutId = setTimeout(
      () => dispatch(setNotification(null)),
      seconds * 1000
    )
  }
}

export default notificationSlice.reducer
