import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		setNotification(state, action) {
			return (state = action.payload)
		},
		removeNotification() {
			return null
		}
	}
})

export const { setNotification, removeNotification } = notificationSlice.actions

let timer = null

export const createNotification = (message, timeout) => {
	return async (dispatch) => {
		dispatch(setNotification(message))
		clearTimeout(timer)
		timer = setTimeout(() => dispatch(removeNotification()), timeout * 1000)
	}
}

export default notificationSlice.reducer
