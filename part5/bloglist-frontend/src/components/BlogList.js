import Blog from './Blog'

const BlogList = ({ blogs, handleUpdateLikes, deleteBlog, name }) => (
	<div>
		{blogs
			.sort((a, b) => b.likes - a.likes)
			.map(blog =>
				<Blog key={blog.id} blog={blog}
					handleUpdateLikes={handleUpdateLikes}
					deleteBlog={deleteBlog} name={name} />
			)}
	</div>
)

export default BlogList