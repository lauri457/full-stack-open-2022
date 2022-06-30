import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
	const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setNewBlog({ ...newBlog, [name]: value })
	}

	const handleCreateBlog = (event) => {
		event.preventDefault()
		createBlog(newBlog)
		setNewBlog({ title: '', author: '', url: '' })
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleCreateBlog}>
				<div>
					title
					<input
						type='text'
						value={newBlog.title}
						id='title'
						name='title'
						onChange={handleInputChange}
						placeholder='title'
					/>
				</div>
				<div>
					author
					<input
						type='text'
						value={newBlog.author}
						id='author'
						name='author'
						onChange={handleInputChange}
						placeholder='author'
					/>
				</div>
				<div>
					url
					<input
						type='text'
						value={newBlog.url}
						id='url'
						name='url'
						onChange={handleInputChange}
						placeholder='url'
					/>
				</div>
				<button id='submit-button' type='submit'>create</button>
			</form>
		</div>
	)
}
export default BlogForm