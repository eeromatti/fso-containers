import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'
import Togglable from './Togglable'

// test('renders content', () => {
//   const note = {
//     content: 'Component testing is done with react-testing-library',
//     important: true
//   }

//   render(<Note note={note} />)

//   const element = screen.getByText('Component testing is done with react-testing-library')

//   screen.debug(element)
// })


// test('clicking the button calls event handler once', async () => {
//     const note = {
//       content: 'Component testing is done with react-testing-library',
//       important: true
//     }
  
//     const mockHandler = vi.fn()
  
//     render(
//       <Note note={note} toggleImportance={mockHandler} />
//     )
  
//     const user = userEvent.setup()
//     const button = screen.getByText('make not important')
//     await user.click(button)
  
//     expect(mockHandler.mock.calls).toHaveLength(1)
//   })


describe('<Togglable />', () => {
let container
  
    beforeEach(() => {
      container = render(
        <Togglable buttonLabel="show...">
          <div className="testDiv" >
            togglable content
          </div>
        </Togglable>
      ).container
    })
  
    test('renders its children', () => {
      screen.getByText('togglable content')
    })
  
    test('at start the children are not displayed', () => {
      const div = container.querySelector('.togglableContent')
      expect(div).toHaveStyle('display: none')
    })
  
    test('after clicking the button, children are displayed', async () => {
      const user = userEvent.setup()
      const button = screen.getByText('show...')
      await user.click(button)
  
      const div = container.querySelector('.togglableContent')
      expect(div).not.toHaveStyle('display: none')
    })

    test('toggled content can be closed', async () => {
        const user = userEvent.setup()
    
        const button = screen.getByText('show...')
        await user.click(button)
    
        const closeButton = screen.getByText('cancel')
        await user.click(closeButton)
    
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
      })
  })
