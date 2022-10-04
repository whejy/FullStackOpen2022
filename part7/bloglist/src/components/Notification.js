const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginTop: '10px',
    marginBottom: '10px',
  }

  return (
    <div id={notification.type} style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
