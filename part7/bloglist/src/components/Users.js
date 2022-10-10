import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>User</th>
          <th>Blogs</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name} </Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Users
