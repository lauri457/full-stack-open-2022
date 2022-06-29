import Blog from './Blog'

const BlogList = ({ blogs, handleUpdateLikes, deleteBlog, username }) => (
	<div>
		{blogs
			.sort((a, b) => b.likes - a.likes)
			.map(blog =>
				<Blog key={blog.id} blog={blog}
					handleUpdateLikes={handleUpdateLikes}
					deleteBlog={deleteBlog} username={username} />
			)}
	</div>
)

export default BlogList