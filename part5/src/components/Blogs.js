import Blog from './Blog';

const Blogs = (props) => (
  <div>
    {props.blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
);

export default Blogs;
