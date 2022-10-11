import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

describe('Testing NewBlogForm component', () => {
  const newBlog = {
    title: 'Tester Blog',
    author: 'Mr Test',
    url: 'www.testingsuite.com',
  }

  let mockCreateBlog = jest.fn()

  const blogFormComponent = <NewBlogForm createBlog={mockCreateBlog} />

  test('Event handler is called with correct details of new blog', async () => {
    const user = userEvent.setup()
    render(blogFormComponent)

    const title = screen.getByPlaceholderText('Title')
    const author = screen.getByPlaceholderText('Author')
    const url = screen.getByPlaceholderText('URL')
    const submitBtn = screen.getByText('Add')

    await user.type(title, newBlog.title)
    await user.type(author, newBlog.author)
    await user.type(url, newBlog.url)
    await user.click(submitBtn)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe(`${newBlog.title}`)
    expect(mockCreateBlog.mock.calls[0][0].author).toBe(`${newBlog.author}`)
    expect(mockCreateBlog.mock.calls[0][0].url).toBe(`${newBlog.url}`)
    expect(Object.keys(mockCreateBlog.mock.calls[0][0])).toHaveLength(3)
  })
})
