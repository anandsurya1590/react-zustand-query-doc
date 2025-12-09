import { useInfiniteQuery } from "react-zustand-query";

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

export default function InfinitePosts() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  const allPosts = data?.pages?.flatMap((page) => page.posts) ?? [];

  if (isLoading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="card">
      <h2>useInfiniteQuery Demo - Infinite Posts</h2>
      <div className="posts-list">
        {allPosts.map((post) => (
          <div key={post.id} className="post-item">
            <h4>#{post.id} - {post.title}</h4>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="load-more"
        >
          {isFetchingNextPage ? "Loading more..." : "Load More Posts"}
        </button>
      )}

      {!hasNextPage && allPosts.length > 0 && (
        <p className="end-message">No more posts to load</p>
      )}

      <p className="post-count">Total posts loaded: {allPosts.length}</p>
    </div>
  );
}
