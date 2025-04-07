import { useState } from 'react'; // React hook for managing component state

function App() {
  // State to track the current input value for a new todo
  const [newTodoTitle, setNewTodoTitle] = useState("");

  // State to hold the list of todo items
  const [todos, setTodos] = useState([]);

  // Handler for adding a new todo item
  const handleAddTodo = (e) => {
    e.preventDefault(); // Prevents page reload on form submission

    // Avoid adding empty or whitespace-only items
    if (!newTodoTitle.trim()) return;

    // Add the new todo to the list
    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: crypto.randomUUID(),  // Generates a unique ID
        title: newTodoTitle.trim(),
        completed: false
      }
    ]);

    // Clear the input field after submission
    setNewTodoTitle("");
  };

  // Handler to delete a specific todo by ID
  const deleteTodo = (idToDelete) => {
    setTodos((currentTodos) =>
      currentTodos.filter(todo => todo.id !== idToDelete)
    );
  };

  // Handler to toggle the completed status of a todo
  const handleToggleTodo = (id, completed) => {
    setTodos((currentTodos) =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  };

  return (
    <div className='form-container'>
      {/* Form to input new todos */}
      <form className='form' onSubmit={handleAddTodo}>
        <div className='form-row'>
          <label htmlFor='todo-input'>Add todo item</label>
          <input
            type='text'
            id='todo-input'
            value={newTodoTitle}
            onChange={e => setNewTodoTitle(e.target.value)} // Update input state
          />
        </div><br />
        <button className='btn'>Add</button>
      </form>

      <h1 className='header'>Todo list</h1>
      {/* Display message if no todos are present */}
      {todos.length === 0 && <p>No todos</p>}

      {/* List of todo items */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <label className={todo.completed ? 'strike-through' : ''}>
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={(e) => handleToggleTodo(todo.id, e.target.checked)}
              />
              {todo.title}
            </label>
            <button className='btn btn-danger' onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
