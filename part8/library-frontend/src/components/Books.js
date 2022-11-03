import Genres from './Genres'
import BooksTable from './BooksTable'
import { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genres, setGenres] = useState([])
  const [filteredBooks, setFilteredBooks] = useState(null)

  const { data } = useQuery(ALL_BOOKS)

  const [getBooksByGenre, genreResult] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache',
  })

  // Get books by selected genre
  useEffect(() => {
    if (genreResult.data) {
      setFilteredBooks(genreResult.data.allBooks)
    }
  }, [genreResult.data])

  // Get all books and genres
  useEffect(() => {
    if (data && data.allBooks) {
      const genres = []
      data.allBooks.forEach((book) => {
        if (book.genres.length > 0) {
          book.genres.forEach((genre) => {
            genres[genre] = genre
          })
        }
      })
      setGenres(Object.keys(genres))
      setFilteredBooks(data.allBooks)
    }
  }, [data])

  const handleGenre = (genre) => {
    getBooksByGenre({ variables: { genre: genre } })
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <Genres genres={genres} setGenre={handleGenre} />
      <BooksTable books={filteredBooks} />
    </div>
  )
}

export default Books
