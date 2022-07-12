import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { createNotification } from './notificationReducer'
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
			userService.setLoggedUser(user)
			dispatch(setUser(user))
			dispatch(createNotification(`${user.username} logged in`, 5))
		} catch (exception) {
			dispatch(createNotification('Invalid credentials', 5))
		}
	}
}

export const logOutUser = () => {
	return async (dispatch) => {
		const user = userService.getLoggedUser()
		userService.clearUser()
		dispatch(setUser(null))
		dispatch(createNotification(`${user.username} logged out`, 5))
	}
}

export default loginSlice.reducer
