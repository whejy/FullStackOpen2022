// import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.createNotification('Anecdote added!', 3)
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

const mapDispatchToProps = {
  createAnecdote,
  createNotification,
}

const ConnectedForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedForm
