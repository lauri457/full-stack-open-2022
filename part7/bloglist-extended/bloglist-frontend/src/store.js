import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blogs: blogReducer,
		login: loginReducer
	}
})

export default store
