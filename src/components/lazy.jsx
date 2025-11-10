import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { XCircle } from 'lucide-react'

// Lazy component error fallback
function LazyErrorFallback({ error, resetErrorBoundary }) {
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
        <XCircle size={24} /> Failed to Load Lazy Component
      </h3>
      <p style={{ marginBottom: '15px', color: '#6b7280' }}>
        There was an error loading the lazy component.
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
        Try Again
      </button>
    </div>
  )
}

function Lazy() {
  return (
    <ErrorBoundary FallbackComponent={LazyErrorFallback}>
      <Suspense fallback={<div>fetching lazy component...</div>}>
        <div>Lazy component</div>
      </Suspense>
    </ErrorBoundary>
  )
}

export default Lazy
