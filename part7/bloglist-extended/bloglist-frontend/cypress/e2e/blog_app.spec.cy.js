describe('Blog app', function () {
	const testName = 'cypress'
	const testUsername = 'cypress'
	const testPassword = 'Password!1'
	const testTitle = 'a blog created by cypress'
	const testAuthor = 'author of blog'
	const testUrl = 'www.url.com'

	const testBlog = {
		title: testTitle,
		author: testAuthor,
		url: testUrl
	}
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.createUser({
			name: testName,
			username: testUsername,
			password: testPassword
		})
		cy.createUser({
			name: testName + '2',
			username: testUsername + '2',
			password: testPassword + '2'
		})
		cy.visit('http://localhost:3000')
	})

	it('Login form is shown', function () {
		cy.contains('Log in to application')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.get('#username').type(testUsername)
			cy.get('#password').type(testPassword)
			cy.get('#login-button').click()

			cy.contains(`${testName} logged in`)
		})

		it('fails with wrong credentials', function () {
			cy.get('#username').type('wronguser')
			cy.get('#password').type(testPassword)
			cy.get('#login-button').click()

			cy.get('.error')
				.should('contain', 'Invalid credentials')
				.and('have.css', 'color', 'rgb(255, 0, 0)')

			cy.get('html').should('not.contain', `${testName} logged in`)
		})
	})

	describe.only('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: testUsername, password: testPassword })
			cy.createBlog({ ...testBlog, title: 'first blog for testing' })
			cy.createBlog({ ...testBlog, title: 'second blog for testing' })
			cy.createBlog({ ...testBlog, title: 'third blog for testing' })
		})

		it('A blog can be created', function () {
			cy.contains('create').click()
			cy.get('#title').type(testTitle)
			cy.get('#author').type(testAuthor)
			cy.get('#url').type(testUrl)
			cy.get('#submit-button').click()
			cy.contains(testTitle + ' ' + testAuthor)
		})
		it('A blog can be liked', function () {
			cy.contains('view').click()
			cy.get('#like-button').click()
			cy.contains('likes 1')
		})
		it('A blog can be deleted', function () {
			cy.contains('view').click()
			cy.get('#del-button').click()
			cy.contains('first blog for testing').should('not.exist')
		})
		it('A blog can be only deleted by the creator', function () {
			cy.contains('logout').click()
			cy.login({ username: testUsername + '2', password: testPassword + '2' })
			cy.contains('view').click()
			cy.get('#del-button').should('not.exist')
		})
		it.only('Blogs are ordered by descending number of likes', function () {

			cy.get('.blog').eq(0).find('.title').should('contain', 'first blog')

			cy.get('.blog').eq(0).find('#like-button').click({ force: true }).wait(50)
			cy.get('.blog').eq(1).find('#like-button').click({ force: true }).wait(50).click({ force: true }).wait(50)
			cy.get('.blog').eq(2).find('#like-button').click({ force: true }).wait(50).click({ force: true }).wait(50).click({ force: true })

			cy.get('.blog').eq(0).find('.title').should('contain', 'third blog')
			cy.get('.blog').eq(2).find('.title').should('contain', 'first blog')

		})
	})
})