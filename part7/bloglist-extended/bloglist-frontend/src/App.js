import { useEffect, useRef } from 'react'
// import blogService from './services/blogs'
// import loginService from './services/login'
import Login from './components/Login'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { loggedInUser, logOutUser } from './reducers/loginReducer'

const App = () => {
	const dispatch = useDispatch()

	const blogs = useSelector((state) => state.blogs)
	const user = useSelector((state) => state.login)

	const blogFormRef = useRef()

	useEffect(() => {
		dispatch(initializeBlogs(blogs))
		dispatch(loggedInUser())
	}, [dispatch])

	const handleLogout = () => {
		dispatch(logOutUser())
	}

	const loginForm = () => {
		return (
			<>
				<h2>Log in to application</h2>
				<Notification />
				<Login />
			</>
		)
	}

	const blogList = () => {
		return (
			<>
				<h2>Blogs</h2>
				<Notification />
				<p className="loginDetails">
					{user.name} logged in{' '}
					<button onClick={handleLogout}>logout</button>
				</p>
				<Togglable buttonLabel="create" ref={blogFormRef}>
					<BlogForm />
				</Togglable>
				<BlogList />
			</>
		)
	}

	return <div>{user === null ? loginForm() : blogList()}</div>
}

export default App
