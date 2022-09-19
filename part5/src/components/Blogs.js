import PropTypes from 'prop-types'
import Blog from './Blog'

const Blogs = (props) => (
  <div id="blogsList">
    {props.blogs.map((blog) => (
      <Blog
        key={blog.id}
        removeBlog={props.removeBlog}
        updateBlog={props.updateBlog}
        blog={blog}
      />
    ))}
  </div>
)

Blogs.PropTypes = {
  removeBlog: PropTypes.func.isRequired,
  updateBlog: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
}

export default Blogs
