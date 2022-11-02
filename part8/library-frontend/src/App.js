import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Recommended from './components/Recommended'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import { useApolloClient, useSubscription } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`New Book Added - ${subscriptionData.data.bookAdded.title}`)
      // notify(`New Book Added - ${subscriptionData.data.bookAdded.title}`)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(subscriptionData.data.bookAdded),
        }
      })
    },
  })

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={() => logout()}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </>
      <Notification notification={notification} />
      <Authors notify={notify} show={page === 'authors'} />
      <Books notify={notify} show={page === 'books'} />
      <Recommended notify={notify} show={page === 'recommended'} />
      <NewBook setPage={setPage} notify={notify} show={page === 'add'} />
      <LoginForm
        setPage={setPage}
        setToken={setToken}
        notify={notify}
        show={page === 'login'}
      />
    </div>
  )
}

export default App
