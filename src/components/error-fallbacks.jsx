import { AlertOctagon } from 'lucide-react'

// Root-level error fallback component
export function RootErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      role="alert"
      style={{
        padding: '40px',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        marginTop: '100px'
      }}
    >
      <h2 style={{ color: '#dc2626', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <AlertOctagon size={32} /> Application Error
      </h2>
      <p style={{ marginBottom: '20px', color: '#6b7280' }}>
        Something went wrong with the application. Please try refreshing the page.
      </p>
      <details style={{ marginBottom: '20px', textAlign: 'left' }}>
        <summary style={{ cursor: 'pointer', color: '#374151' }}>
          Error Details
        </summary>
        <pre style={{
          background: '#f3f4f6',
          padding: '10px',
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
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Try Again
      </button>
    </div>
  )
}
