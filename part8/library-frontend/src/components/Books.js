import Genres from './Genres'
import BooksTable from './BooksTable'
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ notify, books, show }) => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('')
  const [filteredBooks, setFilteredBooks] = useState(null)
  // const [filteredBooks2, setFilteredBooks2] = useState([])

  const { data } = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
  })

  useEffect(() => {
    if (data && data.allBooks) {
      setFilteredBooks(data.allBooks)
    }
  }, [data, books])

  useEffect(() => {
    if (books) {
      const genres = []
      books.forEach((book) => {
        if (book.genres.length > 0) {
          book.genres.forEach((genre) => {
            genres[genre] = genre
          })
        }
      })
      setGenres(Object.keys(genres))
    }
  }, [books])

  // useEffect(() => {
  //   if (!genre) {
  //     setFilteredBooks(books)
  //   } else {
  //     setFilteredBooks(() =>
  //       books.filter((book) => book.genres.includes(genre))
  //     )
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [genre, genres])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <Genres genres={genres} setGenre={setGenre} />
      <BooksTable books={filteredBooks} />
    </div>
  )
}

export default Books
