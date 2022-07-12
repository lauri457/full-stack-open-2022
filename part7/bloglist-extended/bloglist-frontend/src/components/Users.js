import { Link } from 'react-router-dom'

const Users = ({ user }) => {
	return (
		<tr>
			<td>
				<Link to={`/users/${user.id}`}>{user.name}</Link>
			</td>
			<td>{user.blogs.length}</td>
		</tr>
	)
}

export default Users
