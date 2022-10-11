import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { Button, Form } from 'react-bootstrap'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>
          Username
          <Form.Control
            autoFocus
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Password
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Label>
      </Form.Group>
      <Button id="login-button" type="submit">
        Login
      </Button>
    </Form>
  )
}

export default Login
