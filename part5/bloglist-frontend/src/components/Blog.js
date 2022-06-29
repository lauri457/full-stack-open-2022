import { useState } from 'react'

const Blog = ({ blog, handleUpdateLikes, deleteBlog, name }) => {
	const [visible, setVisible] = useState(false)

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
				<span className='title'>{blog.title} </span>
				<span className='author'>{blog.author} </span>
				<button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
			</div>
			<div style={showWhenVisible} className='togglableDetails'>
				<span className='url'>{blog.url}</span><br/>
				<span className='likes'>likes {blog.likes} </span>
				<button onClick={handleLike}>like</button><br/>
				<span>{blog.user.name}</span>
				{
					blog.user.name === name && deleteButton()
				}
			</div>
		</div>
	)
}

export default Blog