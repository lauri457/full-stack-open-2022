import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { FloatingLabel, Form } from 'react-bootstrap'

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
			<Form onSubmit={handleCreateBlog}>
				<FloatingLabel
					controlId="floatingInput"
					label="Title"
					className="mb-3"
				>
					<Form.Control {...title} placeholder="Title" />
				</FloatingLabel>
				<FloatingLabel
					controlId="floatingInput"
					label="Author"
					className="mb-3"
				>
					<Form.Control {...author} placeholder="Author" />
				</FloatingLabel>
				<FloatingLabel
					controlId="floatingInput"
					label="Url"
					className="mb-3"
				>
					<Form.Control {...url} placeholder="URL" />
				</FloatingLabel>
				<button id="submit-button" type="submit">
					create
				</button>
			</Form>
		</div>
	)
}
export default BlogForm
