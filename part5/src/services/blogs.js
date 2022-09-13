import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config

const setToken = (newToken) => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

const createBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const removeBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, createBlog, updateBlog, removeBlog }
