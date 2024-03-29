const Notification = ({ message }) => {
	const errorRegex = /fail|Invalid|malformatted|expired|only the creator/
	if (message === null)
		return null
	const notificationStyle = {
		color: errorRegex.test(message) ? 'red' : 'green',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}
	return (
		<div className='error' style={notificationStyle}>
			{message}
		</div>
	)
}

export default Notification