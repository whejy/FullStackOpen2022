const Login = (props) => {
  return (
    <div>
      <form onSubmit={props.handleLogin}>
        <div>
          <label>
            Username
            <input
              autoFocus
              type="text"
              value={props.username}
              name="Username"
              onChange={({ target }) => props.setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              value={props.password}
              name="Password"
              onChange={({ target }) => props.setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
