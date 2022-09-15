import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Testing blog component', () => {
  const blog = {
    title: 'A Test Blog',
    author: 'Mr Smith',
    url: 'www.testingsuite.com',
    likes: 17,
  }

  let mockUpdateBlog = jest.fn()
  let mockRemoveBlog = jest.fn()

  const blogComponent = (
    <Blog updateBlog={mockUpdateBlog} removeBlog={mockRemoveBlog} blog={blog} />
  )

  test('Renders initial content with URL and Likes hidden', () => {
    const { container } = render(blogComponent)

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(`${blog.title} - ${blog.author}`)
    expect(div).not.toHaveTextContent(`${blog.url}`)
    expect(div).not.toHaveTextContent(`${blog.likes}`)
  })

  test('Clicking view button displays URL and Likes', async () => {
    render(blogComponent)

    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    screen.getByText(`${blog.url}`)
    screen.getByText(`Likes: ${blog.likes}`)
  })

  test('Clicking like-button twice calls event handler twice', async () => {
    render(blogComponent)

    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    await user.dblClick(likeButton)
    expect(mockUpdateBlog.mock.calls).toHaveLength(2)

    screen.debug()
  })
})
