import { useState, useEffect } from 'react'
import Notification from './Notification'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const EditAuthor = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [notification, setNotification] = useState('')

  const [updateAuthor, result] = useMutation(EDIT_AUTHOR, {
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

  useEffect(() => {
    if (result.data) {
      if (result.data.editAuthor === null) {
        notify('Cannot Find User', 'error')
      } else {
        notify('Successfully Updated User')
      }
    }
  }, [result.data])

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <Notification notification={notification} />
      <form onSubmit={submit}>
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
