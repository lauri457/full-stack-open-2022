const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{
		title: "Blog about tests",
		author: "T. Ester",
		url: "www.te.st",
		likes: 15
	},
	{
		title: 'Blog not about tests',
		author: 'N. Ottester',
		url: 'www.notte.st',
		likes: 0
	}
]

const nonExistingId = async () => {
	const blog = new Blog({
		title: 'willremovethissoon',
		author: 'W. Smith',
		url: 'www.n.ot',
		likes: 400
	})
	await blog.save()
	await blog.remove()

	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}


module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb,
	usersInDb
}