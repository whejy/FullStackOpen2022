const Comments = ({ blog }) => {
  return (
    <div>
      <strong>Comments</strong>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
