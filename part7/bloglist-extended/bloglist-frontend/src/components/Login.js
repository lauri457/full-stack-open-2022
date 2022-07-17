import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { logInUser } from '../reducers/loginReducer'
import Notification from './Notification'
import { Form, Button } from 'react-bootstrap'

const Login = () => {
	const dispatch = useDispatch()
	const { reset: resetUsername, ...username } = useField('text')
	const { reset: resetPassword, ...password } = useField('text')

	const onLogin = (event) => {
		event.preventDefault()
		dispatch(logInUser(username.value, password.value))
		resetUsername()
		resetPassword()
	}

	return (
		<>
			<h2>Log in to application</h2>
			<Notification />
			<Form onSubmit={onLogin}>
				<Form.Group>
					<Form.Label>username</Form.Label>
					<Form.Control {...username} />
					<Form.Label>password</Form.Label>
					<Form.Control {...password} type="password" />
					<Button variant="primary" id="login-button" type="submit">
						login
					</Button>
				</Form.Group>
			</Form>
		</>
	)
}

export default Login
