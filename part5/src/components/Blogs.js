import Blog from './Blog';

const Blogs = (props) => (
  <div>
    {props.blogs.map((blog) => (
      <Blog
        key={blog.id}
        removeBlog={props.removeBlog}
        updateBlog={props.updateBlog}
        blog={blog}
      />
    ))}
  </div>
);

export default Blogs;
