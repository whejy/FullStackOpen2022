import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const NewBlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    dispatch(createBlog(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
            Title:
            <input
              autoFocus
              type={'text'}
              value={title}
              name="Title"
              placeholder="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              type={'text'}
              value={author}
              name="Author"
              placeholder="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            URL:
            <input
              type={'text'}
              value={url}
              name="Url"
              placeholder="URL"
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default NewBlogForm
