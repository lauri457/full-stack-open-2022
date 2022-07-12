import { createSlice } from '@reduxjs/toolkit'
import { createNotification } from './notificationReducer'
import blogService from '../services/blogs'

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		appendBlog(state, action) {
			state.push(action.payload)
		},
		setBlogs(state, action) {
			return action.payload
		},
		updateBlog(state, action) {
			const updatedBlog = action.payload
			const { id } = updatedBlog
			return state.map((blog) => (blog.id === id ? updatedBlog : blog))
		},
		removeBlog(state, action) {
			const id = action.payload
			return state.filter((blog) => blog.id !== id)
		}
	}
})

export const { appendBlog, setBlogs, updateBlog, removeBlog } =
	blogSlice.actions

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const createBlog = (blog) => {
	return async (dispatch) => {
		try {
			const newBlog = await blogService.create(blog)
			dispatch(appendBlog(newBlog))
			dispatch(
				createNotification(
					`A new blog ${blog.title} by ${blog.author} added`,
					5
				)
			)
		} catch (exception) {
			// if (exception.response.data.error === 'token expired')
			// 	handleLogout()
			dispatch(createNotification(exception.response.data.error, 5))
		}
	}
}

export const deleteBlog = (id) => {
	return async (dispatch) => {
		try {
			await blogService.remove(id)
			dispatch(removeBlog(id))
			dispatch(createNotification('blog deleted', 5))
		} catch (exception) {
			dispatch(createNotification(exception.response.data.error, 5))
		}
	}
}

export const updateLikes = (id, blogToUpdate) => {
	return async (dispatch) => {
		try {
			const updatedBlog = await blogService.update(id, blogToUpdate)
			dispatch(updateBlog(updatedBlog))
		} catch (exception) {
			if (exception.response.data.error === 'token expired') {
				window.localStorage.removeItem('loggedBlogappUser')
				// dispatch(setUser(null))
			}
			dispatch(createNotification(exception.response.data.error, 5))
		}
	}
}

export default blogSlice.reducer
