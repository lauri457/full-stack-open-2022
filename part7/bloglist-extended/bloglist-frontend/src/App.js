import { useEffect } from 'react'
import Login from './components/Login'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import User from './components/User'
import UserList from './components/UserList'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { loggedInUser } from './reducers/loginReducer'
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Blog from './components/Blog'

const App = () => {
	const dispatch = useDispatch()

	const blogs = useSelector((state) => state.blogs)
	const user = useSelector((state) => state.login)

	useEffect(() => {
		dispatch(initializeBlogs(blogs))
		dispatch(loggedInUser())
		dispatch(initializeUsers())
	}, [dispatch])

	if (user === null) {
		return (
			<div>
				<Login />
			</div>
		)
	}

	return (
		<div className="container">
			<Navigation />
			<div style={{ marginLeft: 5 }}>
				<Notification />
				<Routes>
					<Route path="/users/:id" element={<User />} />
					<Route path="/blogs/:id" element={<Blog />} />
					<Route path="/create" element={<BlogForm />}></Route>
					<Route path="/users" element={<UserList />}></Route>
					<Route path="/" element={<BlogList />}></Route>
				</Routes>
			</div>
		</div>
	)
}

export default App
