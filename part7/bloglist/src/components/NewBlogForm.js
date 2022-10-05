import { useState } from 'react'

const NewBlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create Blog</h2>
      <form onSubmit={createBlog}>
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
