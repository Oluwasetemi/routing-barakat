import useSWR from 'swr'
import { ErrorBoundary } from 'react-error-boundary'
import { Link } from 'react-router-dom'
import { XCircle } from 'lucide-react'

// SWR error fallback component
function SWRErrorFallback({ error, resetErrorBoundary }) {
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
      <h3 style={{ color: '#dc2626', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <XCircle size={24} /> Failed to Load Posts (SWR)
      </h3>
      <p style={{ marginBottom: '15px', color: '#6b7280' }}>
        There was an error loading the posts data using SWR.
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

function SWRComponent() {
  const fetcher = (url) => fetch(url).then((res) => res.json()).catch((err) => {
    console.error(err)
    return null
  })
  const { data, isLoading, error } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ErrorBoundary FallbackComponent={SWRErrorFallback}>
      <div>
        <h1>Posts</h1>
        {data.map((post) => (
          <div key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <h2>{`${post.id} - ${post.title}`}</h2>
            </Link>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </ErrorBoundary>
  )
}

export default SWRComponent
