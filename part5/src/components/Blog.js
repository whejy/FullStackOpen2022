import { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false);

  const buttonLabel = visible ? 'Hide' : 'View';

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlog(updatedBlog);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}{' '}
        <button onClick={() => setVisible(!visible)}>{buttonLabel}</button>
      </div>

      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes} <button onClick={increaseLikes}>Like</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
