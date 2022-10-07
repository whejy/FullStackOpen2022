import axios from 'axios'
import userService from '../services/user'
const baseUrl = '/api/blogs'

const setToken = () => {
  const token = `bearer ${userService.getToken()}`
  return {
    headers: { Authorization: token },
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl, setToken())
  return response.data
}

const createBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, setToken())
  return response.data
}

const updateBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, setToken())
  return response.data
}

const removeBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, setToken())
  return response.data
}

export default { getAll, setToken, createBlog, updateBlog, removeBlog }
