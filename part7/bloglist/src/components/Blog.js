import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const buttonLabel = visible ? 'Hide' : 'View'

  const updateBlog = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(addLike(updatedBlog))
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
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
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} - {blog.author}{' '}
        <button onClick={() => setVisible(!visible)}>{buttonLabel}</button>
        {blog.user && user && blog.user.username === user.username && (
          <button onClick={() => removeBlog(blog)}>Remove</button>
        )}
      </div>

      {visible && (
        <div>
          <div>{blog.url}</div>
          <div className="likesCount">
            Likes: {blog.likes}{' '}
            <button className="likesButton" onClick={updateBlog}>
              Like
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
