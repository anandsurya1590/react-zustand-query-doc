import { useState } from "react";
import { useMutation } from "react-zustand-query";
import CodeBlock from "../../components/CodeBlock";

function addTodo(newTodo) {
  return fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
}

const exampleCode = `import { useState } from 'react';
import { useMutation } from 'react-zustand-query';

function addTodo(newTodo) {
  return fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
}

function TodoMutation() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);

  const { mutate, isLoading, error } = useMutation({
    mutationFn: addTodo,
    onSuccess: (data) => {
      setTodos(prev => [...prev, data]);
      setTitle('');
    },
    onError: (err) => {
      console.error('Failed to add todo:', err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    mutate({ title, completed: false, userId: 1 });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !title.trim()}>
          {isLoading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>

      {error && <div className="error">Error: {error.message}</div>}

      {todos.length > 0 && (
        <ul>
          {todos.map((todo, index) => (
            <li key={todo.id || index}>
              {todo.title} (ID: {todo.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`;

function LiveDemo() {
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
    <div className="demo-result">
      <form onSubmit={handleSubmit} className="demo-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title..."
          disabled={isLoading}
          className="demo-input"
        />
        <button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="demo-button"
        >
          {isLoading ? "Adding..." : "Add Todo"}
        </button>
      </form>

      {error && <div className="demo-error">Error: {error.message}</div>}

      {todos.length > 0 && (
        <div className="demo-todo-list">
          <h4>Added Todos:</h4>
          <ul>
            {todos.map((todo, index) => (
              <li key={todo.id || index} className="demo-todo-item">
                <span>{todo.title}</span>
                <span className="demo-badge">ID: {todo.id}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function MutationsExample() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="page">
      <h1>Mutations Example</h1>
      <p className="lead">
        Learn how to use useMutation for creating, updating, and deleting data
        with proper loading and error states.
      </p>

      <section className="section">
        <h2>Code</h2>
        <CodeBlock code={exampleCode} />
      </section>

      <section className="section">
        <h2>Live Demo</h2>
        <div className="demo-container">
          {!showDemo ? (
            <button
              onClick={() => setShowDemo(true)}
              className="demo-start-button"
            >
              Run Demo
            </button>
          ) : (
            <LiveDemo />
          )}
        </div>
        <p className="demo-note">
          This demo uses the JSONPlaceholder API, which simulates POST requests.
        </p>
      </section>

      <section className="section">
        <h2>What This Example Shows</h2>
        <ul className="feature-list">
          <li>
            <strong>Creating Data:</strong> Using useMutation with a POST
            request
          </li>
          <li>
            <strong>Loading State:</strong> Disabling the form while the
            mutation is in progress
          </li>
          <li>
            <strong>Success Handling:</strong> Updating local state and clearing
            the form on success
          </li>
          <li>
            <strong>Error Handling:</strong> Displaying error messages when the
            mutation fails
          </li>
          <li>
            <strong>Optimistic Updates:</strong> Adding new items to the list
            immediately after successful creation
          </li>
        </ul>
      </section>

      <section className="section">
        <h2>Key Concepts</h2>
        <div className="callout">
          <h4>Mutation Function</h4>
          <p>
            The <code>mutationFn</code> receives whatever you pass to{" "}
            <code>mutate()</code>. It should return a promise that resolves with
            the server response.
          </p>
        </div>
        <div className="callout">
          <h4>Callbacks</h4>
          <p>
            <code>onSuccess</code> is called with the response data, perfect for
            updating local state. <code>onError</code> handles failures
            gracefully.
          </p>
        </div>
        <div className="callout">
          <h4>Form Integration</h4>
          <p>
            Use <code>isLoading</code> to disable form inputs and buttons during
            submission, preventing duplicate submissions.
          </p>
        </div>
      </section>
    </div>
  );
}
