import { useState } from "react";
import { useMutation } from "react-zustand-query";

function addTodo(newTodo) {
  return fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}

export default function TodoMutation() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const { mutate, isLoading, error } = useMutation({
    mutationFn: addTodo,
    onSuccess: (data) => {
      setTodos((prev) => [...prev, data]);
      setTitle("");
    },
    onError: (err) => {
      console.error("Failed to add todo:", err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    mutate({ title, completed: false, userId: 1 });
  };

  return (
    <div className="card">
      <h2>useMutation Demo - Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !title.trim()}>
          {isLoading ? "Adding..." : "Add Todo"}
        </button>
      </form>

      {error && <div className="error">Error: {error.message}</div>}

      {todos.length > 0 && (
        <div className="todo-list">
          <h3>Added Todos:</h3>
          <ul>
            {todos.map((todo, index) => (
              <li key={todo.id || index}>
                <span>{todo.title}</span>
                <span className="badge">ID: {todo.id}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
