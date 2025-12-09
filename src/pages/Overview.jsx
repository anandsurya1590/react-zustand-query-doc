import CodeBlock from "../components/CodeBlock";

const installCode = `npm install react-zustand-query`;

const basicExample = `import { useQuery } from 'react-zustand-query';

function UserProfile() {
  const { data, isLoading, error } = useQuery({
    queryKey: 'user',
    queryFn: () => fetch('/api/user').then(res => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Hello, {data.name}!</div>;
}`;

export default function Overview() {
  return (
    <div className="page">
      <h1>react-zustand-query</h1>
      <p className="lead">
        A lightweight, powerful data fetching and caching library for React,
        powered by Zustand state management.
      </p>

      <section className="section">
        <h2>Why react-zustand-query?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightweight</h3>
            <p>
              Minimal bundle size with zero unnecessary dependencies. Built on
              top of the lean Zustand library.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Automatic Caching</h3>
            <p>
              Smart caching out of the box with configurable stale times and
              automatic background refetching.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Simple API</h3>
            <p>
              Intuitive hooks-based API that feels natural in React. Get
              started in minutes, not hours.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔧</div>
            <h3>Flexible</h3>
            <p>
              Supports queries, mutations, and infinite queries. Handle any
              data fetching scenario with ease.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Quick Installation</h2>
        <CodeBlock code={installCode} language="bash" />
      </section>

      <section className="section">
        <h2>Basic Example</h2>
        <p>Here's how simple it is to fetch data with react-zustand-query:</p>
        <CodeBlock code={basicExample} />
      </section>

      <section className="section">
        <h2>Core Features</h2>
        <ul className="feature-list">
          <li>
            <strong>useQuery</strong> - Fetch and cache data with automatic
            refetching
          </li>
          <li>
            <strong>useMutation</strong> - Handle create, update, and delete
            operations
          </li>
          <li>
            <strong>useInfiniteQuery</strong> - Implement infinite scroll and
            pagination
          </li>
          <li>
            <strong>Automatic Deduplication</strong> - Multiple components
            requesting the same data? Only one request is made.
          </li>
          <li>
            <strong>Background Refetching</strong> - Keep your data fresh
            without blocking the UI
          </li>
          <li>
            <strong>Stale-While-Revalidate</strong> - Show cached data
            immediately while fetching updates
          </li>
        </ul>
      </section>

      <section className="section">
        <h2>Get Started</h2>
        <p>
          Ready to add powerful data fetching to your React app? Check out the{" "}
          <a href="/quickstart">Quick Start guide</a> to begin, or explore the{" "}
          <a href="/api/use-query">API Reference</a> for detailed documentation.
        </p>
      </section>
    </div>
  );
}
