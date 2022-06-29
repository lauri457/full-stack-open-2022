import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
	const blog = {
		title: 'title',
		author: 'author',
		url: 'url',
		likes: 0,
		user: {
			name: 'name'
		}
	}

	let container
	const mockHandler = jest.fn()

	beforeEach(() => {
		container = render(
			<Blog buttonLabel="create" blog={blog}
				handleUpdateLikes={mockHandler}
				deleteBlog={mockHandler} name='name'></Blog>
		).container
	})

	test('initially renders only title and blog', () => {
		const title = container.querySelector('.title')
		const author = container.querySelector('.author')
		const details = container.querySelector('.togglableDetails')

		expect(title).toHaveStyle('display: ')
		expect(author).toHaveStyle('display: ')
		expect(details).toHaveStyle('display: none')
	})

	test('clicking view button renders rest of details', async () => {
		const details = container.querySelector('.togglableDetails')

		expect(details).toHaveStyle('display: none')

		const user = userEvent.setup()
		const button = screen.getByText('view')
		await user.click(button)

		expect(details).not.toHaveStyle('display: none')
	})

	test('clicking like button twice causes event handler to be called twice', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('view')
		await user.click(button)

		const likeButton = screen.getByText('like')
		await user.click(likeButton)
		await user.click(likeButton)

		expect(mockHandler.mock.calls).toHaveLength(2)
	})
})

describe('<Blogform />', () => {
	test('event handler called with right details when new blog is created', () => {

	})
})
