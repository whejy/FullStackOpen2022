import { useDispatch, useSelector } from 'react-redux'
import { Nav, Navbar, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/loginReducer'

const NavBar = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.login)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const padding = {
    padding: 5,
  }
  return (
    <Navbar collapseOnSelect variant="light" bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                Blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                Users
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand>
          <Navbar.Text>{loggedInUser.name} logged in </Navbar.Text>
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavBar
