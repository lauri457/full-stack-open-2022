import { useState } from 'react'

const Blog = ({ blog, handleUpdateLikes, deleteBlog, username }) => {
	const [visible, setVisible] = useState(false)

	const showWhenVisible = { display: visible ? '' : 'none' }

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	const handleLike = () => {
		const blogToUpdate = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes,
			user: blog.user.id,
		}
		blogToUpdate.likes++
		handleUpdateLikes(blog.id, blogToUpdate)
	}

	const handleDelete = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
			deleteBlog(blog.id)
	}

	const deleteButton = () => {
		return <button onClick={handleDelete}>remove</button>
	}

	return (
		<div style={blogStyle}>
			<div>
				<p style={{ margin: 0 }}>
					{blog.title} {blog.author}&nbsp;
					<button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
				</p>
			</div>
			<div style={showWhenVisible}>
				<p style={{ margin: 0 }}>{blog.url}</p>
				<p style={{ margin: 0 }}>
					likes {blog.likes}&nbsp;
					<button onClick={handleLike}>like</button>
				</p>
				<p style={{ margin: 0 }}>{blog.user.name}</p>
				{
					blog.user.username === username && deleteButton()
				}
			</div>
		</div>
	)
}

export default Blog