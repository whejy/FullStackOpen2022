import { createSlice } from '@reduxjs/toolkit'

const notification = 'Successfully implemented combined reducer :)'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: notification,
  reducers: {
    setNotification(state, action) {
      const notification = action.payload
      return notification
    },
  },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
