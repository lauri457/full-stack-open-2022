import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOutUser } from '../reducers/loginReducer'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Navigation = () => {
	const user = useSelector((state) => state.login)
	const dispatch = useDispatch()
	if (!user) return null

	const handleLogout = (event) => {
		event.preventDefault()
		dispatch(logOutUser())
	}

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<LinkContainer to="/">
					<Navbar.Brand href="/">Blog app</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="#" as="span">
							<Link to={'/'}>blogs</Link>
						</Nav.Link>
						<Nav.Link href="#" as="span">
							<Link to={'/users'}>users</Link>
						</Nav.Link>
					</Nav>
					<Nav.Item style={{ color: 'lightgrey' }}>
						<NavDropdown title={user.name}>
							<NavDropdown.Item onClick={handleLogout}>
								logout
							</NavDropdown.Item>
						</NavDropdown>
					</Nav.Item>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
