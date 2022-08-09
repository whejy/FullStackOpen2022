const Notification = ({ message }) => {
  if (message) {
    return (
      <div className={message.type === "error" ? "error" : "success"}>
        {message.message}
      </div>
    );
  }
  return null;
};

export default Notification;
