import CodeBlock from "../components/CodeBlock";

const installCode = `npm install react-zustand-query
# or
yarn add react-zustand-query
# or
pnpm add react-zustand-query`;

const basicQueryCode = `import { useQuery } from 'react-zustand-query';

// Define your fetch function
function fetchTodos() {
  return fetch('https://api.example.com/todos')
    .then(res => res.json());
}

// Use it in your component
function TodoList() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: 'todos',
    queryFn: fetchTodos,
    staleTime: 60000, // Data is fresh for 1 minute
  });

  if (isLoading) return <div>Loading todos...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh</button>
      <ul>
        {data.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}`;

const mutationCode = `import { useMutation } from 'react-zustand-query';

function AddTodo() {
  const [title, setTitle] = useState('');
  
  const { mutate, isLoading } = useMutation({
    mutationFn: (newTodo) => 
      fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json()),
    onSuccess: (data) => {
      console.log('Todo created:', data);
      setTitle('');
    },
    onError: (error) => {
      console.error('Failed to create todo:', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ title, completed: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New todo..."
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
}`;

const infiniteQueryCode = `import { useInfiniteQuery } from 'react-zustand-query';

function InfinitePosts() {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 0 }) => 
      fetch(\`/api/posts?page=\${pageParam}\`).then(res => res.json()),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  const allPosts = data?.pages?.flatMap(page => page.posts) ?? [];

  return (
    <div>
      {allPosts.map(post => (
        <article key={post.id}>{post.title}</article>
      ))}
      {hasNextPage && (
        <button 
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}`;

export default function QuickStart() {
  return (
    <div className="page">
      <h1>Quick Start</h1>
      <p className="lead">
        Get up and running with react-zustand-query in just a few minutes.
      </p>

      <section className="section">
        <h2>1. Installation</h2>
        <p>Install the package using your preferred package manager:</p>
        <CodeBlock code={installCode} language="bash" />
      </section>

      <section className="section">
        <h2>2. Your First Query</h2>
        <p>
          The <code>useQuery</code> hook is the primary way to fetch data. It
          handles loading states, errors, caching, and refetching automatically.
        </p>
        <CodeBlock code={basicQueryCode} />
        <div className="callout">
          <strong>Key Points:</strong>
          <ul>
            <li>
              <code>queryKey</code> uniquely identifies your query for caching
            </li>
            <li>
              <code>queryFn</code> is an async function that fetches your data
            </li>
            <li>
              <code>staleTime</code> controls how long data is considered fresh
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>3. Making Mutations</h2>
        <p>
          Use <code>useMutation</code> for creating, updating, or deleting data:
        </p>
        <CodeBlock code={mutationCode} />
        <div className="callout">
          <strong>Mutation Features:</strong>
          <ul>
            <li>
              <code>onSuccess</code> callback runs after successful mutation
            </li>
            <li>
              <code>onError</code> callback handles errors gracefully
            </li>
            <li>
              <code>isLoading</code> tracks the mutation state
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>4. Infinite Queries</h2>
        <p>
          For pagination or infinite scroll, use <code>useInfiniteQuery</code>:
        </p>
        <CodeBlock code={infiniteQueryCode} />
        <div className="callout">
          <strong>Infinite Query Features:</strong>
          <ul>
            <li>
              <code>fetchNextPage</code> loads the next page of data
            </li>
            <li>
              <code>hasNextPage</code> indicates if more data is available
            </li>
            <li>
              <code>getNextPageParam</code> extracts the next page cursor
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>Next Steps</h2>
        <ul className="next-steps">
          <li>
            <a href="/concepts/queries">Learn more about Queries</a>
          </li>
          <li>
            <a href="/concepts/caching">Understand the Caching system</a>
          </li>
          <li>
            <a href="/api/use-query">Explore the full API Reference</a>
          </li>
          <li>
            <a href="/examples/basic-query">See live Examples</a>
          </li>
        </ul>
      </section>
    </div>
  );
}
