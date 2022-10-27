import { useQuery } from '@apollo/client'
import { ME } from '../queries'
import { useState } from 'react'
import BooksTable from './BooksTable'

const Recommended = ({ books, show }) => {
  const [genre, setGenre] = useState('')
  useQuery(ME, {
    onCompleted: (data) => setGenre(data.me.favouriteGenre),
  })

  const usersGenreBooks = books.filter((book) => book.genres.includes(genre))

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
