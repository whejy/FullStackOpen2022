const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>
        <p>has {anecdote.votes} votes</p>
      </div>
      <div>
        <p>
          for more info visit <a href={anecdote.info}>{anecdote.info}</a>
        </p>
      </div>
    </div>
  )
}

export default Anecdote
