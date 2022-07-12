import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateLikes } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
	const dispatch = useDispatch()
	const [visible, setVisible] = useState(false)
	const user = useSelector((state) => state.login)
	if (!user) return null

	const showWhenVisible = { display: visible ? '' : 'none' }

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const handleLike = () => {
		const blogToUpdate = {
			...blog,
			likes: blog.likes + 1,
			user: blog.user.id
		}
		dispatch(updateLikes(blog.id, blogToUpdate))
	}

	const handleDelete = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
			dispatch(deleteBlog(blog.id))
	}

	const deleteButton = () => {
		return (
			<button id="del-button" onClick={handleDelete}>
				remove
			</button>
		)
	}

	return (
		<div className="blog" style={blogStyle}>
			<div>
				<span className="title">{blog.title} </span>
				<span className="author">{blog.author} </span>
				<button onClick={toggleVisibility}>
					{visible ? 'hide' : 'view'}
				</button>
			</div>
			<div style={showWhenVisible} className="togglableDetails">
				<span className="url">{blog.url}</span>
				<br />
				<span className="likes">likes {blog.likes} </span>
				<button id="like-button" onClick={handleLike}>
					like
				</button>
				<br />
				<span>{blog.user.name}</span>
				{blog.user.name === user.name && deleteButton()}
			</div>
		</div>
	)
}

export default Blog
