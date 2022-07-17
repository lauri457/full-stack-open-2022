// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
	cy.request('POST', 'http://localhost:3003/api/login', {
		username, password
	}).then(response => {
		localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
		cy.visit('http://localhost:3000')
	})
})

Cypress.Commands.add('createBlog', (content) => {
	cy.request({
		url: 'http://localhost:3003/api/blogs',
		method: 'POST',
		body: content,
		headers: {
			'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
		}
	})
	cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createUser', ({name, username, password}) => {
	const user = {
		name: name,
		username: username,
		password: password
	}
	cy.request('POST', 'http://localhost:3003/api/users', user)
})