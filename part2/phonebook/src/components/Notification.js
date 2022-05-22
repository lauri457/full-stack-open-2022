const Notification = ({message, style}) => {
	const notificationStyle = {
		color : '',
		background : 'lightgrey',
		fontSize : 20,
		borderStyle : 'solid',
		borderRadius : 5,
		padding : 10,
		marginBottom : 10
	}
	if (message === '') return null
	notificationStyle.color = style
	return (
		<div style={notificationStyle}>
			{message}
		</div>
	)
}

export default Notification