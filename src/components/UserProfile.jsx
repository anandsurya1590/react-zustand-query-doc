import { useQuery } from "react-zustand-query";

function fetchUser() {
  return fetch("https://jsonplaceholder.typicode.com/users/1").then((res) =>
    res.json()
  );
}

export default function UserProfile() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: "user",
    queryFn: fetchUser,
    staleTime: 30000,
  });

  if (isLoading) {
    return <div className="loading">Loading user profile...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="card">
      <h2>useQuery Demo - User Profile</h2>
      <div className="user-info">
        <p><strong>Name:</strong> {data?.name}</p>
        <p><strong>Email:</strong> {data?.email}</p>
        <p><strong>Phone:</strong> {data?.phone}</p>
        <p><strong>Website:</strong> {data?.website}</p>
        <p><strong>Company:</strong> {data?.company?.name}</p>
        <p><strong>Address:</strong> {data?.address?.street}, {data?.address?.city}</p>
      </div>
      <button onClick={refetch}>Refetch User</button>
    </div>
  );
}
