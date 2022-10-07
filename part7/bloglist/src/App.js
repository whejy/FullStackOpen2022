import { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import userService from './services/user'
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser, setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const loggedInUser = useSelector((state) => state.user)

  useEffect(() => {
    const user = userService.getUser()
    if (user) {
      dispatch(setUser(user))
      dispatch(initializeBlogs())
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {loggedInUser === null ? (
        <Login />
      ) : (
        <div>
          <p>
            <i>{loggedInUser.name} logged in </i>
            <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
            <NewBlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <Blogs />
        </div>
      )}
    </div>
  )
}

export default App
