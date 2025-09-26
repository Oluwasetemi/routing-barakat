import './App.css'
import { useState, useEffect, lazy, Suspense } from 'react'

// setup routes
import { Routes, Route, Link, NavLink, useParams } from 'react-router-dom'
import Home from './pages/home'
import Tanstack from './pages/tanstack'
import SWRPage from './pages/swr'

const Lazy = lazy(() => import('./components/lazy'))
const User = lazy(() => import('./components/user'))

function App() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(function fetchData() {
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
      <Suspense fallback={<div>Loading...</div>}>

        {/* navigation */}
        <nav style={{ display: 'inline-flex', gap: '10px' }}>
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/">Home</NavLink>{` `}
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/posts">Posts</NavLink>{` `}
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/users">Users</NavLink>{` `}
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/lazy">Lazy</NavLink>{` `}
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/tanstack">Tanstack</NavLink>{` `}
          <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/swr">SWR</NavLink>{` `}
        </nav>

        {/* routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />

          {/* user routes */}
          {/* /users, users/:id */}
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />

          {/* tanstack routes */}
          <Route path="/tanstack" element={<Tanstack />} />
          <Route path="/swr" element={<SWRPage />} />

          {/* lazy loading routes */}
          <Route path="/lazy" element={<Lazy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
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

  return (
    <main>
      <NavLink className={({ isActive }) => isActive ? 'active' : ''} exact to="/posts">Back to Posts</NavLink>
      <div>Post {id}</div>
    </main>
  )
}

function NotFound() {
  return <div>NotFound</div>
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


// ErrorBoundaries (react-error-boundary)
// function ErrorBoundary({ children }) {
//   return <ErrorBoundary>{children}</ErrorBoundary>
// }

export default App
