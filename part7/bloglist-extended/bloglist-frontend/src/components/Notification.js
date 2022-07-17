import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
	const notification = useSelector((state) => state.notification)
	const errorRegex = /fail|Invalid|malformatted|expired|only the creator/
	const notificationType = errorRegex.test(notification)
		? 'warning'
		: 'success'
	if (notification === null) {
		return null
	}

	return <Alert variant={notificationType}>{notification}</Alert>
}

export default Notification
