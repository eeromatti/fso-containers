import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('adds a todo', () => {
    render(<Todo todo={{ text: "Learn about containers", done: false }} />)
    expect(screen.getByText("Learn about containers")).toBeInTheDocument();
  })
  