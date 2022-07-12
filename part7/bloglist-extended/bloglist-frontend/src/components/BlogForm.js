import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
	const dispatch = useDispatch()

	const { reset: resetTitle, ...title } = useField('text')
	const { reset: resetAuthor, ...author } = useField('text')
	const { reset: resetUrl, ...url } = useField('text')

	const handleCreateBlog = async (event) => {
		event.preventDefault()

		const newBlog = {
			title: title.value,
			author: author.value,
			url: url.value
		}
		resetTitle()
		resetAuthor()
		resetUrl()
		dispatch(createBlog(newBlog))
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleCreateBlog}>
				<div>
					title
					<input {...title} />
				</div>
				<div>
					author
					<input {...author} />
				</div>
				<div>
					url
					<input {...url} />
				</div>
				<button id="submit-button" type="submit">
					create
				</button>
			</form>
		</div>
	)
}
export default BlogForm
