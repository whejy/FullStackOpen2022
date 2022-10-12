import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'
import { useField } from '../hooks'

const Comments = ({ blog }) => {
  const { reset: resetComment, ...comment } = useField('text')

  const dispatch = useDispatch()

  const handleAddComment = (event) => {
    event.preventDefault()
    const content = {
      id: blog.id,
      comment: comment.value,
    }
    dispatch(addComment(content))
    resetComment()
  }

  return (
    <div>
      <p>
        <strong>Comments</strong>
      </p>
      <Form onSubmit={handleAddComment}>
        <Form.Group className="mb-3">
          <Form.Control
            {...comment}
            size="sm"
            autoFocus
            name="Comment"
            placeholder="Comment..."
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
