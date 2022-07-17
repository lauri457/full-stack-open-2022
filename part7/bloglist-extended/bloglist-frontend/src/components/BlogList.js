import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Table from 'react-bootstrap/Table'

const BlogList = () => {
	const tempBlogs = useSelector((state) => state.blogs)
	const blogs = [...tempBlogs]

	return (
		<>
			<h2 style={{ marginLeft: 5 }}>blogs</h2>
			<Togglable buttonLabel="create new">
				<BlogForm />{' '}
			</Togglable>
			<Table striped>
				<tbody>
					{blogs
						.sort((a, b) => b.likes - a.likes)
						.map((blog) => (
							<tr key={blog.id}>
								<td>
									<Link to={`/blogs/${blog.id}`}>
										{blog.title} - {blog.author}
									</Link>
								</td>
							</tr>
						))}
				</tbody>
			</Table>
		</>
	)
}

export default BlogList
