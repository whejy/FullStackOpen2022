import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'

const App = () => {
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <Notification notification={notification} />
      <Authors notify={notify} show={page === 'authors'} />

      <Books notify={notify} show={page === 'books'} />

      <NewBook notify={notify} show={page === 'add'} />
    </div>
  )
}

export default App
