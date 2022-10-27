import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
import Genres from './Genres'
import { useState, useEffect } from 'react'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('')
  const [filteredBooks, setFilteredBooks] = useState(null)

  const result = useQuery(ALL_BOOKS, {
    onCompleted: (data) => setBooks(data.allBooks),
  })

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

  useEffect(() => {
    if (!genre) {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(() =>
        books.filter((book) => book.genres.includes(genre))
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre, genres])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <Genres genres={genres} setGenre={setGenre} />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
