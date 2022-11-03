import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'
import BooksTable from './BooksTable'

const Recommended = ({ show }) => {
  const [genre, setGenre] = useState('')
  const [books, setBooks] = useState([])
  const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache',
  })

  useQuery(ME, {
    onCompleted: (data) => setGenre(data.me.favouriteGenre),
  })

  useEffect(() => {
    getBooks({ variables: { genre: genre } })
  }, [genre, getBooks])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  if (result.loading) return <div>Loading...</div>

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      {genre ? (
        <>
          <p>
            books in your favourite genre <b>{genre}</b>
          </p>
          <div>
            <BooksTable books={books} />
          </div>
        </>
      ) : (
        <div>You have not added a favourite genre yet</div>
      )}
    </div>
  )
}
export default Recommended
