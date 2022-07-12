import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createComment } from '../reducers/blogReducer'

const Comments = ({ blog }) => {
	const dispatch = useDispatch()

	const { reset: resetComment, ...comment } = useField('text')

	const handleSubmit = (event) => {
		event.preventDefault()
		if (comment.value.trim()) {
			dispatch(createComment(blog.id, comment.value.trim()))
			resetComment()
		}
	}

	return (
		<>
			<h3>comments</h3>
			<div>
				<form onSubmit={handleSubmit}>
					<input {...comment} required></input>
					<button>add comment</button>
				</form>
				<ul>
					{blog.comments.map((comment, i) => (
						<li key={i}>{comment}</li>
					))}
				</ul>
			</div>
		</>
	)
}

export default Comments
