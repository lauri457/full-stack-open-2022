import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ handleUpdateLikes, deleteBlog, name }) => {
	const tempBlogs = useSelector((state) => state.blogs)
	const blogs = [...tempBlogs]

	return (
		<div>
			{blogs
				.sort((a, b) => b.likes - a.likes)
				.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						handleUpdateLikes={handleUpdateLikes}
						deleteBlog={deleteBlog}
						name={name}
					/>
				))}
		</div>
	)
}

export default BlogList
