import './App.css'
import { useState, useEffect, lazy, Suspense } from 'react'

// setup routes
import { Routes, Route, Link, NavLink, useParams } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import Home from './pages/home.jsx'
import Tanstack from './pages/tanstack.jsx'
import SWRPage from './pages/swr.jsx'
import ErrorTestPage from './pages/error-test.jsx'
import GitHubPage from './pages/github.jsx'
import usePost from './hooks/usePost.jsx'

// Fake async operation to make Suspense show for longer
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const Lazy = lazy(() =>
  delay(3000).then(() => import('./components/lazy.jsx'))
)
const User = lazy(() => import('./components/user.jsx'))

// Route-level error fallback component
function RouteErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      style={{
        padding: '30px',
        textAlign: 'center',
        border: '2px solid #fca5a5',
        borderRadius: '8px',
        backgroundColor: '#fef2f2',
        maxWidth: '500px',
        margin: '20px auto'
      }}
    >
      <h3 style={{ color: '#dc2626', marginBottom: '15px' }}>
        ⚠️ Page Error
      </h3>
      <p style={{ marginBottom: '15px', color: '#6b7280' }}>
        This page encountered an error and couldn't load properly.
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
        Reload Page
      </button>
    </div>
  )
}

function App() {
  const [_data, setData] = useState(null)
  const [_isLoading, setIsLoading] = useState(false)
  const [_error, setError] = useState(null)

  useEffect(function fetchData() {
    // do not use useEffect to fetch data (prefer @tanstack/react-query or swr)
    setIsLoading(true)
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.error(err)
        setData(null)
        setError(err)
        setIsLoading(false)
      })

    // cleanup function
    return function cleanup() {
      setData(null)
      setError(null)
      setIsLoading(false)
    }
  }, [])


  return (
    <>
      <ErrorBoundary FallbackComponent={RouteErrorFallback}>
        {/* navigation */}
        <nav style={{ display: 'inline-flex', gap: '10px' }}>
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/">Home</NavLink>{` `}
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/posts">Posts</NavLink>{` `}
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/users">Users</NavLink>{` `}
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/lazy">Lazy</NavLink>{` `}
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/tanstack">Tanstack</NavLink>{` `}
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/swr">SWR</NavLink>{` `}
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/github">GitHub</NavLink>{` `}
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/error-test">Error Test</NavLink>{` `}
        </nav>

        {/* routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />

          {/* user routes */}
          {/* /users, users/:id */}
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={
            <Suspense fallback={<div>Loading user...</div>}>
              <User />
            </Suspense>
          } />

          {/* tanstack routes */}
          <Route path="/tanstack" element={<Tanstack />} />
          <Route path="/swr" element={<SWRPage />} />
          <Route path="/github" element={<GitHubPage />} />

          {/* error boundary test route */}
          <Route path="/error-test" element={<ErrorTestPage />} />

          {/* lazy loading routes */}
          <Route path="/lazy" element={
            <Suspense fallback={<div>Loading lazy component...</div>}>
              <Lazy />
            </Suspense>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  )
}



function Posts() {

  return <div>
    <h1>Posts</h1>
    {['1', '2', '3'].map((post) => (
      <div key={post}>
        <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to={`/posts/${post}`}>{post}</NavLink>
      </div>
    ))}
  </div>
}

function Post() {
  const params = useParams()
  const { id } = params
  const { post, isLoading, isError } = usePost(id)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {isError.message}</div>

  return (
    <main>
      <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/posts">Back to Posts</NavLink>
      <div>Post {id}</div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </main>
  )
}

function NotFound() {
  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      marginTop: '100px'
    }}>
      <h1 style={{
        fontSize: '4rem',
        color: '#6b7280',
        marginBottom: '20px',
        fontWeight: 'bold'
      }}>
        404
      </h1>
      <h2 style={{
        color: '#374151',
        marginBottom: '20px',
        fontSize: '1.5rem'
      }}>
        Page Not Found
      </h2>
      <p style={{
        color: '#6b7280',
        marginBottom: '30px',
        fontSize: '1.1rem'
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <NavLink
          to="/"
          style={{
            background: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          Go Home
        </NavLink>
        <button
          onClick={() => window.history.back()}
          style={{
            background: '#6b7280',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500'
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  )
}

function Users() {
  return (
    <div>
      <h1>Users</h1>
      <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/users/1">User 1</NavLink>
      <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/users/2">User 2</NavLink>
      <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/users/3">User 3</NavLink>
    </div>
  )
}


export default App
