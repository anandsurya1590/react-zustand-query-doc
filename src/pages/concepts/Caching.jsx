import CodeBlock from "../../components/CodeBlock";

const cacheKeyExample = `// These queries have different cache entries
useQuery({ queryKey: 'todos', queryFn: fetchAllTodos });
useQuery({ queryKey: ['todo', 1], queryFn: () => fetchTodo(1) });
useQuery({ queryKey: ['todo', 2], queryFn: () => fetchTodo(2) });

// These queries share the same cache entry
// (called from different components)
useQuery({ queryKey: 'user', queryFn: fetchUser }); // Component A
useQuery({ queryKey: 'user', queryFn: fetchUser }); // Component B`;

const staleTimeConfig = `// Configure stale time globally or per-query
useQuery({
  queryKey: 'posts',
  queryFn: fetchPosts,
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// Data lifecycle:
// 1. Initial fetch -> data is "fresh"
// 2. After staleTime -> data becomes "stale"
// 3. Next mount/focus -> background refetch (shows stale data immediately)
// 4. Refetch completes -> data is "fresh" again`;

const deduplicationExample = `// Component A mounts and starts fetching
useQuery({ queryKey: 'users', queryFn: fetchUsers });

// Component B mounts 100ms later with same query
useQuery({ queryKey: 'users', queryFn: fetchUsers });

// Result: Only ONE network request is made!
// Both components share the same in-flight request`;

const cacheBehavior = `function UserProfile({ userId }) {
  const { data, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 30000, // 30 seconds
  });

  // Behavior when userId changes from 1 to 2:
  // 1. If user-2 is cached and fresh -> show immediately, no fetch
  // 2. If user-2 is cached but stale -> show immediately, refetch in background
  // 3. If user-2 is not cached -> show loading, fetch data
  
  return isLoading ? <Loading /> : <Profile user={data} />;
}`;

export default function Caching() {
  return (
    <div className="page">
      <h1>Caching</h1>
      <p className="lead">
        react-zustand-query provides powerful caching capabilities out of the
        box, helping you minimize network requests and provide instant UI
        updates.
      </p>

      <section className="section">
        <h2>How Caching Works</h2>
        <p>
          Every query is cached using its <code>queryKey</code> as the cache
          key. When multiple components use the same query key, they share the
          same cached data:
        </p>
        <CodeBlock code={cacheKeyExample} />
        <div className="diagram">
          <div className="diagram-title">Cache Structure</div>
          <pre>{`Cache Store
├── 'todos' → { data: [...], timestamp: ... }
├── ['todo', 1] → { data: {...}, timestamp: ... }
├── ['todo', 2] → { data: {...}, timestamp: ... }
└── 'user' → { data: {...}, timestamp: ... }`}</pre>
        </div>
      </section>

      <section className="section">
        <h2>Stale-While-Revalidate</h2>
        <p>
          react-zustand-query implements the stale-while-revalidate pattern,
          which shows cached (potentially stale) data immediately while fetching
          fresh data in the background:
        </p>
        <CodeBlock code={staleTimeConfig} />
        <div className="timeline">
          <div className="timeline-item">
            <span className="time">T+0</span>
            <span className="event">Query fetches data - marked as "fresh"</span>
          </div>
          <div className="timeline-item">
            <span className="time">T+5min</span>
            <span className="event">
              staleTime expires - data marked as "stale"
            </span>
          </div>
          <div className="timeline-item">
            <span className="time">T+6min</span>
            <span className="event">
              Component mounts - shows stale data, refetches in background
            </span>
          </div>
          <div className="timeline-item">
            <span className="time">T+6min+200ms</span>
            <span className="event">
              Refetch completes - UI updates with fresh data
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Request Deduplication</h2>
        <p>
          When multiple components mount simultaneously with the same query,
          only one network request is made:
        </p>
        <CodeBlock code={deduplicationExample} />
        <div className="callout success">
          <strong>Benefit:</strong> This prevents unnecessary duplicate requests
          and ensures all components stay in sync with the same data.
        </div>
      </section>

      <section className="section">
        <h2>Cache Behavior on Key Changes</h2>
        <p>When a query key changes, the cache lookup happens instantly:</p>
        <CodeBlock code={cacheBehavior} />
      </section>

      <section className="section">
        <h2>Cache States</h2>
        <div className="states-grid">
          <div className="state-card">
            <h4>Fresh</h4>
            <p>Data is within staleTime</p>
            <p className="state-behavior">
              Won't trigger automatic refetch on mount
            </p>
          </div>
          <div className="state-card">
            <h4>Stale</h4>
            <p>Data is past staleTime</p>
            <p className="state-behavior">
              Will refetch on mount while showing cached data
            </p>
          </div>
          <div className="state-card">
            <h4>Missing</h4>
            <p>No cached data exists</p>
            <p className="state-behavior">
              Will show loading state and fetch data
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Cache Best Practices</h2>
        <ul className="best-practices">
          <li>
            <strong>Choose appropriate staleTime:</strong> Static data (config)
            can have long staleTime; dynamic data (notifications) should have
            short staleTime.
          </li>
          <li>
            <strong>Use consistent query keys:</strong> Ensure the same data is
            always accessed with the same key structure.
          </li>
          <li>
            <strong>Leverage caching for UX:</strong> Show cached data
            immediately for better perceived performance.
          </li>
        </ul>
      </section>
    </div>
  );
}
