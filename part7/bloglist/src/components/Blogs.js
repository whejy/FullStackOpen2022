import PropTypes from 'prop-types'
import Blog from './Blog'

const Blogs = (props) => (
  <div id="blogsList">
    {props.blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
)

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
}

export default Blogs
