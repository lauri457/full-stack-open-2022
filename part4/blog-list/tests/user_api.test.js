const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
	await User.deleteMany({})

	const passwordHash = await bcrypt.hash('sekret', 10)
	const user = new User({ username: 'root', passwordHash, name: 'superuser' })

	await user.save()
})

describe('when there is initially one user in db', () => {
	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'Salainen1!',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('username must be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'Salainen1!',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})
})

describe('user creation wont work if username does not pass requirements', () => {
	test('username is too short', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: '123',
			password: 'Salainen1!'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body.error).toContain('shorter than the minimum allowed length')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).not.toContain(newUser.username)
	})

	test('username is too long', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: '1234567890123',
			password: 'Salainen1!'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body.error).toContain('longer than the maximum allowed length')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).not.toContain(newUser.username)
	})

	test('username has non-alphanumeric characters', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'abcABC123a2!',
			password: 'Salainen1!'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body.error).toContain('User validation failed')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).not.toContain(newUser.username)
	})
})
describe('creation fails with 400 password does not match requirements', () => {
	test('password not long enough', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'username',
			password: 'Ab!1'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body.error).toContain('password does not match requirements')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).not.toContain(newUser.username)
	})
	test('password has no number', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'username',
			password: 'abcdABCD!'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body.error).toContain('password does not match requirements')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).not.toContain(newUser.username)
	})
	test('password has no lowercase letters', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'username',
			password: 'ABCDAC!1'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body.error).toContain('password does not match requirements')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).not.toContain(newUser.username)
	})
	test('password has no uppercase letters', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'username',
			password: 'abcabc!1'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body.error).toContain('password does not match requirements')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).not.toContain(newUser.username)
	})
	test('password has no special characters', async () => {
		const usersAtStart = await helper.usersInDb()

		const newUser = {
			username: 'username',
			password: 'abcdABC1'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)

		expect(result.body.error).toContain('password does not match requirements')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).not.toContain(newUser.username)
	})
})