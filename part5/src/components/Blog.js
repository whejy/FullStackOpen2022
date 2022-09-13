import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const buttonLabel = visible ? 'Hide' : 'View'

  const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
  const user = JSON.parse(loggedUserJSON)

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    updateBlog(updatedBlog)
  }

  const deleteConfirm = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}{' '}
        <button onClick={() => setVisible(!visible)}>{buttonLabel}</button>
        {blog.user.username === user.username && (
          <button onClick={() => deleteConfirm(blog)}>Remove</button>
        )}
      </div>

      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes} <button onClick={increaseLikes}>Like</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
