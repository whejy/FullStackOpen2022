const _ = require('lodash')

// Total likes across list of blogs
const totalLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  const reducer = (sum, item) => sum + item
  return blogs.map((blog) => blog.likes).reduce(reducer, 0)
}

// Most liked blog
const favouriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  const reducer = (prev, curr) => (prev.likes > curr.likes ? prev : curr)
  return blogs.reduce(reducer, 0)
}

// Author with most blogs
const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  //   Calculate blog count
  const reducer = (result, value, key) => {
    if (value > result.blogs) {
      result.blogs = value
      result.author = key
    }
    return result
  }

  return _.reduce(
    _.countBy(blogs, (blog) => blog.author),
    reducer,
    { author: '', blogs: 0 }
  )
}

// Author with most likes across all blogs
const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  //   Group blogs by author
  const authorGroups = _.groupBy(blogs, (blog) => blog.author)
  const authors = Object.keys(authorGroups)

  //   Sum authors total likes
  for (const author of authors) {
    authorGroups[author] = totalLikes(authorGroups[author])
  }

  //   Calculate highest like count
  const reducer = (result, value, key) => {
    if (value > result.likes) {
      result.likes = value
      result.author = key
    }
    return result
  }

  return _.reduce(authorGroups, reducer, { author: '', likes: 0 })
}

module.exports = {
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
