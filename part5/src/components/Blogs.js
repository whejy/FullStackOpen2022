import Blog from './Blog';
import Logout from './Logout';

const Blogs = (props) => (
  <div>
    <h2>Blogs</h2>
    <i>{props.user} logged in</i>
    <Logout handleLogout={props.handleLogout} />
    {props.blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

export default Blogs;
