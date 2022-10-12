import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { Button, Form } from 'react-bootstrap'
import { useField } from '../hooks'

const Login = () => {
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    const credentials = {
      username: username.value,
      password: password.value,
    }
    dispatch(loginUser(credentials))
    resetUsername()
    resetPassword()
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>
          Username
          <Form.Control autoFocus {...username} name="Username" />
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Password
          <Form.Control {...password} name="Password" />
        </Form.Label>
      </Form.Group>
      <Button id="login-button" type="submit">
        Login
      </Button>
    </Form>
  )
}

export default Login
