const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { usersInDb } = require('../tests/test_helper')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog
		.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).send({ error: 'nonexisting id' })
	}
})

blogsRouter.delete('/:id', async (request, response) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	const user = request.user
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const blog = await Blog.findById(request.params.id)

	if (blog.user.toString() === user.id.toString()) {
		await Blog.deleteOne({ _id: request.params.id })
		response.status(204).end()
	} else {
		response.status(401).send({ error: "unauthorized operation" })
	}

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
	const blog = request.body
	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

	response.status(204).end()
})

module.exports = blogsRouter