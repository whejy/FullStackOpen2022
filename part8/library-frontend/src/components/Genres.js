const Genres = ({ genres, setGenre }) => {
  return (
    <div>
      <button onClick={() => setGenre(null)}>All Books</button>
      {genres.map((genre) => (
        <button onClick={() => setGenre(genre)} key={genre}>
          {genre}
        </button>
      ))}
    </div>
  )
}

export default Genres
