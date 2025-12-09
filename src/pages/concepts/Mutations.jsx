import CodeBlock from "../../components/CodeBlock";

const basicMutation = `const { mutate, isLoading, error, data } = useMutation({
  mutationFn: createTodo,
});

// Trigger the mutation
mutate({ title: 'New Todo', completed: false });`;

const mutationCallbacks = `const { mutate } = useMutation({
  mutationFn: updateUser,
  onSuccess: (data, variables) => {
    console.log('User updated:', data);
    // Optionally invalidate related queries
  },
  onError: (error, variables) => {
    console.error('Update failed:', error);
    // Show error notification
  },
  onSettled: (data, error, variables) => {
    // Runs after mutation completes (success or error)
    console.log('Mutation settled');
  },
});`;

const asyncMutate = `const { mutateAsync, isLoading } = useMutation({
  mutationFn: createPost,
});

// Use with async/await
const handleSubmit = async (formData) => {
  try {
    const newPost = await mutateAsync(formData);
    console.log('Created:', newPost);
    navigate(\`/posts/\${newPost.id}\`);
  } catch (error) {
    console.error('Failed to create post:', error);
  }
};`;

const deleteMutation = `function TodoItem({ todo }) {
  const { mutate: deleteTodo, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => 
      fetch(\`/api/todos/\${id}\`, { method: 'DELETE' }),
    onSuccess: () => {
      // Remove from local state or invalidate query
    },
  });

  return (
    <li>
      {todo.title}
      <button 
        onClick={() => deleteTodo(todo.id)}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  );
}`;

const formExample = `function CreateUserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const { mutate, isLoading, error } = useMutation({
    mutationFn: (userData) =>
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }).then(res => {
        if (!res.ok) throw new Error('Failed to create user');
        return res.json();
      }),
    onSuccess: (newUser) => {
      alert(\`User \${newUser.name} created!\`);
      setFormData({ name: '', email: '' });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error.message}</div>}
      <input
        value={formData.name}
        onChange={(e) => setFormData(d => ({ ...d, name: e.target.value }))}
        placeholder="Name"
        disabled={isLoading}
      />
      <input
        value={formData.email}
        onChange={(e) => setFormData(d => ({ ...d, email: e.target.value }))}
        placeholder="Email"
        type="email"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}`;

export default function Mutations() {
  return (
    <div className="page">
      <h1>Mutations</h1>
      <p className="lead">
        Mutations are used for creating, updating, and deleting data. Unlike
        queries, mutations are triggered imperatively.
      </p>

      <section className="section">
        <h2>Basic Mutation</h2>
        <p>
          The <code>useMutation</code> hook returns a <code>mutate</code>{" "}
          function that you call to trigger the mutation:
        </p>
        <CodeBlock code={basicMutation} />
        <div className="return-values">
          <h4>Return Values:</h4>
          <ul>
            <li>
              <code>mutate</code> - Function to trigger the mutation
            </li>
            <li>
              <code>mutateAsync</code> - Promise-returning version of mutate
            </li>
            <li>
              <code>isLoading</code> - True while mutation is in progress
            </li>
            <li>
              <code>error</code> - Error from the last mutation attempt
            </li>
            <li>
              <code>data</code> - Data returned from the last successful
              mutation
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>Mutation Callbacks</h2>
        <p>Handle mutation lifecycle with callback functions:</p>
        <CodeBlock code={mutationCallbacks} />
        <table className="options-table">
          <thead>
            <tr>
              <th>Callback</th>
              <th>When it runs</th>
              <th>Parameters</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>onSuccess</code>
              </td>
              <td>After successful mutation</td>
              <td>data, variables</td>
            </tr>
            <tr>
              <td>
                <code>onError</code>
              </td>
              <td>After failed mutation</td>
              <td>error, variables</td>
            </tr>
            <tr>
              <td>
                <code>onSettled</code>
              </td>
              <td>After mutation completes (success or error)</td>
              <td>data, error, variables</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>Async Mutations</h2>
        <p>
          Use <code>mutateAsync</code> for promise-based control flow:
        </p>
        <CodeBlock code={asyncMutate} />
        <div className="callout">
          <strong>When to use mutateAsync:</strong>
          <ul>
            <li>When you need to await the result before continuing</li>
            <li>When you want to use try/catch for error handling</li>
            <li>When chaining multiple operations</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>Delete Operations</h2>
        <p>Example of a delete mutation in a list item:</p>
        <CodeBlock code={deleteMutation} />
      </section>

      <section className="section">
        <h2>Form Integration</h2>
        <p>Complete example of using mutations with a form:</p>
        <CodeBlock code={formExample} />
      </section>

      <section className="section">
        <h2>Best Practices</h2>
        <ul className="best-practices">
          <li>
            <strong>Always handle errors:</strong> Use <code>onError</code> or
            try/catch to inform users when mutations fail.
          </li>
          <li>
            <strong>Disable inputs during mutation:</strong> Prevent double
            submissions by disabling form controls while <code>isLoading</code>{" "}
            is true.
          </li>
          <li>
            <strong>Provide feedback:</strong> Show loading states and success
            messages to keep users informed.
          </li>
          <li>
            <strong>Clear forms on success:</strong> Reset form state in the{" "}
            <code>onSuccess</code> callback.
          </li>
        </ul>
      </section>
    </div>
  );
}
