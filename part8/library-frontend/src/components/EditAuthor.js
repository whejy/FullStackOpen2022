import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = ({ authors, notify }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    },
  })

  const submit = (event) => {
    event.preventDefault()

    updateAuthor({
      variables: { name, born: parseInt(born) },
    })

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
        {/* <div>
          name:
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
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
