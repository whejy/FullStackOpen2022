import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logoutUser, setLogin } from './reducers/loginReducer'
import userService from './services/user'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const loggedInUser = useSelector((state) => state.login)

  useEffect(() => {
    const user = userService.getUser()
    if (user) {
      dispatch(setLogin(user))
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const padding = {
    padding: 5,
  }

  return (
    <Router>
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
            <p>
              <Link style={padding} to="/">
                Home
              </Link>
              <Link style={padding} to="/users">
                Users
              </Link>
            </p>
            <Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
              <NewBlogForm blogFormRef={blogFormRef} />
            </Togglable>
            <Routes>
              <Route path="/" element={<Blogs />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
