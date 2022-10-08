import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <p key={user.username}>
          {user.name} {user.blogs.length}
        </p>
      ))}
    </div>
  )
}

export default Users
