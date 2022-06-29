import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)

	const blogFormRef = useRef()

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null)
		}, 3000)
		return () => {
			clearTimeout(timer)
		}
	}, [message])

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const loggedUserJson = window.localStorage.getItem('loggedBlogappuser')
		if (loggedUserJson) {
			const user = JSON.parse(loggedUserJson)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (username, password) => {
		try {
			const user = await loginService.login({
				username, password,
			})
			window.localStorage.setItem(
				'loggedBlogappuser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)

			setMessage(`${user.username} logged in`)
		} catch (exception) {
			setMessage('Invalid credentials')
		}
	}

	const createBlog = async (title, author, url) => {
		try {
			const blog = await blogService.create({
				title, author, url
			})
			blogFormRef.current.toggleVisibility()
			setBlogs(blogs.concat(blog))
			setMessage(`A new blog ${title} by ${author} added`)
		} catch (exception) {
			if (exception.response.data.error === 'token expired')
				handleLogout()
			setMessage(exception.response.data.error)
		}
	}

	const handleLogout = () => {
		const user = JSON.parse(window.localStorage.getItem('loggedBlogappuser'))
		window.localStorage.removeItem('loggedBlogappuser')
		setUser(null)
		setMessage(`${user.username} logged out`)
	}

	const handleUpdateLikes = async (id, blogToUpdate) => {
		try {
			const updatedBlog = await blogService.update(id, blogToUpdate)
			const newBlogs = blogs.map(blog => blog.id === id ? updatedBlog : blog)
			setBlogs(newBlogs)
		} catch (exception) {
			if (exception.response.data.error === 'token expired') {
				window.localStorage.removeItem('loggedBlogappuser')
				setUser(null)
			}
			setMessage(exception.response.data.error)
		}
	}

	const deleteBlog = async (id) => {
		try {
			await blogService.remove(id)
			const updatedBlogs = blogs.filter(blog => blog.id !== id)
			setBlogs(updatedBlogs)
			setMessage('blog deleted')
		} catch (exception) {
			setMessage(exception.response.data.error)
		}
	}

	const loginForm = () => {
		return (
			<>
				<h2>Log in to application</h2>
				<Notification message={message} />
				<Login handleLogin={handleLogin} />
			</ >
		)
	}

	const blogList = () => {
		return (
			<>
				<h2>Blogs</h2>
				<Notification message={message} />
				<p>{user.name} logged in <button onClick={handleLogout} >logout</button></p>
				<Togglable buttonLabel="create" ref={blogFormRef}>
					<BlogForm createBlog={createBlog} />
				</Togglable>
				<BlogList blogs={blogs} handleUpdateLikes={handleUpdateLikes}
					deleteBlog={deleteBlog} name={user.name} />
			</>
		)
	}

	return (
		<div>
			{user === null ?
				loginForm() :
				blogList()
			}
		</div>
	)
}

export default App
