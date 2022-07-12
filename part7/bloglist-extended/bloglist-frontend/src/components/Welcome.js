import { useDispatch, useSelector } from 'react-redux'
import { logOutUser } from '../reducers/loginReducer'

const Welcome = () => {
	const user = useSelector((state) => state.login)
	const dispatch = useDispatch()
	if (!user) return null

	const handleLogout = (event) => {
		event.preventDefault()
		dispatch(logOutUser())
	}

	return (
		<>
			<h2>blogs</h2>
			<p>
				{`${user.name} logged in `}
				<button onClick={handleLogout}>logout</button>
			</p>
		</>
	)
}

export default Welcome
