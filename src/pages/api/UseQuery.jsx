import CodeBlock from "../../components/CodeBlock";

const signature = `const {
  data,
  isLoading,
  error,
  refetch,
} = useQuery({
  queryKey,
  queryFn,
  staleTime,
  enabled,
});`;

const fullExample = `import { useQuery } from 'react-zustand-query';

function UserProfile({ userId }) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(\`/api/users/\${userId}\`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    },
    staleTime: 60000,
    enabled: !!userId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}`;

export default function UseQuery() {
  return (
    <div className="page">
      <h1>useQuery</h1>
      <p className="lead">
        The primary hook for fetching and caching data in react-zustand-query.
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
                <code>queryKey</code>
              </td>
              <td>
                <code>string | unknown[]</code>
              </td>
              <td>Yes</td>
              <td>
                Unique key for identifying and caching the query. Can be a
                string or array.
              </td>
            </tr>
            <tr>
              <td>
                <code>queryFn</code>
              </td>
              <td>
                <code>() =&gt; Promise&lt;TData&gt;</code>
              </td>
              <td>Yes</td>
              <td>
                Async function that fetches and returns data. Should throw on
                error.
              </td>
            </tr>
            <tr>
              <td>
                <code>staleTime</code>
              </td>
              <td>
                <code>number</code>
              </td>
              <td>No</td>
              <td>
                Time in milliseconds before data is considered stale. Default:{" "}
                <code>0</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>enabled</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>No</td>
              <td>
                If false, query will not execute. Default: <code>true</code>
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
                <code>data</code>
              </td>
              <td>
                <code>TData | undefined</code>
              </td>
              <td>
                The resolved data from the query function. Undefined while
                loading or on error.
              </td>
            </tr>
            <tr>
              <td>
                <code>isLoading</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                True when the query is fetching for the first time (no cached
                data).
              </td>
            </tr>
            <tr>
              <td>
                <code>error</code>
              </td>
              <td>
                <code>Error | null</code>
              </td>
              <td>Error object if the query failed, null otherwise.</td>
            </tr>
            <tr>
              <td>
                <code>refetch</code>
              </td>
              <td>
                <code>() =&gt; void</code>
              </td>
              <td>Function to manually trigger a refetch of the query.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>Full Example</h2>
        <CodeBlock code={fullExample} />
      </section>

      <section className="section">
        <h2>Query Key Structure</h2>
        <p>Query keys determine cache identity. Common patterns:</p>
        <table className="api-table">
          <thead>
            <tr>
              <th>Pattern</th>
              <th>Example</th>
              <th>Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>String</td>
              <td>
                <code>'todos'</code>
              </td>
              <td>Simple, static queries</td>
            </tr>
            <tr>
              <td>Array with ID</td>
              <td>
                <code>['todo', 5]</code>
              </td>
              <td>Single item by ID</td>
            </tr>
            <tr>
              <td>Array with filters</td>
              <td>
                <code>['todos', {`{ status: 'done' }`}]</code>
              </td>
              <td>Filtered/parameterized queries</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>TypeScript</h2>
        <CodeBlock
          code={`interface User {
  id: number;
  name: string;
  email: string;
}

const { data } = useQuery<User>({
  queryKey: ['user', userId],
  queryFn: fetchUser,
});
// data is typed as User | undefined`}
          language="typescript"
        />
      </section>
    </div>
  );
}
