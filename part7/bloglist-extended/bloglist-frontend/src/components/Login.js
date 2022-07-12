import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { logInUser } from '../reducers/loginReducer'
import Notification from './Notification'

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
			<form onSubmit={onLogin}>
				<div>
					username
					<input {...username} />
				</div>
				<div>
					password
					<input {...password} type="password" />
				</div>
				<button id="login-button" type="submit">
					login
				</button>
			</form>
		</>
	)
}

export default Login
