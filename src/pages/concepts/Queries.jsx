import CodeBlock from "../../components/CodeBlock";

const basicQuery = `const { data, isLoading, error, refetch } = useQuery({
  queryKey: 'todos',
  queryFn: fetchTodos,
});`;

const queryKeyExamples = `// String key
useQuery({ queryKey: 'todos', queryFn: fetchTodos });

// Array key for parameterized queries
useQuery({ queryKey: ['todo', todoId], queryFn: () => fetchTodo(todoId) });

// Array key with multiple parameters
useQuery({ 
  queryKey: ['todos', { status: 'completed', userId: 1 }], 
  queryFn: fetchFilteredTodos 
});`;

const staleTimeExample = `// Data is fresh for 5 minutes
useQuery({
  queryKey: 'users',
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000, // 5 minutes in milliseconds
});

// Data is always stale (default behavior)
useQuery({
  queryKey: 'notifications',
  queryFn: fetchNotifications,
  staleTime: 0,
});

// Data never becomes stale
useQuery({
  queryKey: 'config',
  queryFn: fetchConfig,
  staleTime: Infinity,
});`;

const conditionalQuery = `// Only fetch when userId is available
const { data } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  enabled: !!userId, // Won't run until userId is truthy
});`;

const dependentQuery = `// First query
const { data: user } = useQuery({
  queryKey: 'user',
  queryFn: fetchUser,
});

// Dependent query - only runs when user data is available
const { data: projects } = useQuery({
  queryKey: ['projects', user?.id],
  queryFn: () => fetchUserProjects(user.id),
  enabled: !!user?.id,
});`;

export default function Queries() {
  return (
    <div className="page">
      <h1>Queries</h1>
      <p className="lead">
        Queries are the foundation of data fetching in react-zustand-query.
        Learn how to fetch, cache, and manage server state effectively.
      </p>

      <section className="section">
        <h2>Basic Query</h2>
        <p>
          The <code>useQuery</code> hook accepts a configuration object and
          returns query state and helper functions:
        </p>
        <CodeBlock code={basicQuery} />
        <div className="return-values">
          <h4>Return Values:</h4>
          <ul>
            <li>
              <code>data</code> - The resolved data from your query function
            </li>
            <li>
              <code>isLoading</code> - True while the query is fetching for the
              first time
            </li>
            <li>
              <code>error</code> - Any error that occurred during fetching
            </li>
            <li>
              <code>refetch</code> - Function to manually trigger a refetch
            </li>
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>Query Keys</h2>
        <p>
          Query keys uniquely identify your queries and are used for caching.
          They can be strings or arrays for more complex scenarios:
        </p>
        <CodeBlock code={queryKeyExamples} />
        <div className="callout">
          <strong>Best Practice:</strong> Use array keys when your query depends
          on variables. This ensures proper cache invalidation when those
          variables change.
        </div>
      </section>

      <section className="section">
        <h2>Stale Time</h2>
        <p>
          The <code>staleTime</code> option controls how long data is considered
          "fresh". Fresh data won't be refetched automatically:
        </p>
        <CodeBlock code={staleTimeExample} />
        <table className="options-table">
          <thead>
            <tr>
              <th>Value</th>
              <th>Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>0</code> (default)
              </td>
              <td>Data is immediately stale, will refetch on mount</td>
            </tr>
            <tr>
              <td>
                <code>number</code>
              </td>
              <td>Data is fresh for specified milliseconds</td>
            </tr>
            <tr>
              <td>
                <code>Infinity</code>
              </td>
              <td>Data never becomes stale automatically</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>Conditional Queries</h2>
        <p>
          Use the <code>enabled</code> option to conditionally run queries:
        </p>
        <CodeBlock code={conditionalQuery} />
      </section>

      <section className="section">
        <h2>Dependent Queries</h2>
        <p>
          Queries can depend on the results of other queries using the{" "}
          <code>enabled</code> option:
        </p>
        <CodeBlock code={dependentQuery} />
      </section>

      <section className="section">
        <h2>Query States</h2>
        <p>A query can be in one of several states:</p>
        <div className="states-grid">
          <div className="state-card">
            <h4>Loading</h4>
            <p>
              <code>isLoading: true</code>
            </p>
            <p>Initial fetch, no cached data available</p>
          </div>
          <div className="state-card">
            <h4>Success</h4>
            <p>
              <code>data: {"{ ... }"}</code>
            </p>
            <p>Query completed successfully</p>
          </div>
          <div className="state-card">
            <h4>Error</h4>
            <p>
              <code>error: Error</code>
            </p>
            <p>Query failed with an error</p>
          </div>
        </div>
      </section>
    </div>
  );
}
