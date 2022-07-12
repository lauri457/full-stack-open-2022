import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector((state) => state.notification)
	const errorRegex = /fail|Invalid|malformatted|expired|only the creator/
	if (notification === null) {
		return null
	}

	const notificationStyle = {
		color: errorRegex.test(notification) ? 'red' : 'green',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}
	return (
		<div className="error" style={notificationStyle}>
			{notification}
		</div>
	)
}

export default Notification
