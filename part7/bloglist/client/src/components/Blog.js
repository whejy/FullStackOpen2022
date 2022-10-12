import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import Comments from './Comments'

const Blog = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const user = useSelector((state) => state.login)
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )

  if (!blog) {
    return null
  }

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

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        {blog.title} - {blog.author}{' '}
        {blog.user && user && blog.user.username === user.username && (
          <button onClick={() => removeBlog(blog)}>Remove</button>
        )}
      </div>

      <div style={{ textAlign: 'center' }}>
        <div>{blog.url}</div>
        <i>Added by:</i> {blog.user.name}
        <div className="likesCount">Likes: {blog.likes} </div>
        <div>
          <button className="likesButton" onClick={updateBlog}>
            Like
          </button>
        </div>
      </div>
      <Comments blog={blog} />
    </div>
  )
}

export default Blog
