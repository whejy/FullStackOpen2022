import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import Login from './components/Login';
import Notification from './components/Notification';
import NewBlogForm from './components/NewBlogForm';
import Logout from './components/Logout';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  const notify = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user));

      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      notify('Wrong credentials', 'error');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsUser');
    setUser(null);
  };

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.createBlog(newBlog);
      setBlogs(blogs.concat(createdBlog));
      notify(`Successfully added blog - ${newBlog.title}`, 'success');
    } catch (exception) {
      notify('Please fill in empty fields', 'error');
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
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
          <i>{user.name} logged in</i>
          <Logout handleLogout={handleLogout} />
          <NewBlogForm createBlog={createBlog} />
          <Blogs blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default App;
