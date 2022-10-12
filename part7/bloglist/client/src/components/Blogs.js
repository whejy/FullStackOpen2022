import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  const sortedBlogs = [...blogs].sort(
    (blogA, blogB) => blogB.likes - blogA.likes
  )

  const blogStyle = {}

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Blog</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {sortedBlogs.map((blog) => (
          <tr key={blog.id} style={blogStyle}>
            <td>
              <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
            </td>
            <td>{blog.author}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Blogs
