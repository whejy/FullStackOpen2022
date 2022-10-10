import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logoutUser, setLogin } from './reducers/loginReducer'
import userService from './services/user'
import { Container, Button } from 'react-bootstrap'

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
      <Container>
        <h2>Blogs</h2>
        <Notification />
        {loggedInUser === null ? (
          <Login />
        ) : (
          <div>
            <i>{loggedInUser.name} logged in </i>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
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
              <Route path="/users/:id" element={<User />} />
              <Route path="/blog/:id" element={<Blog />} />
            </Routes>
          </div>
        )}
      </Container>
    </Router>
  )
}

export default App
