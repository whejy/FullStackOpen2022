import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'

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
    <Form onSubmit={addBlog}>
      <h2>Create Blog</h2>
      <Form.Group>
        <Form.Label>
          Title:
          <Form.Control
            autoFocus
            type={'text'}
            value={title}
            name="Title"
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Author:
          <Form.Control
            type={'text'}
            value={author}
            name="Author"
            placeholder="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          URL:
          <Form.Control
            type={'text'}
            value={url}
            name="Url"
            placeholder="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Label>
      </Form.Group>
      <Button variant="primary" type="submit">
        Add
      </Button>
    </Form>
  )
}

export default NewBlogForm
