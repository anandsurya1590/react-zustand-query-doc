import { useState } from "react";
import { useQuery } from "react-zustand-query";
import CodeBlock from "../../components/CodeBlock";

function fetchUser() {
  return fetch("https://jsonplaceholder.typicode.com/users/1").then((res) =>
    res.json()
  );
}

const exampleCode = `import { useQuery } from 'react-zustand-query';

function fetchUser() {
  return fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.json());
}

function UserProfile() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: 'user',
    queryFn: fetchUser,
    staleTime: 30000, // 30 seconds
  });

  if (isLoading) return <div>Loading user profile...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="user-profile">
      <h2>{data?.name}</h2>
      <p>Email: {data?.email}</p>
      <p>Phone: {data?.phone}</p>
      <p>Website: {data?.website}</p>
      <p>Company: {data?.company?.name}</p>
      <button onClick={refetch}>Refetch User</button>
    </div>
  );
}`;

function LiveDemo() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: "demo-user",
    queryFn: fetchUser,
    staleTime: 30000,
  });

  if (isLoading) {
    return <div className="demo-loading">Loading user profile...</div>;
  }

  if (error) {
    return <div className="demo-error">Error: {error.message}</div>;
  }

  return (
    <div className="demo-result">
      <div className="demo-user-card">
        <h3>{data?.name}</h3>
        <div className="demo-user-details">
          <p>
            <strong>Email:</strong> {data?.email}
          </p>
          <p>
            <strong>Phone:</strong> {data?.phone}
          </p>
          <p>
            <strong>Website:</strong> {data?.website}
          </p>
          <p>
            <strong>Company:</strong> {data?.company?.name}
          </p>
          <p>
            <strong>Address:</strong> {data?.address?.street},{" "}
            {data?.address?.city}
          </p>
        </div>
      </div>
      <button onClick={refetch} className="demo-button">
        Refetch User
      </button>
    </div>
  );
}

export default function BasicQuery() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="page">
      <h1>Basic Query Example</h1>
      <p className="lead">
        A simple example demonstrating the useQuery hook with data fetching,
        loading states, and refetching.
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
      </section>

      <section className="section">
        <h2>What This Example Shows</h2>
        <ul className="feature-list">
          <li>
            <strong>Data Fetching:</strong> Using useQuery to fetch user data
            from an API
          </li>
          <li>
            <strong>Loading State:</strong> Displaying a loading indicator while
            data is being fetched
          </li>
          <li>
            <strong>Error Handling:</strong> Showing an error message if the
            fetch fails
          </li>
          <li>
            <strong>Caching:</strong> Data is cached with a 30-second stale time
          </li>
          <li>
            <strong>Manual Refetch:</strong> Button to manually trigger a data
            refresh
          </li>
        </ul>
      </section>

      <section className="section">
        <h2>Key Concepts</h2>
        <div className="callout">
          <h4>Query Key</h4>
          <p>
            The <code>'user'</code> string uniquely identifies this query in the
            cache. Any component using the same query key will share the cached
            data.
          </p>
        </div>
        <div className="callout">
          <h4>Stale Time</h4>
          <p>
            With <code>staleTime: 30000</code>, the data is considered fresh for
            30 seconds. During this time, mounting new components with the same
            query won't trigger a refetch.
          </p>
        </div>
        <div className="callout">
          <h4>Refetch</h4>
          <p>
            The <code>refetch</code> function bypasses the cache and fetches
            fresh data from the server, updating all components using this
            query.
          </p>
        </div>
      </section>
    </div>
  );
}
