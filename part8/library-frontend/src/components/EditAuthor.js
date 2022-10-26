import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = ({ authors, notify }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const message =
        error.graphQLErrors.length > 0
          ? error.graphQLErrors[0].message
          : 'Please supply a birthyear'

      notify(message, 'error')
    },
  })

  const submit = (event) => {
    event.preventDefault()

    try {
      updateAuthor({
        variables: { name, born: parseInt(born) },
      })
    } catch (error) {
      notify(error.graphQLErrors[0].message, 'error')
    }

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data) {
      if (result.data.editAuthor === null) {
        notify('Cannot Find User', 'error')
      } else {
        notify('Successfully Updated User')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((author) => (
              <option value={author.name} key={author.id}>
                {author.name}
              </option>
            ))}
          </select>
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
