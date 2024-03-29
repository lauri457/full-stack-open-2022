import axios from 'axios'

let token = null

const STORAGE_KEY = 'loggedBlogappUser'
const baseUrl = '/api/users'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const setLoggedUser = (user) => {
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
	token = user.token
}

const getLoggedUser = () => {
	const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
	if (loggedUserJSON) {
		const user = JSON.parse(loggedUserJSON)
		token = user.token
		return user
	}

	return null
}

const clearUser = () => {
	localStorage.clear()
	token = null
}

const getToken = () => token

export default {
	setLoggedUser,
	getLoggedUser,
	clearUser,
	getToken,
	getAll
}
