import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		setUsers(state, action) {
			return action.payload
		},
		appendUser(state, action) {
			return state.push(action.payload)
		},
		removeUser(state, action) {
			const id = action.payload
			return state.filter((user) => user.id !== id)
		}
	}
})

export const { setUsers, appendUser, removeUser } = userSlice.actions

export const initializeUsers = () => {
	return async (dispatch) => {
		const users = await userService.getAll()
		dispatch(setUsers(users))
	}
}

export default userSlice.reducer
