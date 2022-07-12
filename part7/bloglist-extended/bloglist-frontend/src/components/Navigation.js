import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOutUser } from '../reducers/loginReducer'

const Navigation = () => {
	const navStyle = {
		marginTop: 0,
		paddingTop: 0,
		paddingLeft: 0,
		backgroundColor: 'lightgrey'
	}
	const spanStyle = {
		paddingRight: 8
	}
	const user = useSelector((state) => state.login)
	const dispatch = useDispatch()
	if (!user) return null

	const handleLogout = (event) => {
		event.preventDefault()
		dispatch(logOutUser())
	}

	return (
		<>
			<div style={navStyle}>
				<span style={spanStyle}>
					<Link to={'/'}>blogs</Link>
				</span>
				<span style={spanStyle}>
					<Link to={'/users'}>users</Link>
				</span>

				{`${user.name} logged in `}
				<button onClick={handleLogout}>logout</button>
			</div>
		</>
	)
}

export default Navigation
