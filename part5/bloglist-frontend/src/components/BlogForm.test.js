import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
	let container
	const mockHandler = jest.fn()

	beforeEach(() => {
		container = render(
			<BlogForm buttonLabel="create" createBlog={mockHandler}></BlogForm>
		).container
	})

	test('event handler called with right details when new blog is created', async () => {
		const user = userEvent.setup()

		const inputTitle = screen.getByPlaceholderText('title')
		const inputAuthor = screen.getByPlaceholderText('author')
		const inputUrl = screen.getByPlaceholderText('url')
		const sendButton = screen.getByText('create')

		await user.type(inputTitle, 'title')
		await user.type(inputAuthor, 'author')
		await user.type(inputUrl, 'url')
		await user.click(sendButton)

		expect(mockHandler.mock.calls).toHaveLength(1)
		expect(mockHandler.mock.calls[0][0].title).toBe('title')
		expect(mockHandler.mock.calls[0][0].author).toBe('author')
		expect(mockHandler.mock.calls[0][0].url).toBe('url')
	})
})
