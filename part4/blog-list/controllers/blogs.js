const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog
		.findById(request.params.id)
		.populate('user', { username: 1, name: 1 })
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).send({ error: 'nonexisting id' })
	}
})

blogsRouter.delete('/:id', async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const blogToDelete = await Blog.findById(request.params.id)

	if (!blogToDelete) {
		return response.status(204).end()
	}

	if (blogToDelete.user && blogToDelete.user.toString() !== request.user.id) {
		return response.status(401).json({
			error: 'only the creator can delete a blog'
		})
	}

	await Blog.findByIdAndRemove(request.params.id)

	response.status(204).end()
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	const user = request.user

	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const blog = await new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id
	}).populate("user", { username: 1, name: 1 })

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
	const blog = { ...request.body }

	const updatedBlog = await Blog
		.findByIdAndUpdate(request.params.id, blog, { new: true })
		.populate('user', { username: 1, name: 1 })
	response.status(200).json(updatedBlog)
})

module.exports = blogsRouter