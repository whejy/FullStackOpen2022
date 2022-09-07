import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
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

  // if (user === null) {
  //   return (
  //     <div>
  //       <Login
  //         username={username}
  //         password={password}
  //         setUsername={setUsername}
  //         setPassword={setPassword}
  //         handleLogin={handleLogin}
  //       />
  //     </div>
  //   );
  // }

  // return (
  //   <div>
  //     <h2>blogs</h2>
  //     <i>{user.name} logged in</i>
  //     {blogs.map((blog) => (
  //       <Blog key={blog.id} blog={blog} />
  //     ))}
  //   </div>
  // );

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
          <h2>blogs</h2>
          <i>{user.name} logged in</i>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
