import { useQuery } from '@tanstack/react-query'

function TanstackQuery() {

  const fetchPosts = async () => {
    // can use fetch or axios or any other library to fetch data
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    if (!response.ok) throw new Error('Network response was not ok')

    return response.json()
  }

  const result = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })
  const { data, isPending, error } = result

  if (isPending) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>
    <h1>Posts</h1>
    {data.map((post) => (
      <div key={post.id}>
        <h2>{`${post.id} - ${post.title}`}</h2>
      <p>{post.body}</p>
      </div>
    ))}
  </div>
}

export default TanstackQuery
