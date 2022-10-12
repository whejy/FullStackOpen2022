import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'
import { useField } from '../hooks'

const NewBlogForm = ({ blogFormRef }) => {
  const { reset: resetTitle, ...title } = useField('')
  const { reset: resetAuthor, ...author } = useField('')
  const { reset: resetUrl, ...url } = useField('')

  const dispatch = useDispatch()

  const handleReset = () => {
    resetAuthor()
    resetTitle()
    resetUrl()
  }

  const addBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    dispatch(createBlog(newBlog))
    handleReset()
  }

  return (
    <div>
      <h2>Create Blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>
            Title:
            <Form.Control
              autoFocus
              {...title}
              type={'text'}
              name="Title"
              placeholder="Title"
            />
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Author:
            <Form.Control
              type={'text'}
              {...author}
              name="Author"
              placeholder="Author"
            />
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            URL:
            <Form.Control type={'text'} {...url} name="Url" placeholder="URL" />
          </Form.Label>
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  )
}

export default NewBlogForm
