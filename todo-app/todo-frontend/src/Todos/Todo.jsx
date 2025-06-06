import React from 'react'

const Todo = ({ todo }) => {
  
    console.log("todo:", todo)

    const onClickDelete = () => {
    deleteTodo(todo)
  }

  const onClickComplete = () => {
    completeTodo(todo)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '70%',
        margin: 'auto',
        marginBottom: '10px',
      }}
    >
      <span>{todo.text}</span>

      {todo.done ? (
        <div>
          <span>This todo is done</span>
          <span>
            <button onClick={onClickDelete}>Delete</button>
          </span>
        </div>
      ) : (
        <div>
          <span>This todo is not done</span>
          <span>
            <button onClick={onClickDelete}>Delete</button>
            <button onClick={onClickComplete}>Set as done</button>
          </span>
        </div>
      )}
    </div>
  )
}

export default Todo
