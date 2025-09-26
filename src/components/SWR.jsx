import useSWR from 'swr'

function SWRComponent() {
  const fetcher = (url) => fetch(url).then((res) => res.json()).catch((err) => {
    console.error(err)
    return null
  })
  const { data, isLoading, error } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>Posts</h1>
      {data.map((post) => (
        <div key={post.id}>
          <h2>{`${post.id} - ${post.title}`}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default SWRComponent
