import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { Button, Form, Row, Col } from 'react-bootstrap'
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
    <Row>
      <Col>
        <Row style={{ textAlign: 'center' }}>
          <h4 className="my-3">Comments</h4>
          <Form onSubmit={handleAddComment}>
            <Form.Group className="mb-3">
              <Form.Control
                {...comment}
                size="sm"
                autoFocus
                name="Comment"
                placeholder="Add a comment..."
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
        </Row>
        <Row>
          <ul>
            {blog.comments.map((comment, i) => (
              <li key={i}>{comment}</li>
            ))}
          </ul>
        </Row>
      </Col>
    </Row>
  )
}

export default Comments
