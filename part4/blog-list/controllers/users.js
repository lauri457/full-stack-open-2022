const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
	const users = await User.find({})
		.find({}).populate('blogs', { url: 1,  title: 1, author: 1 })
	response.json(users)
})

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	const regex = /^(.{0,3}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/
	if (regex.test(password)) {
		return response.status(400).json({ error: 'password does not match requirements' })
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash,
	})

	const savedUser = await user.save()

	response.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (request, response) => {
	await User.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

module.exports = usersRouter