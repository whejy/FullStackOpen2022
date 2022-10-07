// import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  const sortedBlogs = [...blogs].sort(
    (blogA, blogB) => blogB.likes - blogA.likes
  )
  return (
    <div id="blogsList">
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

// Blogs.propTypes = {
//   blogs: PropTypes.array.isRequired,
// }

export default Blogs
