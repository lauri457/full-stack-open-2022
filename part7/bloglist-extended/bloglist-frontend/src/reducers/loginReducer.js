import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { createNotification } from './notificationReducer'
// import { setLoggedUser, getLoggedUser, clearUser, getToken} from '../services/user'
import userService from '../services/user'

const loginSlice = createSlice({
	name: 'login',
	initialState: null,
	reducers: {
		setUser(state, action) {
			return (state = action.payload)
		}
	}
})

export const { setUser } = loginSlice.actions

export const loggedInUser = () => {
	return async (dispatch) => {
		const loggedUserJson = userService.getLoggedUser()
		dispatch(setUser(loggedUserJson))
	}
}

export const logInUser = (username, password) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login({
				username,
				password
			})
			window.localStorage.setItem(
				'loggedBlogappUser',
				JSON.stringify(user)
			)
			blogService.setToken(user.token)
			dispatch(setUser(user))

			dispatch(createNotification(`${user.username} logged in`, 5))
		} catch (exception) {
			dispatch(createNotification('Invalid credentials', 5))
		}
	}
}

export const logOutUser = () => {
	return async (dispatch) => {
		const user = JSON.parse(
			window.localStorage.getItem('loggedBlogappUser')
		)
		window.localStorage.removeItem('loggedBlogappUser')
		dispatch(setUser(null))
		dispatch(createNotification(`${user.username} logged out`, 5))
	}
}

export default loginSlice.reducer
