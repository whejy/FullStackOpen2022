import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(createNotification('Anecdote added!'))
  }
  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default AnecdoteForm
