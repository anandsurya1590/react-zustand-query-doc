import { useState } from "react";
import { useInfiniteQuery } from "react-zustand-query";
import CodeBlock from "../../components/CodeBlock";

const PAGE_SIZE = 10;

function fetchPosts({ pageParam = 0 }) {
  const start = pageParam * PAGE_SIZE;
  return fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${PAGE_SIZE}`
  )
    .then((res) => res.json())
    .then((posts) => ({
      posts,
      nextPage: posts.length === PAGE_SIZE ? pageParam + 1 : null,
    }));
}

const exampleCode = `import { useInfiniteQuery } from 'react-zustand-query';

const PAGE_SIZE = 10;

function fetchPosts({ pageParam = 0 }) {
  const start = pageParam * PAGE_SIZE;
  return fetch(
    \`https://jsonplaceholder.typicode.com/posts?_start=\${start}&_limit=\${PAGE_SIZE}\`
  )
    .then(res => res.json())
    .then(posts => ({
      posts,
      nextPage: posts.length === PAGE_SIZE ? pageParam + 1 : null,
    }));
}

function InfinitePosts() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  const allPosts = data?.pages?.flatMap(page => page.posts) ?? [];

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="posts-list">
        {allPosts.map(post => (
          <article key={post.id}>
            <h4>#{post.id} - {post.title}</h4>
            <p>{post.body}</p>
          </article>
        ))}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More Posts'}
        </button>
      )}

      {!hasNextPage && allPosts.length > 0 && (
        <p>No more posts to load</p>
      )}

      <p>Total posts loaded: {allPosts.length}</p>
    </div>
  );
}`;

function LiveDemo() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["demo-posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  const allPosts = data?.pages?.flatMap((page) => page.posts) ?? [];

  if (isLoading) {
    return <div className="demo-loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="demo-error">Error: {error.message}</div>;
  }

  return (
    <div className="demo-result">
      <div className="demo-posts-list">
        {allPosts.map((post) => (
          <article key={post.id} className="demo-post-item">
            <h4>
              #{post.id} - {post.title}
            </h4>
            <p>{post.body}</p>
          </article>
        ))}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="demo-button demo-load-more"
        >
          {isFetchingNextPage ? "Loading more..." : "Load More Posts"}
        </button>
      )}

      {!hasNextPage && allPosts.length > 0 && (
        <p className="demo-end-message">No more posts to load</p>
      )}

      <p className="demo-count">Total posts loaded: {allPosts.length}</p>
    </div>
  );
}

export default function InfiniteScrollExample() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="page">
      <h1>Infinite Scroll Example</h1>
      <p className="lead">
        Implement infinite scrolling and pagination using useInfiniteQuery with
        automatic page management.
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
          This demo fetches posts from JSONPlaceholder API in pages of 10.
        </p>
      </section>

      <section className="section">
        <h2>What This Example Shows</h2>
        <ul className="feature-list">
          <li>
            <strong>Paginated Fetching:</strong> Loading data in chunks using
            offset-based pagination
          </li>
          <li>
            <strong>Page Accumulation:</strong> All fetched pages are stored and
            flattened into a single array
          </li>
          <li>
            <strong>Load More Button:</strong> Manual triggering of the next
            page fetch
          </li>
          <li>
            <strong>End Detection:</strong> Automatically detecting when there
            are no more pages
          </li>
          <li>
            <strong>Loading States:</strong> Separate states for initial load
            and loading more
          </li>
        </ul>
      </section>

      <section className="section">
        <h2>Key Concepts</h2>
        <div className="callout">
          <h4>Page Parameter</h4>
          <p>
            The <code>pageParam</code> is passed to your query function and
            represents the current page being fetched. Use{" "}
            <code>initialPageParam</code> to set the starting value.
          </p>
        </div>
        <div className="callout">
          <h4>getNextPageParam</h4>
          <p>
            This function receives the last fetched page and should return the
            next page parameter, or <code>null</code>/<code>undefined</code>{" "}
            when there are no more pages.
          </p>
        </div>
        <div className="callout">
          <h4>Data Structure</h4>
          <p>
            <code>data.pages</code> is an array containing all fetched pages.
            Use <code>flatMap</code> to combine all items into a single array
            for rendering.
          </p>
        </div>
        <div className="callout">
          <h4>hasNextPage</h4>
          <p>
            This boolean is automatically set to <code>true</code> when{" "}
            <code>getNextPageParam</code> returns a value, and{" "}
            <code>false</code> when it returns <code>null</code> or{" "}
            <code>undefined</code>.
          </p>
        </div>
      </section>
    </div>
  );
}
