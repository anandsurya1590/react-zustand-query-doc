import CodeBlock from "../../components/CodeBlock";

const signature = `const {
  data,
  isLoading,
  error,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey,
  queryFn,
  getNextPageParam,
  initialPageParam,
  staleTime,
  enabled,
});`;

const fullExample = `import { useInfiniteQuery } from 'react-zustand-query';

const PAGE_SIZE = 20;

function InfinitePostList() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await fetch(
        \`/api/posts?offset=\${pageParam}&limit=\${PAGE_SIZE}\`
      );
      if (!response.ok) throw new Error('Failed to fetch posts');
      const posts = await response.json();
      return {
        posts,
        nextCursor: posts.length === PAGE_SIZE ? pageParam + PAGE_SIZE : null,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  // Flatten all pages into a single array
  const allPosts = data?.pages?.flatMap((page) => page.posts) ?? [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {allPosts.map((post) => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
}`;

const cursorExample = `// Cursor-based pagination (e.g., Twitter-style)
useInfiniteQuery({
  queryKey: ['tweets'],
  queryFn: async ({ pageParam }) => {
    const url = pageParam 
      ? \`/api/tweets?cursor=\${pageParam}\`
      : '/api/tweets';
    const response = await fetch(url);
    return response.json();
  },
  getNextPageParam: (lastPage) => lastPage.nextCursor,
  initialPageParam: undefined,
});`;

const offsetExample = `// Offset-based pagination
useInfiniteQuery({
  queryKey: ['products'],
  queryFn: async ({ pageParam = 0 }) => {
    const response = await fetch(
      \`/api/products?offset=\${pageParam}&limit=10\`
    );
    const data = await response.json();
    return {
      products: data.items,
      nextOffset: data.hasMore ? pageParam + 10 : null,
    };
  },
  getNextPageParam: (lastPage) => lastPage.nextOffset,
  initialPageParam: 0,
});`;

export default function UseInfiniteQuery() {
  return (
    <div className="page">
      <h1>useInfiniteQuery</h1>
      <p className="lead">
        Hook for implementing infinite scroll and pagination patterns with
        automatic page management.
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
              <td>Unique key for identifying and caching the query.</td>
            </tr>
            <tr>
              <td>
                <code>queryFn</code>
              </td>
              <td>
                <code>
                  ({`{ pageParam }`}) =&gt; Promise&lt;TData&gt;
                </code>
              </td>
              <td>Yes</td>
              <td>
                Async function that fetches a page. Receives pageParam in
                context.
              </td>
            </tr>
            <tr>
              <td>
                <code>getNextPageParam</code>
              </td>
              <td>
                <code>(lastPage) =&gt; TPageParam | undefined</code>
              </td>
              <td>Yes</td>
              <td>
                Function that returns the next page param, or undefined if no
                more pages.
              </td>
            </tr>
            <tr>
              <td>
                <code>initialPageParam</code>
              </td>
              <td>
                <code>TPageParam</code>
              </td>
              <td>Yes</td>
              <td>Initial value for pageParam on first fetch.</td>
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
                <code>{`{ pages: TData[] }`}</code>
              </td>
              <td>
                Object containing array of all fetched pages.
              </td>
            </tr>
            <tr>
              <td>
                <code>isLoading</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>True during initial fetch (no pages loaded yet).</td>
            </tr>
            <tr>
              <td>
                <code>error</code>
              </td>
              <td>
                <code>Error | null</code>
              </td>
              <td>Error object if any fetch failed.</td>
            </tr>
            <tr>
              <td>
                <code>fetchNextPage</code>
              </td>
              <td>
                <code>() =&gt; void</code>
              </td>
              <td>Function to fetch the next page.</td>
            </tr>
            <tr>
              <td>
                <code>hasNextPage</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>
                True if getNextPageParam returned a value (more pages
                available).
              </td>
            </tr>
            <tr>
              <td>
                <code>isFetchingNextPage</code>
              </td>
              <td>
                <code>boolean</code>
              </td>
              <td>True while fetching the next page.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section">
        <h2>Full Example</h2>
        <CodeBlock code={fullExample} />
      </section>

      <section className="section">
        <h2>Pagination Patterns</h2>
        <h3>Cursor-based Pagination</h3>
        <p>Common for social feeds and real-time data:</p>
        <CodeBlock code={cursorExample} />

        <h3>Offset-based Pagination</h3>
        <p>Traditional pagination with page numbers:</p>
        <CodeBlock code={offsetExample} />
      </section>

      <section className="section">
        <h2>Working with Pages</h2>
        <CodeBlock
          code={`// Access individual pages
data.pages[0] // First page
data.pages[data.pages.length - 1] // Last page

// Flatten all pages into one array
const allItems = data?.pages?.flatMap(page => page.items) ?? [];

// Get total count across all pages
const totalCount = data?.pages?.reduce(
  (acc, page) => acc + page.items.length, 
  0
) ?? 0;`}
        />
      </section>

      <section className="section">
        <h2>TypeScript</h2>
        <CodeBlock
          code={`interface Post {
  id: number;
  title: string;
}

interface PostsPage {
  posts: Post[];
  nextCursor: number | null;
}

const { data } = useInfiniteQuery<PostsPage>({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
  initialPageParam: 0,
});

// data.pages is typed as PostsPage[]`}
          language="typescript"
        />
      </section>
    </div>
  );
}
