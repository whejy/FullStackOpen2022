const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item;
  if (!blogs) {
    return 0;
  }

  return blogs.length === 0
    ? 0
    : blogs.map((blog) => blog.likes).reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  const reducer = (prev, curr) => (prev.likes > curr.likes ? prev : curr);

  return blogs.reduce(reducer, 0);
};

module.exports = {
  totalLikes,
  favouriteBlog,
};
