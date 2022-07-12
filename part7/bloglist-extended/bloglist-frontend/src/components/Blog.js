import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteBlog, updateLikes } from '../reducers/blogReducer'
import Comments from './Comments'

const Blog = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const blog = useSelector((state) =>
		state.blogs.find((blog) => blog.id === id)
	)
	const dispatch = useDispatch()
	const user = useSelector((state) => state.login)
	if (!user || !blog) return null

	const handleLike = () => {
		const blogToUpdate = {
			...blog,
			likes: blog.likes + 1,
			user: blog.user.id
		}
		dispatch(updateLikes(blog.id, blogToUpdate))
	}

	const handleDelete = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			dispatch(deleteBlog(blog.id))
			navigate('/')
		}
	}

	const deleteButton = () => {
		return (
			<button id="del-button" onClick={handleDelete}>
				remove
			</button>
		)
	}

	return (
		<div className="blog">
			<h2>
				{blog.title} by {blog.author}
			</h2>
			<a href={blog.url}>{blog.url}</a>
			<div>
				Likes {blog.likes}{' '}
				<button id="like-button" onClick={handleLike}>
					like
				</button>
			</div>
			<div>Added by {blog.user.name}</div>
			{blog.user.name === user.name && deleteButton()}
			<Comments blog={blog} />
		</div>
	)
}

export default Blog
