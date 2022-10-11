import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    removeBlog(state, action) {
      const blogToRemove = action.payload
      return state.filter((blog) => blog.id !== blogToRemove.id)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.createBlog(content)
      dispatch(appendBlog(newBlog))
      dispatch(
        createNotification(
          `Successfully added blog - ${newBlog.title}`,
          'success'
        )
      )
    } catch (exception) {
      console.log(exception)
      dispatch(createNotification('Please fill in empty fields', 'error'))
    }
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.updateBlog(blog)
      dispatch(updateBlog(updatedBlog))
      dispatch(
        createNotification(
          `Successfully updated blog - ${blog.title}`,
          'success'
        )
      )
    } catch (exception) {
      dispatch(
        createNotification(`Could not update blog - ${blog.title}`, 'error')
      )
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.removeBlog(blog.id)
      dispatch(removeBlog(blog))
      dispatch(createNotification('Blog removed', 'success'))
    } catch (exception) {
      dispatch(
        createNotification(`Could not remove blog - ${blog.title}`, 'error')
      )
    }
  }
}

export default blogSlice.reducer
