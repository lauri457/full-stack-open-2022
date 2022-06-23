const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const config = require('../utils/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
})

describe('when there are blogs saved initially', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	test('blogs post id is not _id', async () => {
		const response = await api.get('/api/blogs')

		const ids = response.body.map(r => r.id)
		expect(ids).toBeDefined()
	})

	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs')

		const titles = response.body.map(r => r.title)
		expect(titles).toContain(
			'Blog not about tests'
		)
	})
})

describe('adding new blogs', () => {
	beforeAll(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash("Ab!1", 10)
		const user = await new User({ username: "blogaddtest", passwordHash }).save()

		const userForToken = { username: "blogaddtest", id: user.id }
		return (token = jwt.sign(userForToken, config.SECRET))
	})

	test('a valid blog can be added', async () => {
		const newBlog = {
			title: 'async/await simplifies making async calls',
			author: 'A. Sync',
			url: 'www.asy.nc',
			likes: 999
		}
		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

		const titles = blogsAtEnd.map(r => r.title)
		expect(titles).toContain(
			'async/await simplifies making async calls'
		)
	})

	test('blog without title is not added', async () => {
		const newBlog = {
			author: 'N. Otitle',
			url: 'www.notit.le',
			likes: 1
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})

	test('blog without url is not added', async () => {
		const newBlog = {
			title: 'No url',
			author: 'N. Ourl',
			likes: 1
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})

	test('blog without likes defaults to 0 likes', async () => {
		const newBlog = {
			title: 'No likes',
			author: 'N. Olikes',
			url: 'www.nou.rl'
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)
			.expect(201)

		const blogsAtEnd = await helper.blogsInDb()

		const blogWithNoLikes = blogsAtEnd.find(r => r.title === 'No likes')
		expect(blogWithNoLikes.likes).toEqual(0)
	})
})

describe('viewing a specific blog', () => {
	test('succeeds with a valid id', async () => {
		const blogsAtStart = await helper.blogsInDb()

		const blogToView = blogsAtStart[0]

		const resultBlog = await api
			.get(`/api/blogs/${blogToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

		expect(resultBlog.body).toEqual(processedBlogToView)
	})
	test('fails with 404 if blog does not exist', async () => {
		const validNonExistingId = await helper.nonExistingId()

		await api
			.get(`/api/blogs/${validNonExistingId}`)
			.expect(404)
	})
	test('fails with 400 if id is invalid', async () => {
		const invalidId = '62b2d584bdc4cb4051dcdab'

		await api
			.get(`/api/blogs/${invalidId}`)
			.expect(400)
	})
})

describe('deleting a blog', () => {
	let token = null
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash("Ab!1", 10)
		const user = await new User({ username: "blogdeltest", passwordHash }).save()

		const userForToken = { username: "blogdeltest", id: user.id }
		token = jwt.sign(userForToken, config.SECRET)

		const newBlog = {
			title: "New blog for testing deletion",
			author: "D. Eleter",
			url: "www.dele.te",
		}

		await api
			.post("/api/blogs")
			.set("Authorization", `Bearer ${token}`)
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/)

		return token
	})

	test('succeeds with 204 with valid id', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[2]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', `bearer ${token}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length
		)

		const titles = blogsAtEnd.map(r => r.title)
		expect(titles).not.toContain(blogToDelete.title)
	})
	test('fails with 401 if user unauthorized', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		token = ""

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', `bearer ${token}`)
			.expect(401)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

		const titles = blogsAtEnd.map(r => r.title)
		expect(titles).toContain(blogToDelete.title)
	})
	test('deleting invalid id fails with 400', async () => {
		const invalidId = '62b2d584bdc4cb4051dcdab'

		await api
			.delete(`/api/blogs/${invalidId}`)
			.set('Authorization', `bearer ${token}`)
			.expect(400)
	})
})

describe('updating a blog', () => {
	test('updating likes succeeds with 204', async () => {
		const blogsAtStart = await helper.blogsInDb()

		const blogToUpdate = blogsAtStart[0]

		blogToUpdate.likes = 500

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(blogToUpdate)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		const blogWithUpdatedLikes = blogsAtEnd.find(r => r.id === blogToUpdate.id)

		expect(blogWithUpdatedLikes.likes).toEqual(500)
	})
	test('updating invalid id fails with 400', async () => {
		const invalidId = '62b2d584bdc4cb4051dcdab'
		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		blogToUpdate.likes = 500

		await api
			.put(`/api/blogs/${invalidId}`)
			.send(blogToUpdate)
			.expect(400)
	})
})
afterAll(() => {
	mongoose.connection.close()
})