import { Link } from 'react-router-dom'

function Home() {
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'system-ui, sans-serif',
    lineHeight: '1.6'
  }

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '12px'
  }

  const sectionStyle = {
    marginBottom: '40px',
    padding: '30px',
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    border: '1px solid #e2e8f0'
  }

  const cardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    marginBottom: '20px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  }

  const linkStyle = {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '8px 16px',
    backgroundColor: '#eff6ff',
    borderRadius: '6px',
    display: 'inline-block',
    margin: '5px',
    border: '1px solid #dbeafe'
  }

  const highlightStyle = {
    backgroundColor: '#fef3c7',
    padding: '2px 6px',
    borderRadius: '4px',
    fontWeight: '600'
  }

  const codeStyle = {
    backgroundColor: '#f1f5f9',
    padding: '2px 6px',
    borderRadius: '4px',
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#475569'
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', fontWeight: 'bold' }}>
          🚀 React Data Fetching & Routing Demo
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: '0.9', maxWidth: '600px', margin: '0 auto' }}>
           Modern React patterns: data fetching, routing, error handling, and performance optimization based on class teaching by @oluwasetemi
        </p>
      </div>

      {/* Learning Objectives */}
      <div style={sectionStyle}>
        <h2 style={{ color: '#1e293b', marginBottom: '25px', fontSize: '1.8rem' }}>
          📚 Major Learning Points
        </h2>

        <div style={cardStyle}>
          <h3 style={{ color: '#3b82f6', marginBottom: '15px' }}>
            🔄 Modern Data Fetching Patterns
          </h3>
          <ul style={{ marginLeft: '20px', color: '#475569' }}>
            <li><span style={highlightStyle}>TanStack Query</span> - Powerful data synchronization with caching, background updates, and optimistic updates</li>
            <li><span style={highlightStyle}>SWR</span> - Lightweight data fetching with automatic revalidation and error handling</li>
            <li><span style={highlightStyle}>Custom Hooks</span> - Reusable data fetching logic that encapsulates API calls and state management</li>
            <li><span style={highlightStyle}>Error Handling</span> - Proper error states, retry mechanisms, and user-friendly error messages</li>
          </ul>
          <div style={{ marginTop: '15px' }}>
            <Link to="/tanstack" style={linkStyle}>Try TanStack Query →</Link>
            <Link to="/swr" style={linkStyle}>Try SWR →</Link>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ color: '#3b82f6', marginBottom: '15px' }}>
            🛣️ React Router Best Practices
          </h3>
          <ul style={{ marginLeft: '20px', color: '#475569' }}>
            <li><span style={highlightStyle}>Dynamic Routing</span> - URL parameters and nested routes for complex navigation</li>
            <li><span style={highlightStyle}>Active Link Styling</span> - Visual feedback for current page using <code style={codeStyle}>NavLink</code></li>
            <li><span style={highlightStyle}>404 Handling</span> - Custom not found pages with navigation options</li>
            <li><span style={highlightStyle}>Route Protection</span> - Understanding route-level error boundaries</li>
          </ul>
          <div style={{ marginTop: '15px' }}>
            <Link to="/posts" style={linkStyle}>Explore Posts →</Link>
            <Link to="/users" style={linkStyle}>Explore Users →</Link>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ color: '#3b82f6', marginBottom: '15px' }}>
            🛡️ Error Boundary Implementation
          </h3>
          <ul style={{ marginLeft: '20px', color: '#475569' }}>
            <li><span style={highlightStyle}>What Errors Are Caught</span> - React component render errors and lifecycle errors</li>
            <li><span style={highlightStyle}>What Errors Are NOT Caught</span> - Event handlers, async code, and useEffect errors</li>
            <li><span style={highlightStyle}>Graceful Recovery</span> - Fallback UI components and retry mechanisms</li>
            <li><span style={highlightStyle}>Error Context</span> - Providing meaningful error information to users</li>
          </ul>
          <div style={{ marginTop: '15px' }}>
            <Link to="/error-test" style={linkStyle}>Test Error Boundaries →</Link>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ color: '#3b82f6', marginBottom: '15px' }}>
            ⚡ Performance Optimization
          </h3>
          <ul style={{ marginLeft: '20px', color: '#475569' }}>
            <li><span style={highlightStyle}>Code Splitting</span> - <code style={codeStyle}>React.lazy()</code> for dynamic imports</li>
            <li><span style={highlightStyle}>Suspense</span> - Loading states for async components and data fetching</li>
            <li><span style={highlightStyle}>Bundle Optimization</span> - Route-based code splitting to reduce initial bundle size</li>
            <li><span style={highlightStyle}>Lazy Loading</span> - Components loaded only when needed</li>
          </ul>
          <div style={{ marginTop: '15px' }}>
            <Link to="/lazy" style={linkStyle}>See Lazy Loading →</Link>
          </div>
        </div>
      </div>

      {/* Key Concepts */}
      <div style={sectionStyle}>
        <h2 style={{ color: '#1e293b', marginBottom: '25px', fontSize: '1.8rem' }}>
          🎯 Key Concepts Demonstrated
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={cardStyle}>
            <h4 style={{ color: '#059669', marginBottom: '10px' }}>🔄 Data Synchronization</h4>
            <p style={{ color: '#475569', fontSize: '14px' }}>
              Learn how modern data fetching libraries handle caching, background updates, and optimistic updates automatically.
            </p>
          </div>

          <div style={cardStyle}>
            <h4 style={{ color: '#059669', marginBottom: '10px' }}>🎣 Custom Hooks</h4>
            <p style={{ color: '#475569', fontSize: '14px' }}>
              Extract reusable logic into custom hooks that encapsulate data fetching, state management, and error handling.
            </p>
          </div>

          <div style={cardStyle}>
            <h4 style={{ color: '#059669', marginBottom: '10px' }}>🛡️ Error Resilience</h4>
            <p style={{ color: '#475569', fontSize: '14px' }}>
              Build applications that gracefully handle failures with proper error boundaries and recovery mechanisms.
            </p>
          </div>

          <div style={cardStyle}>
            <h4 style={{ color: '#059669', marginBottom: '10px' }}>⚡ Bundle Optimization</h4>
            <p style={{ color: '#475569', fontSize: '14px' }}>
              Implement code splitting and lazy loading to create faster, more efficient React applications.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div style={sectionStyle}>
        <h2 style={{ color: '#1e293b', marginBottom: '25px', fontSize: '1.8rem' }}>
          🚀 Quick Start Guide
        </h2>

        <div style={{ backgroundColor: '#1e293b', color: 'white', padding: '20px', borderRadius: '8px', fontFamily: 'monospace' }}>
          <div style={{ marginBottom: '10px' }}># Install dependencies</div>
          <div style={{ marginBottom: '10px' }}>bun install</div>
          <div style={{ marginBottom: '10px' }}></div>
          <div style={{ marginBottom: '10px' }}># Start development server</div>
          <div>bun dev</div>
        </div>

        <p style={{ color: '#475569', marginTop: '20px', fontSize: '14px' }}>
          Navigate through the different routes to explore each concept. Each page demonstrates specific patterns and includes interactive examples.
        </p>
      </div>

      {/* Navigation */}
      <div style={sectionStyle}>
        <h2 style={{ color: '#1e293b', marginBottom: '25px', fontSize: '1.8rem' }}>
          🧭 Explore the Demo
        </h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <Link to="/posts" style={linkStyle}>📝 Posts & Dynamic Routing</Link>
          <Link to="/users" style={linkStyle}>👥 Users & Lazy Loading</Link>
          <Link to="/tanstack" style={linkStyle}>🔄 TanStack Query</Link>
          <Link to="/swr" style={linkStyle}>⚡ SWR Data Fetching</Link>
          <Link to="/lazy" style={linkStyle}>🚀 Lazy Loading Demo</Link>
          <Link to="/error-test" style={linkStyle}>🧪 Error Boundary Testing</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
