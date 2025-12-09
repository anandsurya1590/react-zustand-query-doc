import CodeBlock from "../../components/CodeBlock";

const signature = `const {
  mutate,
  mutateAsync,
  isLoading,
  error,
  data,
  reset,
} = useMutation({
  mutationFn,
  onSuccess,
  onError,
  onSettled,
});`;

const fullExample = `import { useMutation } from 'react-zustand-query';

function CreateTodo() {
  const [title, setTitle] = useState('');

  const { mutate, isLoading, error, reset } = useMutation({
    mutationFn: async (newTodo) => {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error('Failed to create todo');
      }
      return response.json();
    },
    onSuccess: (data) => {
      console.log('Created todo:', data);
      setTitle('');
    },
    onError: (error) => {
      console.error('Error:', error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ title, completed: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="error">
          {error.message}
          <button type="button" onClick={reset}>Dismiss</button>
        </div>
      )}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Todo'}
      </button>
    </form>
  );
}`;

const asyncExample = `const { mutateAsync } = useMutation({
  mutationFn: createTodo,
});

// Using async/await for sequential operations
async function handleCreateAndNavigate() {
  try {
    const newTodo = await mutateAsync({ title: 'New Todo' });
    navigate(\`/todos/\${newTodo.id}\`);
  } catch (error) {
    // Handle error
  }
}`;

export default function UseMutation() {
  return (
    <div className="page">
      <h1>useMutation</h1>
      <p className="lead">
        Hook for performing create, update, and delete operations with built-in
        loading and error states.
      </p>

      <section className="section">
        <h2>Signature</h2>
        <CodeBlock code={signature} />
      </section>

      <section className="section">
        <h2>Options</h2>
        <table className="api-table">
          <thead>
            <tr>
              <th>Option</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>mutationFn</code>
              </td>
              <td>
                <code>(variables) =&gt; Promise&lt;TData&gt;</code>
              </td>
              <td>Yes</td>
              <td>
                Async function that performs the mutation. Receives variables
                passed to mutate().
              </td>
            </tr>
            <tr>
              <td>
                <code>onSuccess</code>
              </td>
              <td>
                <code>(data, variables) =&gt; void</code>
              </td>
              <td>No</td>
              <td>Callback fired when mutation succeeds.</td>
            </tr>
            <tr>
              <td>
                <code>onError</code>
              </td>
              <td>
                <code>(error, variables) =&gt; void</code>
              </td>
              <td>No</td>
              <td>Callback fired when mutation fails.</td>
            </tr>
            <tr>
              <td>
                <code>onSettled</code>
              </td>
              <td>
                <code>(data, error, variables) =&gt; void</code>
              </td>
              <td>No</td>
              <td>
                Callback fired after mutation completes (success or error).
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>Return Values</h2>
        <table className="api-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>mutate</code>
              </td>
              <td>
                <code>(variables) =&gt; void</code>
              </td>
              <td>
                Function to trigger the mutation. Fire-and-forget style.
              </td>
            </tr>
            <tr>
              <td>
                <code>mutateAsync</code>
              </td>
              <td>
                <code>(variables) =&gt; Promise&lt;TData&gt;</code>
              </td>
              <td>
                Promise-returning version of mutate for async/await usage.
              </td>
            </tr>
            <tr>
              <td>
                <code>isLoading</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>True while the mutation is in progress.</td>
            </tr>
            <tr>
              <td>
                <code>error</code>
              </td>
              <td>
                <code>Error | null</code>
              </td>
              <td>Error from the last mutation attempt.</td>
            </tr>
            <tr>
              <td>
                <code>data</code>
              </td>
              <td>
                <code>TData | undefined</code>
              </td>
              <td>Data returned from the last successful mutation.</td>
            </tr>
            <tr>
              <td>
                <code>reset</code>
              </td>
              <td>
                <code>() =&gt; void</code>
              </td>
              <td>Function to reset the mutation state (clears error/data).</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>Full Example</h2>
        <CodeBlock code={fullExample} />
      </section>

      <section className="section">
        <h2>Using mutateAsync</h2>
        <p>
          Use <code>mutateAsync</code> when you need to await the result or
          chain multiple operations:
        </p>
        <CodeBlock code={asyncExample} />
      </section>

      <section className="section">
        <h2>TypeScript</h2>
        <CodeBlock
          code={`interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface CreateTodoInput {
  title: string;
  completed?: boolean;
}

const { mutate } = useMutation<Todo, CreateTodoInput>({
  mutationFn: (input) => createTodo(input),
});

// mutate accepts CreateTodoInput
mutate({ title: 'New Todo' });`}
          language="typescript"
        />
      </section>
    </div>
  );
}
