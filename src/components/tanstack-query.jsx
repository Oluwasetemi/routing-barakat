import { useQuery } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

// TanstackQuery error fallback component
function TanstackQueryErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      style={{
        padding: '20px',
        border: '2px solid #fca5a5',
        borderRadius: '8px',
        backgroundColor: '#fef2f2',
        margin: '20px 0',
        textAlign: 'center'
      }}
    >
      <h3 style={{ color: '#dc2626', marginBottom: '15px' }}>
        🔴 Failed to Load Posts (Tanstack Query)
      </h3>
      <p style={{ marginBottom: '15px', color: '#6b7280' }}>
        There was an error loading the posts data.
      </p>
      <details style={{ marginBottom: '15px', textAlign: 'left' }}>
        <summary style={{ cursor: 'pointer', color: '#374151' }}>
          Error Details
        </summary>
        <pre style={{
          background: '#f3f4f6',
          padding: '8px',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '12px',
          color: '#dc2626'
        }}>
          {error.message}
        </pre>
      </details>
      <button
        onClick={resetErrorBoundary}
        style={{
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Retry Loading Posts
      </button>
    </div>
  )
}

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

  return (
    <ErrorBoundary FallbackComponent={TanstackQueryErrorFallback}>
      <div>
        <h1>Posts</h1>
        {data.map((post) => (
          <div key={post.id}>
            <h2>{`${post.id} - ${post.title}`}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </ErrorBoundary>
  )
}

export default TanstackQuery
