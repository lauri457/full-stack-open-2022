// import { useEffect, useRef } from 'react'
import { useEffect } from 'react'
import Login from './components/Login'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import User from './components/User'
// import Togglable from './components/Togglable'
// import Togglable from './components/Togglable'
import UserList from './components/UserList'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
// import { loggedInUser, logOutUser } from './reducers/loginReducer'
import { loggedInUser } from './reducers/loginReducer'
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Blog from './components/Blog'

const App = () => {
	const dispatch = useDispatch()

	const blogs = useSelector((state) => state.blogs)
	const user = useSelector((state) => state.login)

	// const blogFormRef = useRef()

	useEffect(() => {
		dispatch(initializeBlogs(blogs))
		dispatch(loggedInUser())
		dispatch(initializeUsers())
	}, [dispatch])

	// const loginForm = () => {
	// 	return (
	// 		<>
	// 			<h2>Log in to application</h2>
	// 			<Notification />
	// 			<Login />
	// 		</>
	// 	)
	// }

	// const blogList = () => {
	// 	return (
	// 		<>
	// 			<h2>Blogs</h2>
	// 			<Notification />
	// 			<p className="loginDetails">
	// 				{user.name} logged in{' '}
	// 				<button onClick={handleLogout}>logout</button>
	// 			</p>
	// 			<Togglable buttonLabel="create" ref={blogFormRef}>
	// 				<BlogForm />
	// 			</Togglable>
	// 			<BlogList />
	// 		</>
	// 	)
	// }

	if (user === null) {
		return (
			<div>
				<Login />
			</div>
		)
	}

	return (
		<>
			<Navigation />
			<div style={{ marginLeft: 5 }}>
				<Notification />
				{/* <Togglable buttonLabel="create new" ref={blogFormRef}>
					<BlogForm />{' '}
				</Togglable> */}
				<Routes>
					<Route path="/users/:id" element={<User />} />
					<Route path="/blogs/:id" element={<Blog />} />
					<Route path="/create" element={<BlogForm />}></Route>
					<Route path="/users" element={<UserList />}></Route>
					<Route path="/" element={<BlogList />}></Route>
				</Routes>
			</div>
		</>
	)
}

export default App
