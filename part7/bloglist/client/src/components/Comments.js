import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addComment } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const handleAddComment = () => {
    dispatch(addComment(blog.id, comment))
  }

  return (
    <div>
      <p>
        <strong>Comments</strong>
      </p>
      <Form onSubmit={handleAddComment}>
        <Form.Group>
          <Form.Control
            autoFocus
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
            placeholder="Add Comment..."
          />
        </Form.Group>
        <Button type="submit">Add Comment</Button>
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
