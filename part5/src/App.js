import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import Login from './components/Login';
import NewBlogForm from './components/NewBlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

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
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
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
    } catch (exception) {
      setErrorMessage(`Cannot add blog: ${newBlog.title}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
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
          <Blogs blogs={blogs} user={user.name} handleLogout={handleLogout} />
          <NewBlogForm createBlog={createBlog} />
        </div>
      )}
    </div>
  );
};

export default App;
