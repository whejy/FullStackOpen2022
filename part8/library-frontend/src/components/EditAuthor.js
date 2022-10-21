import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = (event) => {
    event.preventDefault()

    updateAuthor({
      variables: { name, born: parseInt(born) },
    })

    setName('')
    setBorn('')
  }
  return (
    <div>
      <form onSubmit={submit}>
        <h2>set birthyear</h2>
        <div>
          name:
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born:
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditAuthor
