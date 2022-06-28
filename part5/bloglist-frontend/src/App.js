import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('testaaja')
	const [password, setPassword] = useState('salasana')
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 3000);
		return () => {
			clearTimeout(timer);
		};
	}, [message]);

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

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password,
			})
			window.localStorage.setItem(
				'loggedBlogappuser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
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
			setBlogs(blogs.concat(blog))
			setMessage(`A new blog ${title} by ${author} added`)
		} catch (exception) {
			setMessage(exception.response.data.error)
		}
	}

	const handleLogout = (event) => {
		const user = JSON.parse(window.localStorage.getItem('loggedBlogappuser'))
		console.log(user['username'])
		window.localStorage.removeItem('loggedBlogappuser')
		setUser(null)
		setMessage(`${user.username} logged out`)
	}

	const loginForm = () => {
		return (
			<div>
				<h2>Log in to application</h2>
				<Notification message={message}/>
				<Login handleLogin={handleLogin} setPassword={setPassword}
					setUsername={setUsername} username={username} password={password} />
			</div >
		)
	}

	const blogList = () => {
		return (
			<div>
				<h2>Blogs</h2>
				<Notification message={message} />
				<p>{user.name} logged in <button onClick={handleLogout} >logout</button></p>
				<BlogForm createBlog={createBlog} />
				<BlogList blogs={blogs} />
			</div>
		)
	}

	return (
		<div>
			{user === null ?
				loginForm() :
				<div>
					{blogList()}
				</div>
			}
		</div>
	)
}

export default App
