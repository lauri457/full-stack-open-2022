import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogList = () => {
	const tempBlogs = useSelector((state) => state.blogs)
	const blogs = [...tempBlogs]

	const cellStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const blogFormRef = useRef()

	return (
		<>
			<h2 style={{ marginLeft: 5 }}>blogs</h2>
			<Togglable buttonLabel="create new" ref={blogFormRef}>
				<BlogForm />{' '}
			</Togglable>
			<table>
				<tbody>
					{blogs
						.sort((a, b) => b.likes - a.likes)
						.map((blog) => (
							<tr key={blog.id}>
								<td style={cellStyle}>
									<Link to={`/blogs/${blog.id}`}>
										{blog.title} - {blog.author}
									</Link>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</>
	)
}

export default BlogList
