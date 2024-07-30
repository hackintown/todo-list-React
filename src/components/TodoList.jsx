import React, { useState } from "react";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const handleAdd = () => {
    if (input !== "") {
      const newTodo = {
        id: Math.random(),
        text: input,
      };
      setTodos([...todos, newTodo]);
      setInput("");
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo(todo);
    setInput(todo.text);
  };

  const handleUpdate = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === currentTodo.id ? { ...todo, text: input } : todo
      )
    );
    setInput("");
    setIsEditing(false);
    setCurrentTodo(null);
  };

  return (
    <section className="my-10">
      <div className="max-w-lg mx-auto bg-gray-200 p-5 rounded-lg shadow-lg">
        <h1 className="text-center text-xl font-semibold mb-2 uppercase">To Do List</h1>
        <div className="flex items-center">
          <input
            className="border py-2 px-4 shadow-md outline-none flex-grow mr-2 rounded-md"
            name="input"
            type="text"
            value={input}
            placeholder="Add a new task"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={isEditing ? handleUpdate : handleAdd}
            className={`py-2 px-4 rounded-md text-white shadow-md transition duration-200 ${
              isEditing
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
        <ul className="mt-5">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-white py-2 px-4 my-2 rounded-md shadow-md flex justify-between items-center"
            >
              <span>{todo.text}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(todo)}
                  className="text-yellow-500 hover:text-yellow-700 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-500 hover:text-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TodoList;
