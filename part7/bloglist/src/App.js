import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { createNotification } from './reducers/notificationReducer'

import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
    }
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)

  const sortedBlogs = [...blogs].sort(
    (blogA, blogB) => blogB.likes - blogA.likes
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(initializeBlogs())

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(createNotification('Wrong credentials', 'error'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    setUser(null)
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {user === null ? (
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <p>
            <i>{user.name} logged in </i>
            <button onClick={handleLogout}>Logout</button>
          </p>
          <Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
            <NewBlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <Blogs blogs={sortedBlogs} />
        </div>
      )}
    </div>
  )
}

export default App
