import { useSelector } from 'react-redux'
import Users from './Users'

const UserList = () => {
	const users = useSelector((state) => state.users)
	return (
		<>
			<h2>users</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<Users key={user.id} user={user} />
					))}
				</tbody>
			</table>
		</>
	)
}

export default UserList
