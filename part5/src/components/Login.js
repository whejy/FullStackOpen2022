import PropTypes from 'prop-types';

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

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
