import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addLike, deleteBlog } from '../reducers/blogReducer'

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
      <div>
        {blog.title} - {blog.author}{' '}
        {blog.user && user && blog.user.username === user.username && (
          <button onClick={() => removeBlog(blog)}>Remove</button>
        )}
      </div>

      <div>
        <div>{blog.url}</div>
        <i>Added by:</i> {blog.user.name}
        <div className="likesCount">
          Likes: {blog.likes}{' '}
          <button className="likesButton" onClick={updateBlog}>
            Like
          </button>
        </div>
      </div>
      <div>
        <strong>Comments</strong>
        <ul>
          {blog.comments.map((comment, i) => (
            <li key={i}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
