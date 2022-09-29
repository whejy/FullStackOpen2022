import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetInfo, ...info } = useField('text')

  let navigate = useNavigate()

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })

    navigate('/')
    props.notify(
      `New Anecdote Created - ${content.value} by ${author.value}`,
      5
    )
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} name="content" />
        </div>
        <div>
          author
          <input {...author} name="author" />
        </div>
        <div>
          url for more info
          <input {...info} name="info" />
        </div>
        <button type="submit">Create</button>
        <button onClick={handleReset}>Clear</button>
      </form>
    </div>
  )
}

export default CreateNew
