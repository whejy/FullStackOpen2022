import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'
import { useState } from 'react'
import BooksTable from './BooksTable'

const Recommended = ({ show }) => {
  const [genre, setGenre] = useState('')
  const books = useQuery(ALL_BOOKS)
  useQuery(ME, {
    onCompleted: (data) => setGenre(data.me.favouriteGenre),
  })

  if (books.loading) return <div>Loading...</div>

  const usersGenreBooks = books.data.allBooks.filter((book) =>
    book.genres.includes(genre)
  )

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
            <BooksTable books={usersGenreBooks} />
          </div>
        </>
      ) : (
        <div>You have not added a favourite genre yet</div>
      )}
    </div>
  )
}
export default Recommended
